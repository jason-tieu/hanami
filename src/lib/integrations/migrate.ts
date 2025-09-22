'use client';

export interface MigrateResult {
  ok: boolean;
  error?: string;
  message?: string;
  migrated?: number;
}

/**
 * Migrate existing Canvas connections to lms_accounts table
 */
export async function migrateCanvasAccounts(accessToken: string): Promise<MigrateResult> {
  try {
    const response = await fetch('/api/migrate-canvas-accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: data.error || 'Failed to migrate Canvas accounts',
      };
    }

    return data;
  } catch (error) {
    console.error('Migration error:', error);
    return {
      ok: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
