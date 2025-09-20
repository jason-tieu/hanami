'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/SupabaseProvider';
import { useToast } from '@/lib/toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function AuthCallbackForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { supabase } = useSupabase();
  const { addToast } = useToast();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const next = searchParams.get('next') || '/';

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          addToast({
            type: 'error',
            title: 'Sign in failed',
            description: 'There was an error signing you in. Please try again.',
          });
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Successfully signed in! Redirecting...');
          addToast({
            type: 'success',
            title: 'Welcome back!',
            description: 'You have been successfully signed in.',
          });
          
          // Redirect after a short delay
          setTimeout(() => {
            router.push(next);
          }, 1500);
        } else {
          setStatus('error');
          setMessage('No session found. Please try signing in again.');
          addToast({
            type: 'error',
            title: 'Sign in failed',
            description: 'No session found. Please try again.',
          });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
        addToast({
          type: 'error',
          title: 'Sign in failed',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    };

    handleAuthCallback();
  }, [supabase, router, next, addToast]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-brand" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-brand';
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className={getStatusColor()}>
            {status === 'loading' && 'Signing you in...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Sign in failed'}
          </CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'error' && (
            <button
              onClick={() => router.push('/auth/sign-in')}
              className="text-brand hover:underline text-sm"
            >
              Try again
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <AuthCallbackForm />
    </Suspense>
  );
}
