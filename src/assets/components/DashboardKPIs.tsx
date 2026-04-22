import { TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

type KPIProps = {
  title: string;
  value: string;
  change: string;
  trend?: "up" | "down";
  subtitle?: string;
  data: { value: number }[];
};

function KPI({
  title,
  value,
  change,
  trend = "up",
  subtitle,
  data,
}: KPIProps) {
  const isPositive = trend === "up";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          {title}
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            padding: "4px 10px",
            borderRadius: "50px",
            background: isPositive ? "#dcfce7" : "#fee2e2",
            color: isPositive ? "#16a34a" : "#dc2626",
          }}
        >
          {isPositive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          {change}
        </div>
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "26px",
          fontWeight: 600,
          color: "#111827",
        }}
      >
        {value}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={{ fontSize: "12px", color: "#9ca3af" }}>
          {subtitle}
        </div>
      )}

      {/* Chart */}
      <div style={{ width: "100%", height: "50px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashboardKPIs() {
  const dataUp = [
    { value: 4000 },
    { value: 4200 },
    { value: 4100 },
    { value: 4500 },
    { value: 4700 },
  ];

  const dataDown = [
    { value: 3200 },
    { value: 3100 },
    { value: 3000 },
    { value: 3050 },
    { value: 2900 },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "100%",
      }}
    >
      <KPI
        title="Saldo Total"
        value="R$45,280.00"
        change="+2.5%"
        trend="up"
        data={dataUp}
      />

      <KPI
        title="Renda Mensal"
        value="R$8,400.00"
        change="Últimos 30d"
        trend="up"
        data={dataUp}
      />

      <KPI
        title="Despesas Mensais"
        value="R$3,120.00"
        change="-1.2%"
        trend="down"
        data={dataDown}
      />
    </div>
  );
}