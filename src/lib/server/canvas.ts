/**
 * Server-side Canvas API helpers
 */

import { CanvasCourse, CanvasLinkHeader } from '../canvas/types';
import { createServiceClient } from './supabase';

/**
 * Get Canvas token for user from lms_connections table
 */
export async function getCanvasTokenForUser(userId: string): Promise<string | null> {
  try {
    const serviceClient = createServiceClient();

    // Get user's Canvas connection (server-only, contains OAuth tokens)
    const { data: connection, error: connectionError } = await serviceClient
      .from('lms_connections')
      .select('access_token')
      .eq('owner_id', userId)
      .eq('provider', 'canvas')
      .single();

    if (connectionError || !connection) {
      console.log('No Canvas connection found for user:', userId);
      return null;
    }

    if (!connection.access_token) {
      console.log('No access token found in Canvas connection for user:', userId);
      return null;
    }

    return connection.access_token;
  } catch (error) {
    console.error('Error getting Canvas token for user:', userId, error);
    return null;
  }
}

/**
 * Fetch JSON from Canvas API with proper error handling
 */
export async function fetchCanvasJson<T>(
  baseUrl: string,
  path: string,
  token: string
): Promise<T> {
  const url = `${baseUrl.replace(/\/$/, '')}${path}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error('Canvas token expired; please reconnect');
  }

  if (!response.ok) {
    throw new Error(`Canvas API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Parse Link header for pagination
 */
function parseLinkHeader(linkHeader: string | null): CanvasLinkHeader {
  if (!linkHeader) {
    return {};
  }

  const links: CanvasLinkHeader = {};
  const linkRegex = /<([^>]+)>;\s*rel="([^"]+)"/g;
  let match;

  while ((match = linkRegex.exec(linkHeader)) !== null) {
    const [, url, rel] = match;
    links[rel as keyof CanvasLinkHeader] = url;
  }

  return links;
}

/**
 * Paginate through Canvas courses
 */
export async function paginateCourses(
  baseUrl: string,
  token: string
): Promise<CanvasCourse[]> {
  const allCourses: CanvasCourse[] = [];
  let nextUrl: string | null = `${baseUrl.replace(/\/$/, '')}/api/v1/courses?include[]=enrollments&per_page=50`;

  while (nextUrl) {
    console.log('Fetching courses page:', nextUrl);
    
    const response = await fetch(nextUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error('Canvas token expired; please reconnect');
    }

    if (!response.ok) {
      throw new Error(`Canvas API error: ${response.status} ${response.statusText}`);
    }

    const courses: CanvasCourse[] = await response.json();
    allCourses.push(...courses);

    // Check for next page
    const linkHeader = response.headers.get('Link');
    const links = parseLinkHeader(linkHeader);
    nextUrl = links.next || null;

    console.log(`Fetched ${courses.length} courses, total: ${allCourses.length}`);
  }

  console.log(`Completed pagination, total courses: ${allCourses.length}`);
  return allCourses;
}
