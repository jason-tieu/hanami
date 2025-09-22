import { NextRequest, NextResponse } from 'next/server';
import { isAllowedCanvasHost } from '@/lib/institutions';

export async function POST(request: NextRequest) {
  try {
    const { base_url, token } = await request.json();

    // Security check: validate base URL is whitelisted
    if (!base_url || !isAllowedCanvasHost(base_url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Canvas host. Only whitelisted universities are supported.' },
        { status: 400 }
      );
    }

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Access token is required.' },
        { status: 400 }
      );
    }

    // Call Canvas API to verify the token
    const canvasResponse = await fetch(`${base_url}/api/v1/users/self`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!canvasResponse.ok) {
      if (canvasResponse.status === 401) {
        return NextResponse.json(
          { success: false, error: 'Invalid access token. Please check your token and try again.' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: 'Couldn\'t reach Canvas right now—please try again.' },
        { status: 500 }
      );
    }

    const profile = await canvasResponse.json();

    // Return the verified profile
    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        avatar_url: profile.avatar_url,
      },
    });

  } catch (error) {
    console.error('Canvas verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Couldn\'t reach Canvas right now—please try again.' },
      { status: 500 }
    );
  }
}
