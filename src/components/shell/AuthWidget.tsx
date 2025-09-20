'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, LogIn, ChevronDown } from 'lucide-react';
import { useSupabase, useSession } from '@/lib/supabase/SupabaseProvider';
import { useToast } from '@/lib/toast';
import UIButton from '@/components/UIButton';
import { AuthWidgetSkeleton } from './AuthWidgetSkeleton';

export function AuthWidget() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const { session, user, isLoading } = useSession();
  const { addToast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        addToast({
          type: 'error',
          title: 'Sign out failed',
          description: 'There was an error signing you out. Please try again.',
        });
        return;
      }

      addToast({
        type: 'success',
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });

      // Close menu and redirect to home
      setShowMenu(false);
      router.push('/');
    } catch {
      addToast({
        type: 'error',
        title: 'Sign out failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  // Show loading skeleton while session is loading
  if (isLoading) {
    return <AuthWidgetSkeleton />;
  }

  // If not signed in, show sign in button
  if (!session || !user) {
    return (
      <div className="px-2 py-4">
        <UIButton
          variant="primary"
          onClick={handleSignIn}
          className="w-full flex items-center justify-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Sign in
        </UIButton>
      </div>
    );
  }

  // If signed in, show user info with dropdown menu
  return (
    <div className="px-2 py-4">
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent/70 transition-colors"
        >
          <div className="w-8 h-8 bg-brand/20 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-brand" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-medium text-foreground truncate">
              {user.user_metadata?.full_name || user.email}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showMenu ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border border-border rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                {isSigningOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
