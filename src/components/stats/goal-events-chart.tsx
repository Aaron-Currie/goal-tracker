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
import { MonthlyEvent } from "@/lib/utils/stats/compute-stats";

type Props = {
  data: MonthlyEvent[];
};

export default function GoalEventsChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 16, left: -16, bottom: 0 }} barCategoryGap="30%" style={{ outline: "none" }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#3730a3", fontWeight: 700 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#3730a3" }}
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
          wrapperStyle={{ fontSize: 12, fontWeight: 700, paddingTop: 8 }}
        />
        <Bar dataKey="completed" name="Completed" fill="#4caf4f" radius={[4, 4, 0, 0]} />
        <Bar dataKey="failed" name="Failed" fill="#f44336" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
