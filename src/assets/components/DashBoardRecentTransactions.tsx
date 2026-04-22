import { useNavigate } from "react-router-dom";

function RecentTransactions() {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      name: "Apple Store Purchase",
      details: "Cartão final 4482",
      category: "Eletrônicos",
      date: "24 Out, 2023",
      value: -999.0,
      type: "expense",
    },
    {
      id: 2,
      name: "Salário Mensal",
      details: "Conta bancária",
      category: "Receita",
      date: "25 Out, 2023",
      value: 5000.0,
      type: "income",
    },
    {
      id: 3,
      name: "Supermercado Extra",
      details: "Cartão final 4482",
      category: "Alimentação",
      date: "24 Out, 2023",
      value: -450.0,
      type: "expense",
    },
  ];

  return (
    <div style={{background: "#ffffff", borderRadius: "16px", padding: "20px", marginTop: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",}}>
      <div
        style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px",}}>
        <h3 style={{ margin: 0, fontSize: "18px", color: "#111827" }}>
          Transações Recentes
        </h3>

        <span
          onClick={() => navigate("/transactions")}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          style={{fontSize: "14px", color: "#4f46e5", cursor: "pointer", fontWeight: 500, transition: "opacity 0.2s",}}>
          Ver todas
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Transação</th>
            <th style={thStyle}>Categoria</th>
            <th style={thStyle}>Data</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Valor</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{borderBottom: "1px solid #f3f4f6", transition: "background 0.2s",}}
              onMouseEnter={(e) =>(e.currentTarget.style.background = "#f9fafb") }
              onMouseLeave={(e) =>(e.currentTarget.style.background = "transparent")}>

              <td style={tdStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{ width: "40px", height: "40px", background: "#eef2ff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",}}>
                    🛒
                  </div>

                  <div>
                    <div style={{ fontWeight: 500, color: "#111827" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {t.details}
                    </div>
                  </div>
                </div>
              </td>

              <td style={tdStyle}>
                <span
                  style={{background: "#f3f4f6", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", color: "#374151",}}>
                  {t.category}
                </span>
              </td>
              <td style={{ ...tdStyle, color: "#6b7280", fontSize: "14px" }}>
                {t.date}
              </td>
              <td
                style={{
                  ...tdStyle,
                  textAlign: "right",
                  fontWeight: 600,
                  color: t.type === "income" ? "#16a34a" : "#dc2626",
                }}
              >
                {t.type === "income" ? "+" : "-"}R$
                {Math.abs(t.value).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  textAlign: "left" as const,
  fontSize: "12px",
  color: "#6b7280",
  padding: "10px 8px",
};

const tdStyle = {
  padding: "14px 8px",
};

export default RecentTransactions;