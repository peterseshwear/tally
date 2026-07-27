import { ChannelSalesChart } from './channel-sales-chart';
import { NetRevenueChart } from './net-revenue-chart';
import { defaultStatMetrics } from './sample-data';
import { StatGrid } from './stat-grid';
import type { StatMetric } from './types';

interface DashboardProps {
  metrics?: StatMetric[];
  className?: string;
}

export function Dashboard({ metrics = defaultStatMetrics }: DashboardProps) {
  return (
    <div className="border-border bg-border flex flex-col gap-px border">
      <StatGrid metrics={metrics} />
      <div className="bg-border grid grid-cols-1 gap-px lg:grid-cols-2">
        <NetRevenueChart />
        <ChannelSalesChart />
      </div>
    </div>
  );
}
