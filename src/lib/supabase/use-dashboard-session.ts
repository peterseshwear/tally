'use client';

import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

export function useDashboardSession() {
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

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore — we're navigating to /login regardless
    }
    router.push('/login');
  };

  return { user, checking, signOut };
}
