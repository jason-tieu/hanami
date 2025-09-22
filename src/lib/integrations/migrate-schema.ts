'use client';

export interface SchemaMigrationResult {
  ok: boolean;
  error?: string;
  message?: string;
}

/**
 * Run the database schema migration to add profile columns to lms_accounts
 * This should be run once to add the missing columns
 */
export async function runSchemaMigration(accessToken: string): Promise<SchemaMigrationResult> {
  try {
    const response = await fetch('/api/run-migration', {
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
        error: data.error || 'Failed to run schema migration',
      };
    }

    return data;
  } catch (error) {
    console.error('Schema migration error:', error);
    return {
      ok: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
