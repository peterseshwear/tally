import { Info } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { MetricEmptyState } from './metric-empty-state';
import { MetricSparkline } from './metric-sparkline';
import type { AnalyticsMetric } from './types';

interface MetricCardProps {
  metric: AnalyticsMetric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  return (
    <div
      className={cn('bg-background flex h-full flex-col gap-4 p-6', className)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-body-sm-medium text-foreground flex items-center gap-1.5">
          {metric.title}
          <Info className="text-muted-foreground size-3.5" />
        </div>
        {metric.periodLabel && (
          <span className="text-body-xs text-muted-foreground">
            {metric.periodLabel}
          </span>
        )}
      </div>

      {metric.empty ? (
        <MetricEmptyState />
      ) : (
        <>
          <div className="flex flex-col gap-0.5">
            <span className="text-heading-5 text-foreground">
              {metric.value}
            </span>
            <span className="text-body-xs text-muted-foreground">
              {metric.previousPeriod}
            </span>
          </div>

          <MetricSparkline
            data={metric.data ?? []}
            domainMax={metric.yDomainMax}
            tickFormatter={metric.yTickFormatter}
          />

          <div className="text-body-xs text-muted-foreground flex items-center justify-between">
            <span>{metric.updatedLabel}</span>
            {metric.moreDetailsHref && (
              <Link
                href={metric.moreDetailsHref}
                className="text-foreground hover:underline"
              >
                More details
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
