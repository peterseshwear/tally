interface MetricEmptyStateProps {
  label?: string;
}

export function MetricEmptyState({ label = 'No data' }: MetricEmptyStateProps) {
  return (
    <div className="border-border flex flex-1 items-center justify-center rounded-lg border border-dashed">
      <span className="bg-muted text-body-xs-medium text-muted-foreground rounded-md px-3 py-1.5">
        {label}
      </span>
    </div>
  );
}
