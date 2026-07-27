import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  description: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  badge,
  children,
  className,
}: ChartCardProps) {
  return (
    <div className={cn('bg-background flex flex-col gap-6 p-6', className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <h3 className="text-body-lg-bold text-foreground">{title}</h3>
          {badge}
        </div>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
