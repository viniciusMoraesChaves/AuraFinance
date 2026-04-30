import { useState } from "react";

export interface Investment {
  id: string;
  ticker: string;
  name: string;
  category: string;
  currentPrice: number;
  variation24h: number; 
  quantity: number;
  quantityUnit: string; // "Ações", "BTC", etc.
  totalValue: number;
  avatarColor: string;
}

interface MyInvestmentsProps {
  investments?: Investment[];
  onVerTodos?: () => void;
}

export const MOCK_INVESTMENTS: Investment[] = [
  {
    id: "1",
    ticker: "NVDA",
    name: "NVIDIA Corp (NVDA)",
    category: "Ações",
    currentPrice: 842.12,
    variation24h: 2.4,
    quantity: 22.40,
    quantityUnit: "Ações",
    totalValue: 18863.48,
    avatarColor: "#4f46e5",
  },
  {
    id: "2",
    ticker: "BTC",
    name: "Bitcoin (BTC)",
    category: "Cripto",
    currentPrice: 68432.10,
    variation24h: -1.2,
    quantity: 0.149,
    quantityUnit: "BTC",
    totalValue: 10214.38,
    avatarColor: "#f97316",
  },
  {
    id: "3",
    ticker: "VNQ",
    name: "Vanguard REIT ETF (VNQ)",
    category: "ETF",
    currentPrice: 84.55,
    variation24h: 0.0,
    quantity: 100,
    quantityUnit: "Ações",
    totalValue: 8455.00,
    avatarColor: "#7c3aed",
  },
];

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatQuantity(qty: number, unit: string): string {
  const formatted = qty % 1 === 0
    ? qty.toFixed(0)
    : qty < 1
    ? qty.toFixed(3)
    : qty.toFixed(2);
  return `${formatted} ${unit}`;
}

function VariationBadge({ value }: { value: number }) {
  const isPositive = value > 0;
  const isNeutral  = value === 0;

  const bg    = isNeutral ? "#f3f4f6" : isPositive ? "#dcfce7" : "#fee2e2";
  const color = isNeutral ? "#6b7280" : isPositive ? "#16a34a" : "#dc2626";
  const sign  = isPositive ? "+" : "";

  return (
    <span style={{display: "inline-block", background: bg, color, borderRadius: "20px", padding: "4px 12px", fontSize: "13px", fontWeight: 500}}>
      {sign}{value.toFixed(1)}%
    </span>
  );
}

function Avatar({ letter, color }: { letter: string; color: string }) {
  return (
    <div style={{width: "38px", height: "38px", borderRadius: "10px", background: color + "22", border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,}}>
      <span style={{ fontSize: "15px", fontWeight: 700, color }}>
        {letter}
      </span>
    </div>
  );
}

const COL = "2fr 1fr 1fr 1fr 1fr";

export default function SavingsList({
  investments = MOCK_INVESTMENTS,
  onVerTodos,
}: MyInvestmentsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif",}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px 18px"}}>
        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#111827" }}>
          Meus Investimentos
        </h3>
        <button
          onClick={onVerTodos}
          style={{ background: "none", border: "none", color: "#4f46e5", fontSize: "14px", fontWeight: 500, cursor: "pointer", padding: 0}}>
          Ver Todos
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: COL, padding: "10px 28px", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", background: "#fafafa"}}>
        {["ATIVO", "PREÇO ATUAL", "VARIAÇÃO 24H", "QUANTIDADE", "VALOR TOTAL"].map((h, i) => (
          <span key={h} style={{fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textAlign: i >= 1 ? "left" : "left",}}>
            {h}
          </span>
        ))}
      </div>

      {investments.map((inv, idx) => (
        <div
          key={inv.id}
          style={{ display: "grid", gridTemplateColumns: COL, padding: "18px 28px", alignItems: "center", borderBottom: idx < investments.length - 1 ? "1px solid #f3f4f6" : "none", background: hovered === inv.id ? "#f9fafb" : "transparent", transition: "background 0.12s", cursor: "default"}}
          onMouseEnter={() => setHovered(inv.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Ativo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar letter={inv.ticker[0]} color={inv.avatarColor} />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "#111827", lineHeight: 1.3 }}>
                {inv.name}
              </div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                {inv.category}
              </div>
            </div>
          </div>

          <span style={{ fontSize: "15px", fontWeight: 500, color: "#111827" }}>
            R${formatBRL(inv.currentPrice)}
          </span>

          <span>
            <VariationBadge value={inv.variation24h} />
          </span>

          <span style={{ fontSize: "14px", color: "#374151" }}>
            {formatQuantity(inv.quantity, inv.quantityUnit)}
          </span>

          <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
            R${formatBRL(inv.totalValue)}
          </span>
        </div>
      ))}
    </div>
  );
}