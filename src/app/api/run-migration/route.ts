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

    console.log('Running migration for user:', {
      id: user.id,
      email: user.email,
    });

    const serviceClient = createServiceClient();

    // Add columns one by one to avoid issues
    const columns = [
      'name text',
      'short_name text', 
      'sortable_name text',
      'avatar_url text',
      'primary_email text',
      'login_id text',
      'integration_id text',
      'time_zone text',
      'locale text',
      'effective_locale text',
      'calendar_ics text',
      'last_profile_sync_at timestamptz'
    ];

    let successCount = 0;
    let errorCount = 0;

    for (const column of columns) {
      try {
        const { error } = await serviceClient
          .from('lms_accounts')
          .select('id')
          .limit(1);

        // Try to add the column by attempting to select it
        const columnName = column.split(' ')[0];
        const { error: columnError } = await serviceClient
          .from('lms_accounts')
          .select(columnName)
          .limit(1);

        if (columnError && columnError.code === 'PGRST204') {
          // Column doesn't exist, try to add it
          console.log(`Adding column: ${columnName}`);
          // Note: We can't add columns via Supabase client, this would need to be done via SQL
          // For now, we'll just log that we need to add the column
          console.log(`Column ${columnName} needs to be added manually`);
        } else {
          console.log(`Column ${columnName} already exists`);
          successCount++;
        }
      } catch (error) {
        console.error(`Error checking column ${column}:`, error);
        errorCount++;
      }
    }

    console.log(`Migration check completed: ${successCount} columns exist, ${errorCount} errors`);

    return NextResponse.json({
      ok: true,
      message: `Migration check completed. ${successCount} columns exist, ${errorCount} errors. You may need to run the SQL migration manually.`,
      successCount,
      errorCount,
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to run migration. Please try again.' },
      { status: 500 }
    );
  }
}