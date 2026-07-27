import { cn } from '@/lib/utils';

import { analyticsMetrics } from './analytics-sample-data';
import { MetricCard } from './metric-card';
import type { AnalyticsMetric } from './types';

interface AnalyticsGridProps {
  metrics?: AnalyticsMetric[];
  className?: string;
}

export function AnalyticsGrid({
  metrics = analyticsMetrics,
  className,
}: AnalyticsGridProps) {
  return (
    <div
      className={cn(
        'border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-6',
        className,
      )}
    >
      {metrics.map((metric) => (
        <MetricCard
          key={metric.key}
          metric={metric}
          className={metric.colSpan === 3 ? 'lg:col-span-3' : 'lg:col-span-2'}
        />
      ))}
    </div>
  );
}
