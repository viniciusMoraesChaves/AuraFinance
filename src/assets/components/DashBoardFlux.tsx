import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "JAN", renda: 8200, despesas: 5000 },
  { name: "FEV", renda: 12700, despesas: 3200 },
  { name: "MAR", renda: 8100, despesas: 3900 },
  { name: "ABR", renda: 4300, despesas: 5900 },
  { name: "MAI", renda: 10900, despesas: 6980 },
  { name: "JUN", renda: 15837, despesas: 8705 },
];

export function DashboardFlux() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{display: "flex",justifyContent: "space-between",marginBottom: "16px",}}>
        <div>
          <h3 style={{ margin: 0 }}>Fluxo de Caixa</h3>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Renda vs Despesas nos últimos 6 meses
          </p>
        </div>

        <div
          style={{fontSize: "12px",background: "#f3f4f6",padding: "6px 10px",borderRadius: "50px",}}>
          Últimos 6 Meses
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: "260px" }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="renda"
              stroke="#1e8217"
              fill="#1dd833a8"
              fillOpacity={0.1}
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="despesas"
              stroke="#de0000"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}