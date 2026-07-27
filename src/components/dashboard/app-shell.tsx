'use client';

import type { User } from '@supabase/supabase-js';
import { useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { DashboardHeader } from './dashboard-header';
import { SidebarContent } from './sidebar-content';

interface AppShellProps {
  children: React.ReactNode;
  user: User | null;
  onSignOut: () => void;
  pageTitle?: string;
}

export function AppShell({
  children,
  user,
  onSignOut,
  pageTitle,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Radix portals (dropdown, sheet, tooltip) render into document.body by
  // default, which sits outside the `.dark` wrapper below. Rendering them
  // into this container instead keeps them scoped to the dashboard's dark
  // design tokens without touching the marketing site's own theme class.
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );

  const handleToggleSidebar = () => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop) {
      setCollapsed((value) => !value);
    } else {
      setMobileOpen(true);
    }
  };

  return (
    <div
      ref={setPortalContainer}
      className="dark bg-background text-foreground relative flex min-h-screen w-full"
    >
      <TooltipProvider delayDuration={200}>
        <aside
          className={cn(
            'border-border hidden shrink-0 border-r transition-[width] duration-200 md:block',
            collapsed ? 'w-[76px]' : 'w-72',
          )}
        >
          <SidebarContent collapsed={collapsed} />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            container={portalContainer}
            className="border-border bg-background w-72 max-w-[85vw] p-0"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader
            pageTitle={pageTitle}
            user={user}
            onSignOut={onSignOut}
            onToggleSidebar={handleToggleSidebar}
            portalContainer={portalContainer}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
