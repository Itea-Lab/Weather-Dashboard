// components/ui/chart.tsx
import { Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { ReactNode } from "react";

export type ChartConfig = Record<string, { label: string; color: string }>;

import { ReactElement } from "react";

export function ChartContainer({
  children,
  config,
}: {
  children: ReactElement;
  config: ChartConfig;
}) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip({
  content,
  ...props
}: TooltipProps<number, string> & {
  content: ReactNode;
}) {
  return <Tooltip {...props} content={content} />;
}

export function ChartTooltipContent({
  payload,
  hideLabel,
}: {
  payload?: any[];
  hideLabel?: boolean;
}) {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="rounded-md border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="text-sm text-muted-foreground mb-1">
          {payload[0].payload.month}
        </div>
      )}
      {payload.map((entry, index) => (
        <div key={index} className="text-sm">
          {entry.name}: {entry.value}
        </div>
      ))}
    </div>
  );
}
