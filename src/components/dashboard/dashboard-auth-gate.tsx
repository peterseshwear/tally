import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface DashboardAuthGateProps {
  checking: boolean;
  user: User | null;
  children: React.ReactNode;
}

export function DashboardAuthGate({
  checking,
  user,
  children,
}: DashboardAuthGateProps) {
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

  return <>{children}</>;
}
