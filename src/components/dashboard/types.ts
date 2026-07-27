import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export type TrendDirection = 'up' | 'down';

export interface TrendChange {
  direction: TrendDirection;
  value: string;
}

export interface StatMetric {
  label: string;
  value: string;
  change: TrendChange;
  caption?: string;
}

export interface ChartPoint {
  label: string;
  [seriesKey: string]: number | string;
}

export interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

export interface ChangelogEntry {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}
