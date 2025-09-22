'use client';

import { CanvasSyncResponse } from '@/lib/canvas/types';

export interface SyncCanvasResult {
  ok: boolean;
  error?: string;
  summary?: {
    profileSaved: boolean;
    added: number;
    updated: number;
    skipped: number;
    total: number;
    units: Array<{
      id: string;
      code: string | null;
      title: string;
      semester?: number | null;
      year?: number | null;
      url?: string | null;
    }>;
  };
}

/**
 * Sync Canvas data and profile
 */
export async function syncCanvas(accessToken: string): Promise<SyncCanvasResult> {
  try {
    const response = await fetch('/api/canvas/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data: CanvasSyncResponse = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: data.error || 'Failed to sync Canvas data',
      };
    }

    if (!data.ok) {
      return {
        ok: false,
        error: data.error || 'Canvas sync failed',
      };
    }

    return {
      ok: true,
      summary: {
        profileSaved: data.profileSaved || false,
        added: data.added || 0,
        updated: data.updated || 0,
        skipped: data.skipped || 0,
        total: data.total || 0,
        units: data.units || [],
      },
    };
  } catch (error) {
    console.error('Canvas sync error:', error);
    return {
      ok: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}
