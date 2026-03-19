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
  const data = monthlyUsage;
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
          dataKey="label"
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
  const data = yearlyUsage.map((y) => ({
    year: y.year,
    usage: y.total_usage,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
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
        <Line
          type="monotone"
          dataKey="usage"
          stroke="#2196F3"
          strokeWidth={3}
          dot={{ r: 4, fill: "#2196F3" }}
          activeDot={{ r: 6, fill: "#00E5FF", stroke: "#fff", strokeWidth: 2 }}
          name="Yearly Usage (kWh)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function VoltageTrendChart({ voltageTrend }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={voltageTrend}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E2E8F0"
          vertical={false}
        />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="voltage"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ r: 3, fill: "#F59E0B" }}
          name="Voltage (V)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PowerFactorTrendChart({ powerFactorTrend }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={powerFactorTrend}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E2E8F0"
          vertical={false}
        />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0.8, 1]}
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="stepAfter"
          dataKey="power_factor"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={{ r: 3, fill: "#8B5CF6" }}
          name="Power Factor"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TokenPurchaseTrendChart({ tokenTrend }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={tokenTrend}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E2E8F0"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: "0.8125rem", paddingTop: "10px" }} />
        <Bar
          yAxisId="left"
          dataKey="energy"
          fill="#10B981"
          radius={[4, 4, 0, 0]}
          name="Token Energy (kWh)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="frequency"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4, fill: "#3B82F6" }}
          name="Purchase Freq"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
