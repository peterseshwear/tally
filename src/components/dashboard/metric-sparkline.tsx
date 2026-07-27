'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import type { MetricPoint } from './types';

const config: ChartConfig = {
  value: { label: 'Value', color: 'var(--chart-1)' },
};

interface MetricSparklineProps {
  data: MetricPoint[];
  domainMax?: number;
  tickFormatter?: (value: number) => string;
}

export function MetricSparkline({
  data,
  domainMax,
  tickFormatter,
}: MetricSparklineProps) {
  const lastIndex = data.length - 1;

  return (
    <ChartContainer config={config} className="aspect-auto h-32 w-full">
      <LineChart data={data} margin={{ top: 4, right: 4, left: 12, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="label"
          interval={0}
          padding={{ left: 12, right: 12 }}
          tickFormatter={(value: string, index: number) =>
            index === 0 || index === lastIndex ? value : ''
          }
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          orientation="right"
          domain={[0, domainMax ?? 'auto']}
          tickFormatter={tickFormatter}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="linear"
          dataKey="value"
          stroke="var(--chart-1)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
