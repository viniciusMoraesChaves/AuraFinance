import React from "react";

interface Props {
  total: number;
  monthlyChange: number;
  monthlyProfit: number;
  yearlyProfit: number;
  monthlyReturn: number;
}

export default function TotalInvestedCard({
  total,
  monthlyChange,
  monthlyProfit,
  yearlyProfit,
  monthlyReturn,
}: Props) {
  const isPositive = monthlyChange >= 0;

  return (
    <div style={{background: "#fff", borderRadius: "16px", padding: "24px 28px", border: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      
      <div>
        <p style={{fontSize: "13px", color: "#6b7280", marginBottom: "8px"}}>
          Valor Total Investido
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{fontSize: "34px", fontWeight: 700, margin: 0, color: "#111827"}}>
            R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </h2>

          <span style={{ background: isPositive ? "#dcfce7" : "#fee2e2", color: isPositive ? "#166534" : "#991b1b", fontSize: "13px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px"}}>
            {isPositive ? "↗" : "↘"} {monthlyChange}%
          </span>
        </div>

        <p style={{fontSize: "13px", color: "#6b7280",  marginTop: "6px"}}>
          +R$ {monthlyProfit.toLocaleString("pt-BR")} este mês
        </p>
      </div>

      <div style={{ display: "flex",  gap: "40px",textAlign: "right"}}>
        <div>
          <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px"}}>
            RENTABILIDADE MENSAL
          </p>
          <p style={{fontSize: "16px", fontWeight: 600, color: "#16a34a"}}>
            +{monthlyReturn}%
          </p>
        </div>
        <div>
          <p style={{fontSize: "11px",color: "#9ca3af",marginBottom: "4px"}}>
            LUCRO NO ANO
          </p>
          <p style={{fontSize: "16px", fontWeight: 600, color: "#16a34a"}}>
            R$ {yearlyProfit.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}