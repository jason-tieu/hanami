import { createClient as createBrowserClient } from './browserClient';
import { createClient as createServerClient } from './serverClient';

export function getSupabase() {
  // Check if we're in a server environment
  if (typeof window === 'undefined') {
    return createServerClient();
  }
  return createBrowserClient();
}

export { createClient as createBrowserClient } from './browserClient';
export { createClient as createServerClient } from './serverClient';
