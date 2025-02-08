"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { Area, AreaChart, XAxis } from "recharts";

export function SnippetCopiesChart() {
  return (
    <ChartContainer
      className="h-[110px] w-full"
      config={{
        desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
      }}
    >
      <AreaChart
        accessibilityLayer
        data={[
          { month: "January", desktop: 186 },
          { month: "February", desktop: 305 },
          { month: "March", desktop: 237 },
          { month: "April", desktop: 73 },
          { month: "May", desktop: 209 },
          { month: "June", desktop: 214 },
        ]}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <XAxis
          hide
          dataKey="month"
          axisLine={false}
          tickMargin={8}
          padding={{ left: 0, right: 0 }}
          interval={0}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Area
          offset={0}
          dataKey="desktop"
          type="linear"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
