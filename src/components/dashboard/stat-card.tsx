import { cn } from '@/lib/utils';

import { TrendIndicator } from './trend-indicator';
import type { StatMetric } from './types';

interface StatCardProps {
  metric: StatMetric;
  className?: string;
}

export function StatCard({ metric, className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col gap-6 px-6 py-5', className)}>
      <span className="text-body-sm text-muted-foreground">{metric.label}</span>
      <span className="text-heading-3 text-foreground">{metric.value}</span>
      <TrendIndicator change={metric.change} caption={metric.caption} />
    </div>
  );
}
