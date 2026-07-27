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
    value: '847',
    change: { direction: 'up', value: '3.1%' },
    caption: 'vs last week',
  },
  {
    label: 'Revenue',
    value: '$18,290',
    change: { direction: 'up', value: '12.4%' },
    caption: 'vs last week',
  },
  {
    label: 'Conversion rate',
    value: '3.28%',
    change: { direction: 'down', value: '0.4%' },
    caption: 'vs last week',
  },
  {
    label: 'New signups',
    value: '142',
    change: { direction: 'up', value: '8.7%' },
    caption: 'vs last week',
  },
];

export const netRevenueSeries: ChartSeries[] = [
  { key: 'revenue', label: 'Net revenue', color: 'var(--chart-1)' },
];

export const netRevenueData: ChartPoint[] = [
  { label: 'Mon', revenue: 5400 },
  { label: 'Tue', revenue: 4800 },
  { label: 'Wed', revenue: 6100 },
  { label: 'Thu', revenue: 6400 },
  { label: 'Fri', revenue: 6900 },
  { label: 'Sat', revenue: 6300 },
  { label: 'Sun', revenue: 7900 },
];

export const netRevenueChangeLabel = '66.9%';

export const channelSalesSeries: ChartSeries[] = [
  { key: 'online', label: 'Online', color: 'var(--chart-1)' },
  { key: 'retail', label: 'In-store', color: 'var(--chart-3)' },
];

export const channelSalesData: ChartPoint[] = [
  { label: 'Apr 7', online: 32, retail: 58 },
  { label: 'Apr 8', online: 32, retail: 66 },
  { label: 'Apr 9', online: 41, retail: 66 },
  { label: 'Apr 10', online: 41, retail: 74 },
  { label: 'Apr 11', online: 52, retail: 82 },
  { label: 'Apr 12', online: 52, retail: 78 },
  { label: 'Apr 13', online: 58, retail: 86 },
];

export const channelSalesChangeLabel = '58.3%';
