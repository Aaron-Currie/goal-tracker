"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BreakdownItem } from "@/lib/utils/stats/compute-stats";

function EmptyChart() {
  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "#3730a3", opacity: 0.5, fontWeight: 700, fontSize: "0.85rem" }}>
      No data for this period
    </div>
  );
}

function TruncatedTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const maxChars = 12;
  const raw = payload?.value ?? "";
  const label = raw.length > maxChars ? raw.slice(0, maxChars) + "…" : raw;
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#3730a3" fontSize={11} fontWeight={700}>
      {label}
    </text>
  );
}

type Props = {
  data: BreakdownItem[];
};

export default function ActivityBreakdownChart({ data }: Props) {
  if (data.length === 0) return <EmptyChart />;
  const height = Math.max(200, data.length * 54 + 48);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
        barCategoryGap="28%"
        style={{ outline: "none" }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#3730a3" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="name"
          type="category"
          width={80}
          tick={<TruncatedTick />}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #2e2e2e4e",
            boxShadow: "2px 4px 0px #2e2e2e4e",
            fontFamily: "inherit",
            fontSize: 13,
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, fontWeight: 700, paddingTop: 4 }}
        />
        <Bar dataKey="completed" name="Completed" stackId="a" fill="#4caf4f" />
        <Bar dataKey="active" name="Active" stackId="a" fill="#4c6fff" />
        <Bar dataKey="failed" name="Failed" stackId="a" fill="#f44336" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
