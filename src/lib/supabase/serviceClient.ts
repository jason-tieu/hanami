/**
 * Server-only Supabase service client
 * Uses SUPABASE_SERVICE_ROLE_KEY for elevated permissions
 * NEVER import this in client-side code
 */

import { createClient } from '@supabase/supabase-js';

// Safety check: ensure this is only used server-side
if (typeof window !== 'undefined') {
  throw new Error('Service client must not be imported in client-side code');
}

// Safety check: ensure service role key is not exposed
if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY.includes('NEXT_PUBLIC_')) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY must not have NEXT_PUBLIC_ prefix');
}

export function createServiceClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Authenticate user from JWT token using service client
 */
export async function authenticateUserFromToken(accessToken: string) {
  const supabase = createServiceClient();
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    throw new Error('Invalid or expired access token');
  }
  
  return user;
}
