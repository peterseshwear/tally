'use client';

import type { User } from '@supabase/supabase-js';
import { Bell, LayoutGrid, LogOut, PanelLeft } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DashboardHeaderProps {
  pageTitle?: string;
  user: User | null;
  onSignOut: () => void;
  onToggleSidebar: () => void;
  portalContainer?: HTMLDivElement | null;
}

function initialsFromEmail(email?: string | null) {
  if (!email) return '?';
  return email.slice(0, 2).toUpperCase();
}

export function DashboardHeader({
  pageTitle = 'Dashboard',
  user,
  onSignOut,
  onToggleSidebar,
  portalContainer,
}: DashboardHeaderProps) {
  return (
    <header className="border-border flex h-[72px] shrink-0 items-center justify-between gap-4 border-b px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="border-transparent"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="size-4" />
        </Button>
        <div className="text-body-md-medium text-foreground flex items-center gap-2">
          <LayoutGrid className="text-muted-foreground size-4" />
          {pageTitle}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="border-border"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent container={portalContainer}>
            Notifications
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="ml-1 rounded-full">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary-25 text-body-xs-bold text-primary-200">
                  {initialsFromEmail(user?.email)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            container={portalContainer}
            className="w-56"
          >
            <DropdownMenuLabel className="text-body-xs text-muted-foreground truncate">
              {user?.email ?? 'Signed in'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut} className="gap-2">
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
