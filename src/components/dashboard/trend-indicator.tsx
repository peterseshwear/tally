import { TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { TrendChange } from './types';

interface TrendIndicatorProps {
  change: TrendChange;
  caption?: string;
  variant?: 'inline' | 'pill';
  className?: string;
}

export function TrendIndicator({
  change,
  caption,
  variant = 'inline',
  className,
}: TrendIndicatorProps) {
  const isUp = change.direction === 'up';
  const Icon = isUp ? TrendingUp : TrendingDown;
  const tone = isUp ? 'text-success-100' : 'text-error-100';

  if (variant === 'pill') {
    return (
      <Badge
        variant="outline"
        className={cn(
          'border-success-100/20 bg-success-100/10 text-body-xs-medium gap-1 rounded-full px-2.5 py-1 font-normal',
          !isUp && 'border-error-100/20 bg-error-100/10',
          tone,
          className,
        )}
      >
        <Icon className="size-3" />
        {change.value}
      </Badge>
    );
  }

  return (
    <span
      className={cn('text-body-xs inline-flex items-center gap-1.5', className)}
    >
      <span className={cn('inline-flex items-center gap-1 font-medium', tone)}>
        <Icon className="size-3.5" />
        {change.value}
      </span>
      {caption ? (
        <span className="text-muted-foreground">{caption}</span>
      ) : null}
    </span>
  );
}
