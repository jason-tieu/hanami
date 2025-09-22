# Canvas Sync Migration Instructions

The Canvas sync feature is now simplified to work with the existing `lms_accounts` table schema. No additional columns are needed.

## How It Works

The Canvas sync will:
1. Create basic `lms_accounts` records with only essential fields:
   - `owner_id` - User ID
   - `provider` - 'canvas'
   - `base_url` - Canvas instance URL
   - `external_user_id` - Canvas user ID
2. Migrate existing Canvas connections to `lms_accounts`
3. Sync courses from Canvas and create units/enrollments

## Test the Canvas Sync

The Canvas sync should now work immediately without any database changes. The system will:
1. Find your Canvas connection in `lms_connections`
2. Create a corresponding record in `lms_accounts`
3. Sync your Canvas courses and create units

## Troubleshooting

If you see any errors, they should now be related to the sync logic itself, not missing database columns.
