"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
  Cell,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "#0A1929",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "0.8125rem",
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
};

export function EnergyLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2196F3" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: "0.8125rem" }} />
        <Area
          type="monotone"
          dataKey="consumption"
          stroke="#2196F3"
          fillOpacity={1}
          fill="url(#colorConsumption)"
          strokeWidth={2.5}
          name="Consumption (kWh)"
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#00E5FF"
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={false}
          name="Target"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RiskBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 12, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Customers">
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function UsageTrendChart({ monthlyUsage }) {
  const data = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((m, i) => ({
    month: m,
    usage: monthlyUsage[i] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2196F3" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="usage"
          stroke="#2196F3"
          fillOpacity={1}
          fill="url(#colorUsage)"
          strokeWidth={2}
          name="Usage (kWh)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function YearlyTrendChart({ yearlyUsage }) {
  const data = [2022, 2023, 2024, 2025, 2026].map((y, i) => ({
    year: y.toString(),
    usage: yearlyUsage[i] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar
          dataKey="usage"
          fill="#2196F3"
          radius={[6, 6, 0, 0]}
          name="Yearly Usage (kWh)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
