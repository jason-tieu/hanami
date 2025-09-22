import { NextRequest, NextResponse } from 'next/server';
import { createClientFromRequest } from '@/lib/supabase/serverClient';
import { createServiceClient, authenticateUserFromToken } from '@/lib/supabase/serviceClient';
import { decryptToken } from '@/lib/encryption';
import { isAllowedCanvasHost } from '@/lib/institutions';
import { mapCanvasProfileToAccount } from '@/lib/canvas-api';
import { CanvasSelfProfile } from '@/lib/types';

// Ensure this runs on Node.js runtime (not Edge)
export const runtime = 'nodejs';

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://hanami.vercel.app', // Add your production domain
];

function checkCORS(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  return !origin || allowedOrigins.includes(origin);
}

// Basic validation for Canvas profile
function validateCanvasProfile(data: any): CanvasSelfProfile {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid profile data: expected object');
  }
  
  if (typeof data.id !== 'number') {
    throw new Error('Invalid profile data: id must be a number');
  }

  return {
    id: data.id,
    name: typeof data.name === 'string' ? data.name : undefined,
    short_name: typeof data.short_name === 'string' ? data.short_name : undefined,
    sortable_name: typeof data.sortable_name === 'string' ? data.sortable_name : undefined,
    avatar_url: typeof data.avatar_url === 'string' ? data.avatar_url : undefined,
    primary_email: typeof data.primary_email === 'string' ? data.primary_email : undefined,
    login_id: typeof data.login_id === 'string' ? data.login_id : undefined,
    integration_id: typeof data.integration_id === 'string' ? data.integration_id : undefined,
    time_zone: typeof data.time_zone === 'string' ? data.time_zone : undefined,
    locale: typeof data.locale === 'string' ? data.locale : undefined,
    effective_locale: typeof data.effective_locale === 'string' ? data.effective_locale : undefined,
    calendar: data.calendar && typeof data.calendar === 'object' ? {
      ics: typeof data.calendar.ics === 'string' ? data.calendar.ics : undefined,
    } : undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    // CORS check
    if (!checkCORS(request)) {
      return NextResponse.json(
        { success: false, error: 'CORS policy violation' },
        { status: 403 }
      );
    }

    const { connection_id } = await request.json();

    if (!connection_id || typeof connection_id !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Connection ID is required.' },
        { status: 400 }
      );
    }

    // Get Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Authorization header with Bearer token is required.' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Authenticate user using service client
    let user;
    try {
      user = await authenticateUserFromToken(accessToken);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid or expired access token.' },
        { status: 401 }
      );
    }

    console.log('Syncing Canvas data for user:', {
      connectionId: connection_id,
      userId: user.id,
      email: user.email
    });

    // Create service client for database operations
    const serviceClient = createServiceClient();
    const anonClient = createClientFromRequest(request);

    // Get the connection details
    const { data: connection, error: connectionError } = await anonClient
      .from('lms_connections')
      .select('id, owner_id, provider, account_identifier, access_meta')
      .eq('id', connection_id)
      .eq('owner_id', user.id)
      .single();

    if (connectionError || !connection) {
      console.error('Connection not found or access denied:', connectionError);
      return NextResponse.json(
        { success: false, error: 'Connection not found or access denied.' },
        { status: 404 }
      );
    }

    if (connection.provider !== 'canvas') {
      return NextResponse.json(
        { success: false, error: 'Invalid connection type for Canvas sync.' },
        { status: 400 }
      );
    }

    // Get the encrypted token
    const { data: secret, error: secretError } = await serviceClient
      .from('lms_secrets')
      .select('ciphertext_base64, iv_base64')
      .eq('connection_id', connection_id)
      .single();

    if (secretError || !secret) {
      console.error('Secret not found:', secretError);
      return NextResponse.json(
        { success: false, error: 'Connection token not found.' },
        { status: 404 }
      );
    }

    // Decrypt the token
    let canvasToken: string;
    try {
      canvasToken = decryptToken({
        ciphertext: secret.ciphertext_base64,
        iv: secret.iv_base64
      });
    } catch (error) {
      console.error('Token decryption failed:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to decrypt connection token.' },
        { status: 500 }
      );
    }

    console.log('Decrypted Canvas token, starting sync...');

    // Perform Canvas API sync
    try {
      const baseUrl = connection.account_identifier;
      
      // Security check: validate base URL is whitelisted
      if (!isAllowedCanvasHost(baseUrl)) {
        return NextResponse.json(
          { success: false, error: 'Invalid Canvas host. Only whitelisted universities are supported.' },
          { status: 400 }
        );
      }
      
      // Call Canvas API to get user profile
      const profileResponse = await fetch(`${baseUrl}/api/v1/users/self/profile`, {
        headers: {
          'Authorization': `Bearer ${canvasToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!profileResponse.ok) {
        if (profileResponse.status === 401 || profileResponse.status === 403) {
          console.log('Canvas token is invalid/expired, disconnecting connection...');
          
          // Automatically disconnect the connection
          await anonClient
            .from('lms_connections')
            .delete()
            .eq('id', connection_id)
            .eq('owner_id', user.id);

          await serviceClient
            .from('lms_secrets')
            .delete()
            .eq('connection_id', connection_id);

          console.log('Connection automatically disconnected due to invalid token');
          
          return NextResponse.json({
            success: false,
            error: 'Canvas token expired; please reconnect.',
            disconnected: true
          });
        }
        
        throw new Error(`Canvas API error: ${profileResponse.status} ${profileResponse.statusText}`);
      }

      const profileData = await profileResponse.json();
      
      // Validate the response
      let validatedProfile: CanvasSelfProfile;
      try {
        validatedProfile = validateCanvasProfile(profileData);
      } catch (error) {
        console.error('Canvas profile validation error:', error);
        return NextResponse.json(
          { success: false, error: 'Invalid profile data received from Canvas.' },
          { status: 500 }
        );
      }

      console.log('Canvas sync successful, got profile:', {
        id: validatedProfile.id,
        name: validatedProfile.name,
        email: validatedProfile.primary_email
      });

      // Sync profile data to lms_accounts table
      const accountData = mapCanvasProfileToAccount(validatedProfile, baseUrl);
      const upsertData = {
        owner_id: user.id,
        provider: 'canvas' as const,
        base_url: baseUrl,
        ...accountData,
      };

      console.log('Upserting profile data to lms_accounts:', {
        owner_id: user.id,
        provider: 'canvas',
        base_url: baseUrl,
        external_user_id: accountData.external_user_id,
      });

      const { error: accountError } = await anonClient
        .from('lms_accounts')
        .upsert(upsertData, {
          onConflict: 'owner_id,provider,base_url',
          ignoreDuplicates: false,
        });

      if (accountError) {
        console.error('Error upserting profile:', accountError);
        // Don't fail the entire sync if profile storage fails
        console.warn('Profile sync failed, but continuing with data sync');
      } else {
        console.log('Profile data synced successfully');
      }

      // Update the last_synced_at timestamp
      const { error: updateError } = await anonClient
        .from('lms_connections')
        .update({
          access_meta: {
            ...connection.access_meta,
            last_synced_at: new Date().toISOString()
          }
        })
        .eq('id', connection_id)
        .eq('owner_id', user.id);

      if (updateError) {
        console.error('Failed to update last_synced_at:', updateError);
        // Don't fail the sync if timestamp update fails
      }

      console.log('Canvas sync completed successfully:', {
        connectionId: connection_id,
        userId: user.id,
        syncedAt: new Date().toISOString(),
        profileSynced: !accountError
      });

      return NextResponse.json({
        success: true,
        message: 'Canvas data and profile synced successfully',
        syncedAt: new Date().toISOString(),
        profileSynced: !accountError
      });

    } catch (error) {
      console.error('Canvas API sync failed:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to sync with Canvas. Please check your connection.',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Canvas sync error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync Canvas data. Please try again.' },
      { status: 500 }
    );
  }
}