'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { ChartCard } from './chart-card';
import {
  netRevenueChangeLabel,
  netRevenueData,
  netRevenueSeries,
} from './sample-data';
import { TrendIndicator } from './trend-indicator';
import type { ChartPoint, ChartSeries } from './types';

interface NetRevenueChartProps {
  data?: ChartPoint[];
  series?: ChartSeries[];
  changeLabel?: string;
  className?: string;
}

export function NetRevenueChart({
  data = netRevenueData,
  series = netRevenueSeries,
  changeLabel = netRevenueChangeLabel,
  className,
}: NetRevenueChartProps) {
  const primary = series[0];
  const config: ChartConfig = Object.fromEntries(
    series.map((s) => [s.key, { label: s.label, color: s.color }]),
  );

  return (
    <ChartCard
      title="Net revenue"
      description="Daily net sales, last 7 days."
      badge={
        <TrendIndicator
          variant="pill"
          change={{ direction: 'up', value: changeLabel }}
        />
      }
      className={className}
    >
      <ChartContainer config={config} className="aspect-auto h-72 w-full">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="net-revenue-bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primary.color} stopOpacity={0.9} />
              <stop
                offset="100%"
                stopColor={primary.color}
                stopOpacity={0.15}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
          />
          <ChartTooltip
            cursor={{ fill: 'var(--muted)' }}
            content={<ChartTooltipContent />}
          />
          <Bar
            dataKey={primary.key}
            fill="url(#net-revenue-bar)"
            radius={[6, 6, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
