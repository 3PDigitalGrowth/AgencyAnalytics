"use client";
import {
  ResponsiveContainer,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface BarChartProps {
  data: Record<string, string | number>[];
  dataKey: string;
  labelKey: string;
  color?: string;
  height?: number;
  formatter?: (value: number) => string;
}

export function BarChart({ data, dataKey, labelKey, color = "#FF5722", height = 220, formatter }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} layout="vertical" barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#606060", fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={formatter} />
        <YAxis type="category" dataKey={labelKey} tick={{ fill: "#A0A0A0", fontSize: 11 }} axisLine={false}
          tickLine={false} width={120} />
        <Tooltip
          contentStyle={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 8 }}
          labelStyle={{ color: "#606060", fontSize: 11 }}
          itemStyle={{ color: color, fontWeight: 600 }}
          formatter={formatter ? (v: any) => [formatter(v), ""] : undefined}
        />
        <Bar dataKey={dataKey} radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === 0 ? color : `${color}60`} />
          ))}
        </Bar>
      </RechartsBar>
    </ResponsiveContainer>
  );
}
