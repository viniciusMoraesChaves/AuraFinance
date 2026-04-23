import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", valor: 90000 },
  { name: "Fev", valor: 105000 },
  { name: "Mar", valor: 115000 },
  { name: "Abr", valor: 125000 },
  { name: "Mai", valor: 140000 },
  { name: "Jun", valor: 155000 },
];

export function ObjectivesEvolution() {
  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", height: "100%",}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center",}}>
        <div>
          <h3 style={{ margin: 0 }}>Evolução das Economias</h3>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px",}}>
            Progresso acumulado nos últimos 6 meses
          </p>
        </div>

        <div style={{ fontSize: "12px", background: "#f3f4f6", padding: "6px 12px", borderRadius: "50px",}}>
          Últimos 6 Meses
        </div>
      </div>

      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />

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

            <Line
              type="monotone"
              dataKey="valor"
              stroke="#1e3a8a"
              strokeWidth={3}
              dot={{
                r: 6,
                stroke: "#1e3a8a",
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}