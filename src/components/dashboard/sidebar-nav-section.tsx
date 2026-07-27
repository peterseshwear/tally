'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import type { NavSection } from './types';

interface SidebarNavSectionProps {
  section: NavSection;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export function SidebarNavSection({
  section,
  collapsed,
  onNavigate,
}: SidebarNavSectionProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {!collapsed && (
        <span className="text-body-xs-medium text-muted-foreground px-3">
          {section.title}
        </span>
      )}
      <nav className="flex flex-col gap-0.5">
        {section.items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={cn(
                'text-body-sm-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                collapsed && 'justify-center px-0',
                isActive && 'bg-accent text-accent-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
