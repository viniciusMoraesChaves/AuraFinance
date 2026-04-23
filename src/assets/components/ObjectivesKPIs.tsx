import { Target, DollarSign, TrendingUp } from "lucide-react";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {children}
    </div>
  );
}

export default function ObjectivesKPIs() {
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", width: "100%",}}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{width: "44px", height: "44px", borderRadius: "12px", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#4338ca",}}>
            <Target size={20} />
          </div>

          <div style={{ background: "#dcfce7", color: "#16a34a", padding: "4px 10px", borderRadius: "50px", fontSize: "12px", }}>
            +15% este mês
          </div>
        </div>

        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          Progresso Total
        </span>

        <div style={{ fontSize: "28px", fontWeight: 600 }}>22%</div>

        <div style={{ width: "100%", height: "8px", background: "#e5e7eb", borderRadius: "10px", overflow: "hidden",}}>
          <div style={{width: "22%", height: "100%", background: "#4338ca",borderRadius: "10px",}}/>
        </div>
      </Card>

      <Card>
        <div style={{width: "44px", height: "44px", borderRadius: "12px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center",color: "#2563eb",}}>
          <DollarSign size={20} />
        </div>

        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          Total Economizado
        </span>

        <div style={{ fontSize: "28px", fontWeight: 600 }}>
          R$ 340.000
        </div>

        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          de R$ 1.545.000
        </span>
      </Card>

      <Card>
        <div style={{width: "44px", height: "44px", borderRadius: "12px", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed",}}>
          <TrendingUp size={20} />
        </div>

        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          Objetivos Ativos
        </span>

        <div style={{ fontSize: "28px", fontWeight: 600 }}>4</div>

        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          1 próximo da conclusão
        </span>
      </Card>
    </div>
  );
}