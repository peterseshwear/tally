import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import {
  copyrightYear,
  defaultChangelogEntry,
  defaultFooterLinks,
  defaultNavSections,
} from './sample-data';
import { SidebarChangelogCard } from './sidebar-changelog-card';
import { SidebarNavSection } from './sidebar-nav-section';
import type { ChangelogEntry, NavSection } from './types';

interface SidebarContentProps {
  sections?: NavSection[];
  changelog?: ChangelogEntry;
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function SidebarContent({
  sections = defaultNavSections,
  changelog = defaultChangelogEntry,
  collapsed = false,
  onNavigate,
  className,
}: SidebarContentProps) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div
        className={cn(
          'flex h-[72px] shrink-0 items-center gap-2 px-6',
          collapsed && 'justify-center px-0',
        )}
      >
        <LayoutGrid className="text-primary-100 size-5 shrink-0" />
        {!collapsed && (
          <span className="text-body-lg-bold text-foreground">Zippay</span>
        )}
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-6 py-2">
          {sections.map((section) => (
            <SidebarNavSection
              key={section.title}
              section={section}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </ScrollArea>

      {!collapsed && (
        <div className="flex flex-col gap-4 p-4">
          <SidebarChangelogCard entry={changelog} />
        </div>
      )}

      <Separator />

      <div
        className={cn('flex flex-col gap-1 p-3', collapsed && 'items-center')}
      >
        {defaultFooterLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={cn(
                'text-body-sm-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                collapsed && 'justify-center px-0',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
        {!collapsed && (
          <p className="text-body-xs text-muted-foreground px-3 pt-2">
            © {copyrightYear} Zippay LLC
          </p>
        )}
      </div>
    </div>
  );
}
