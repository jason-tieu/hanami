import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient, authenticateUserFromToken } from '@/lib/server/supabase';

// Ensure this runs on Node.js runtime (not Edge)
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { ok: false, error: 'Authorization header with Bearer token is required.' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.substring(7);

    // Authenticate user
    let user;
    try {
      user = await authenticateUserFromToken(accessToken);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { ok: false, error: 'Invalid or expired access token.' },
        { status: 401 }
      );
    }

    console.log('Migrating Canvas accounts for user:', {
      id: user.id,
      email: user.email,
    });

    const serviceClient = createServiceClient();

    // Get user's Canvas connections
    const { data: connections, error: connectionsError } = await serviceClient
      .from('lms_connections')
      .select('id, account_identifier, access_meta')
      .eq('owner_id', user.id)
      .eq('provider', 'canvas');

    if (connectionsError) {
      console.error('Error fetching connections:', connectionsError);
      return NextResponse.json(
        { ok: false, error: 'Failed to fetch Canvas connections.' },
        { status: 500 }
      );
    }

    if (!connections || connections.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'No Canvas connections found to migrate.',
        migrated: 0,
      });
    }

    let migrated = 0;

    for (const connection of connections) {
      try {
        // Extract profile data from access_meta
        const profile = connection.access_meta?.profile;
        if (!profile) {
          console.log(`No profile data found for connection ${connection.id}, skipping`);
          continue;
        }

        const accountData = {
          owner_id: user.id,
          provider: 'canvas',
          base_url: connection.account_identifier,
          external_user_id: profile.id?.toString() || null,
        };

        const { error: accountError } = await serviceClient
          .from('lms_accounts')
          .upsert(accountData, {
            onConflict: 'owner_id,provider,base_url',
            ignoreDuplicates: false,
          });

        if (accountError) {
          console.error(`Error migrating connection ${connection.id}:`, accountError);
        } else {
          migrated++;
          console.log(`Successfully migrated connection ${connection.id}`);
        }
      } catch (error) {
        console.error(`Error processing connection ${connection.id}:`, error);
      }
    }

    console.log(`Migration completed: ${migrated} accounts migrated`);

    return NextResponse.json({
      ok: true,
      message: `Successfully migrated ${migrated} Canvas accounts.`,
      migrated,
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to migrate Canvas accounts. Please try again.' },
      { status: 500 }
    );
  }
}
