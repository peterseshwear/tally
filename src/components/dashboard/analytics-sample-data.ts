import type { AnalyticsMetric, MetricPoint } from './types';

const WEEK_LABELS = [
  'Jul 21',
  'Jul 22',
  'Jul 23',
  'Jul 24',
  'Jul 25',
  'Jul 26',
  'Jul 27',
];

function flatSeries(): MetricPoint[] {
  return WEEK_LABELS.map((label) => ({ label, value: 0 }));
}

const currency = (value: number) => `$${value}`;
const count = (value: number) => `${value}`;

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    key: 'payments',
    title: 'Payments',
    colSpan: 2,
    empty: true,
  },
  {
    key: 'gross-volume',
    title: 'Gross volume',
    colSpan: 2,
    value: '$0.00',
    previousPeriod: '$0.00 previous period',
    data: flatSeries(),
    yDomainMax: 20,
    yTickFormatter: currency,
    updatedLabel: 'Updated just now',
    moreDetailsHref: '#',
  },
  {
    key: 'connect-payment-volume',
    title: 'Connect payment volume',
    colSpan: 2,
    value: '$0.00',
    previousPeriod: '$0.00 previous period',
    data: flatSeries(),
    yDomainMax: 100,
    yTickFormatter: currency,
    updatedLabel: 'Updated just now',
    moreDetailsHref: '#',
  },
  {
    key: 'connect-successful-payments',
    title: 'Connect successful payments',
    colSpan: 2,
    value: '0',
    previousPeriod: '0 previous period',
    data: flatSeries(),
    yDomainMax: 1,
    yTickFormatter: count,
    updatedLabel: 'Updated just now',
  },
  {
    key: 'new-connected-accounts',
    title: 'New connected accounts',
    colSpan: 2,
    value: '0',
    previousPeriod: '0 previous period',
    data: flatSeries(),
    yDomainMax: 1,
    yTickFormatter: count,
    updatedLabel: 'Updated just now',
    moreDetailsHref: '#',
  },
  {
    key: 'mrr',
    title: 'MRR',
    colSpan: 2,
    value: '$0.00',
    previousPeriod: '$0.00 previous period',
    data: flatSeries(),
    yDomainMax: 20,
    yTickFormatter: currency,
    updatedLabel: 'Updated just now',
    moreDetailsHref: '#',
  },
  {
    key: 'net-volume',
    title: 'Net volume',
    colSpan: 3,
    value: '$0.00',
    previousPeriod: '$0.00 previous period',
    data: flatSeries(),
    yDomainMax: 25,
    yTickFormatter: currency,
    updatedLabel: 'Updated just now',
    moreDetailsHref: '#',
  },
  {
    key: 'failed-payments',
    title: 'Failed payments',
    colSpan: 3,
    empty: true,
  },
  {
    key: 'new-customers',
    title: 'New customers',
    colSpan: 3,
    value: '0',
    previousPeriod: '0 previous period',
    data: flatSeries(),
    yDomainMax: 1,
    yTickFormatter: count,
    updatedLabel: 'Updated just now',
    moreDetailsHref: '#',
  },
  {
    key: 'top-customers-by-spend',
    title: 'Top customers by spend',
    colSpan: 3,
    empty: true,
    periodLabel: 'All time',
  },
];
