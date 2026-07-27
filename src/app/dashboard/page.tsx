'use client';

import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const supabase = createClient();

      supabase.auth.getSession().then(({ data }) => {
        setUser(data.session?.user ?? null);
        setChecking(false);
      });

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        },
      );

      return () => listener.subscription.unsubscribe();
    } catch {
      setUser(null);
      setChecking(false);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore — we're navigating to /login regardless
    }
    router.push('/login');
  };

  if (checking) {
    return (
      <section className="bg-primary-300 flex min-h-[820px] items-center justify-center px-6 py-10 text-white">
        <p className="text-sm text-white/80">Loading…</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-primary-300 flex min-h-[820px] items-center justify-center px-6 py-10 text-white">
        <div className="mx-auto flex max-w-[400px] flex-col items-center text-center">
          <h1 className="text-2xl leading-tight font-semibold">
            Confirm your email
          </h1>
          <p className="mt-2 text-sm text-white/80">
            We sent a confirmation link to your inbox. Once confirmed, sign in
            to access your dashboard.
          </p>
          <Link href="/login" className="mt-6 w-full">
            <Button className="w-full text-gray-900">Go to Sign In</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary-300 min-h-[820px] px-6 py-10 text-white lg:py-24">
      <div className="container mx-auto flex max-w-[500px] flex-col items-center py-10 text-center">
        <h1 className="text-2xl leading-tight font-semibold">
          Welcome, {user.email}
        </h1>
        <p className="mt-2 text-sm text-white/80">
          Your Zippay account is set up. This is your dashboard.
        </p>
        <Button
          type="button"
          className="bg-gray-0/10 hover:bg-gray-0/15 mt-8 border border-white/15 text-white"
          variant="secondary"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    </section>
  );
}
