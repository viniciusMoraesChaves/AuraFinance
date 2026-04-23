import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Moradia", value: 900, color: "#1e3a8a" },
  { name: "Alimentação", value: 500, color: "#f59e0b" },
  { name: "Transporte", value: 300, color: "#10b981" },
  { name: "Outros", value: 1420, color: "#8b5cf6" },
];

export function DashBoardExpensesByCategory() {
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];

      return (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: "12px",
          }}
        >
          <p style={{ margin: 0, color: "#6b7280" }}>
            {item.name}
          </p>
          <p style={{ margin: 0, fontWeight: 600 }}>
            R${item.value}
          </p>
        </div>
      );
    }
    return null;
  };


  return (
    <div
      style={{background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", flex: 1,}}>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "18px" }}>
          Gastos por Categoria
        </h3>
        <p style={{ margin: 0, color: "#6b7280" }}>
          Onde seu dinheiro vai
        </p>
      </div>

      <div style={{ width: "100%", height: "200px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip content={<CustomTooltip />} cursor={false} wrapperStyle={{outline: "none",zIndex: 1000,}}/>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{display: "flex", justifyContent: "space-between", alignItems: "center",}}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{width: "10px", height: "10px", borderRadius: "50%", background: item.color,}}/>
              <span>{item.name}</span>
            </div>

            <span>R${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}