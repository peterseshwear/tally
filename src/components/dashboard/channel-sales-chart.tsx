'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { ChartCard } from './chart-card';
import {
  channelSalesChangeLabel,
  channelSalesData,
  channelSalesSeries,
} from './sample-data';
import { TrendIndicator } from './trend-indicator';
import type { ChartPoint, ChartSeries } from './types';

interface ChannelSalesChartProps {
  data?: ChartPoint[];
  series?: ChartSeries[];
  changeLabel?: string;
  className?: string;
}

export function ChannelSalesChart({
  data = channelSalesData,
  series = channelSalesSeries,
  changeLabel = channelSalesChangeLabel,
  className,
}: ChannelSalesChartProps) {
  const config: ChartConfig = Object.fromEntries(
    series.map((s) => [s.key, { label: s.label, color: s.color }]),
  );

  return (
    <ChartCard
      title="Channel sales"
      description="Daily sales count by channel, last 7 days."
      badge={
        <TrendIndicator
          variant="pill"
          change={{ direction: 'up', value: changeLabel }}
        />
      }
      className={className}
    >
      <ChartContainer config={config} className="aspect-auto h-72 w-full">
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {series.map((s, index) => (
            <Line
              key={s.key}
              type="stepAfter"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={index === 0 ? 2.5 : 1.5}
              strokeOpacity={index === 0 ? 1 : 0.45}
              dot={false}
              isAnimationActive={false}
              style={
                index === 0
                  ? { filter: `drop-shadow(0 0 6px ${s.color})` }
                  : undefined
              }
            />
          ))}
        </LineChart>
      </ChartContainer>
    </ChartCard>
  );
}
