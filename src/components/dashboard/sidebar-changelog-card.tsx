import Link from 'next/link';

import type { ChangelogEntry } from './types';

interface SidebarChangelogCardProps {
  entry: ChangelogEntry;
}

export function SidebarChangelogCard({ entry }: SidebarChangelogCardProps) {
  return (
    <div className="border-border flex flex-col gap-1.5 rounded-xl border p-4">
      <span className="text-body-xs-medium text-muted-foreground tracking-wide uppercase">
        {entry.eyebrow}
      </span>
      <p className="text-body-sm-bold text-foreground">{entry.title}</p>
      <p className="text-body-xs text-muted-foreground">{entry.description}</p>
      <Link
        href={entry.href}
        className="text-body-xs-medium text-primary-100 hover:underline"
      >
        {entry.linkLabel}
      </Link>
    </div>
  );
}
