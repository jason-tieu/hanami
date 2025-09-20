import { createServerClient } from '@supabase/ssr';

export function createClient() {
  // For now, create a simple server client without cookies
  // This will be enhanced when we add proper server-side auth
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op for now
        },
      },
    }
  );
}
