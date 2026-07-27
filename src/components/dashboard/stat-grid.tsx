import { cn } from '@/lib/utils';

import { StatCard } from './stat-card';
import type { StatMetric } from './types';

interface StatGridProps {
  metrics: StatMetric[];
  className?: string;
}

export function StatGrid({ metrics, className }: StatGridProps) {
  return (
    <div
      className={cn(
        'bg-border grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {metrics.map((metric) => (
        <StatCard
          key={metric.label}
          metric={metric}
          className="bg-background"
        />
      ))}
    </div>
  );
}
