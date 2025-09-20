import { SupabaseClient, User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  full_name?: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export async function syncUserProfile(supabase: SupabaseClient, user: User): Promise<void> {
  try {
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (existingProfile) {
      // Profile exists, no need to create
      return;
    }

    // Create new profile
    const profileData: Omit<Profile, 'created_at' | 'updated_at'> = {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const { error } = await supabase
      .from('profiles')
      .insert([profileData]);

    if (error) {
      // Don't throw - this is not critical for the auth flow
    }
  } catch {
    // Don't throw - this is not critical for the auth flow
  }
}
