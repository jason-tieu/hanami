/**
 * Integrations API functions
 * Handles fetching and managing integration connections
 */

export interface LMSConnection {
  id: string;
  owner_id: string;
  provider: string;
  account_identifier: string;
  status: 'connected' | 'disconnected' | 'error';
  access_meta: {
    profile?: {
      id: number;
      name: string;
      email: string;
      avatar_url?: string;
    };
    verified_at?: string;
    last_synced_at?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IntegrationsResponse {
  success: boolean;
  connections?: LMSConnection[];
  error?: string;
}

/**
 * Fetch all LMS connections for the current user
 */
export async function fetchLMSConnections(accessToken: string): Promise<IntegrationsResponse> {
  if (!accessToken) {
    throw new Error('Access token is required for fetching connections');
  }

  try {
    const response = await fetch('/api/integrations', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch connections');
    }

    return await response.json();
  } catch (error) {
    console.error('Integrations fetch error:', error);
    throw new Error('Failed to fetch integrations. Please try again.');
  }
}

/**
 * Disconnect an LMS connection
 */
export async function disconnectLMSConnection(connectionId: string, accessToken: string): Promise<{ success: boolean; error?: string }> {
  if (!accessToken) {
    throw new Error('Access token is required for disconnecting');
  }

  try {
    const response = await fetch('/api/integrations/disconnect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        connection_id: connectionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to disconnect');
    }

    return await response.json();
  } catch (error) {
    console.error('Disconnect error:', error);
    throw new Error('Failed to disconnect. Please try again.');
  }
}
