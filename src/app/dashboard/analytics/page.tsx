'use client';

import {
  AnalyticsGrid,
  AppShell,
  DashboardAuthGate,
} from '@/components/dashboard';
import { useDashboardSession } from '@/lib/supabase/use-dashboard-session';

export default function AnalyticsPage() {
  const { user, checking, signOut } = useDashboardSession();

  return (
    <DashboardAuthGate checking={checking} user={user}>
      <AppShell user={user} onSignOut={signOut} pageTitle="Analytics">
        <AnalyticsGrid />
      </AppShell>
    </DashboardAuthGate>
  );
}
