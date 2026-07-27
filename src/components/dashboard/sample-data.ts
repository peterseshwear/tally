import {
  BarChart3,
  BookOpen,
  CreditCard,
  FolderKanban,
  HelpCircle,
  KeyRound,
  Plug,
  Settings,
  Users,
} from 'lucide-react';

import type {
  ChangelogEntry,
  ChartPoint,
  ChartSeries,
  NavSection,
  StatMetric,
} from './types';

export const defaultNavSections: NavSection[] = [
  {
    title: 'Product',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
      { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
      { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Team', href: '/dashboard/team', icon: Users },
      { label: 'Integrations', href: '/integrations', icon: Plug },
      { label: 'API Keys', href: '/dashboard/api-keys', icon: KeyRound },
    ],
  },
  {
    title: 'Administration',
    items: [
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    ],
  },
];

export const copyrightYear = 2026;

export const defaultChangelogEntry: ChangelogEntry = {
  eyebrow: 'Changelog',
  title: 'Product update',
  description: 'Performance boosts and UI polish.',
  href: '/blog',
  linkLabel: 'Learn more',
};

export const defaultFooterLinks: {
  label: string;
  href: string;
  icon: NavSection['items'][number]['icon'];
}[] = [
  { label: 'Help Center', href: '/faq', icon: HelpCircle },
  { label: 'Documentation', href: '/blog', icon: BookOpen },
];

export const defaultStatMetrics: StatMetric[] = [
  {
    label: 'Active users',
    value: '0',
    change: { direction: 'up', value: '0%' },
    caption: 'vs last week',
  },
  {
    label: 'Revenue',
    value: '$0',
    change: { direction: 'up', value: '0%' },
    caption: 'vs last week',
  },
  {
    label: 'Conversion rate',
    value: '0%',
    change: { direction: 'up', value: '0%' },
    caption: 'vs last week',
  },
  {
    label: 'New signups',
    value: '0',
    change: { direction: 'up', value: '0%' },
    caption: 'vs last week',
  },
];

export const netRevenueSeries: ChartSeries[] = [
  { key: 'revenue', label: 'Net revenue', color: 'var(--chart-1)' },
];

export const netRevenueData: ChartPoint[] = [
  { label: 'Mon', revenue: 0 },
  { label: 'Tue', revenue: 0 },
  { label: 'Wed', revenue: 0 },
  { label: 'Thu', revenue: 0 },
  { label: 'Fri', revenue: 0 },
  { label: 'Sat', revenue: 0 },
  { label: 'Sun', revenue: 0 },
];

export const netRevenueChangeLabel = '0%';

export const channelSalesSeries: ChartSeries[] = [
  { key: 'online', label: 'Online', color: 'var(--chart-1)' },
  { key: 'retail', label: 'In-store', color: 'var(--chart-3)' },
];

export const channelSalesData: ChartPoint[] = [
  { label: 'Apr 7', online: 0, retail: 0 },
  { label: 'Apr 8', online: 0, retail: 0 },
  { label: 'Apr 9', online: 0, retail: 0 },
  { label: 'Apr 10', online: 0, retail: 0 },
  { label: 'Apr 11', online: 0, retail: 0 },
  { label: 'Apr 12', online: 0, retail: 0 },
  { label: 'Apr 13', online: 0, retail: 0 },
];

export const channelSalesChangeLabel = '0%';
