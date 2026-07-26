'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const errorDescription = url.searchParams.get('error_description');

    if (errorDescription) {
      setError(errorDescription);
      return;
    }

    if (!code) {
      setError('Missing authorization code.');
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      router.replace('/');
    });
  }, [router]);

  return (
    <section className="bg-primary-300 flex min-h-[820px] items-center justify-center px-6 py-10 text-white">
      <p className="text-sm text-white/80">
        {error ? `Sign-in failed: ${error}` : 'Signing you in…'}
      </p>
    </section>
  );
}
