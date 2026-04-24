import { useState, useMemo } from "react";
import { TransactionFilters } from "./TransactionsFilter";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  date: string; // "YYYY-MM-DD"
  description: string;
  category: string;
  status: "pago" | "pendente" | "cancelado";
  type: "entrada" | "saida";
  amount: number; // positive number always; type determines sign
}

interface TransactionsListProps {
  transactions: Transaction[];
  filters: TransactionFilters;
}

// ─── Mock data (remove when using real data) ──────────────────────────────────

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1",  date: "2023-10-25", description: "Depósito Salário",    category: "receita",      status: "pago",     type: "entrada", amount: 5000 },
  { id: "2",  date: "2023-10-24", description: "Supermercado Extra",  category: "alimentacao",  status: "pago",     type: "saida",   amount: 450  },
  { id: "3",  date: "2023-10-23", description: "Aluguel Outubro",     category: "moradia",      status: "pendente", type: "saida",   amount: 2200 },
  { id: "4",  date: "2023-10-22", description: "Projeto Freelance UI",category: "receita",      status: "pago",     type: "entrada", amount: 1500 },
  { id: "5",  date: "2023-10-21", description: "Conta de Luz",        category: "contas",       status: "pago",     type: "saida",   amount: 180  },
  { id: "6",  date: "2023-10-20", description: "Restaurante",         category: "alimentacao",  status: "pago",     type: "saida",   amount: 125  },
  { id: "7",  date: "2023-10-19", description: "Uber",                category: "transporte",   status: "pago",     type: "saida",   amount: 35   },
  { id: "8",  date: "2023-10-18", description: "Netflix",             category: "lazer",        status: "pago",     type: "saida",   amount: 55   },
  { id: "9",  date: "2023-10-17", description: "Farmácia",            category: "saude",        status: "pago",     type: "saida",   amount: 90   },
  { id: "10", date: "2023-10-16", description: "Freelance Design",    category: "receita",      status: "pago",     type: "entrada", amount: 800  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_MAP: Record<string, number> = {
  "jan-2024": 0,  "fev-2024": 1,  "mar-2024": 2,  "abr-2024": 3,
  "mai-2024": 4,  "jun-2024": 5,  "jul-2024": 6,  "ago-2024": 7,
  "set-2024": 8,  "out-2023": 9,  "nov-2023": 10, "dez-2023": 11,
};
const MONTH_YEAR_MAP: Record<string, { month: number; year: number }> = {
  "jan-2024": { month: 0,  year: 2024 },
  "fev-2024": { month: 1,  year: 2024 },
  "mar-2024": { month: 2,  year: 2024 },
  "abr-2024": { month: 3,  year: 2024 },
  "mai-2024": { month: 4,  year: 2024 },
  "jun-2024": { month: 5,  year: 2024 },
  "jul-2024": { month: 6,  year: 2024 },
  "ago-2024": { month: 7,  year: 2024 },
  "set-2024": { month: 8,  year: 2024 },
  "out-2023": { month: 9,  year: 2023 },
  "nov-2023": { month: 10, year: 2023 },
  "dez-2023": { month: 11, year: 2023 },
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return `${day} ${months[month - 1]}, ${year}`;
}

function formatCurrency(amount: number, type: "entrada" | "saida"): string {
  const formatted = amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  return type === "entrada" ? `+R$ ${formatted}` : `-R$ ${formatted}`;
}

// ─── Category badge colors ────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  receita:     { bg: "#e0f2fe", color: "#0369a1", border: "#7dd3fc" },
  alimentacao: { bg: "#fef9c3", color: "#854d0e", border: "#fde047" },
  moradia:     { bg: "#ede9fe", color: "#5b21b6", border: "#c4b5fd" },
  transporte:  { bg: "#dcfce7", color: "#166534", border: "#86efac" },
  saude:       { bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" },
  lazer:       { bg: "#fce7f3", color: "#9d174d", border: "#f9a8d4" },
  educacao:    { bg: "#dbeafe", color: "#1e40af", border: "#93c5fd" },
  contas:      { bg: "#f3f4f6", color: "#374151", border: "#d1d5db" },
};
const DEFAULT_CATEGORY_STYLE = { bg: "#f3f4f6", color: "#374151", border: "#d1d5db" };

const CATEGORY_LABELS: Record<string, string> = {
  receita: "Receita", alimentacao: "Alimentação", moradia: "Moradia",
  transporte: "Transporte", saude: "Saúde", lazer: "Lazer",
  educacao: "Educação", contas: "Contas",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const style = CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
  return (
    <span style={{
      display: "inline-block",
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      borderRadius: "20px",
      padding: "3px 12px",
      fontSize: "12px",
      fontWeight: 500,
    }}>
      {CATEGORY_LABELS[category] ?? category}
    </span>
  );
}

function StatusBadge({ status }: { status: Transaction["status"] }) {
  const config = {
    pago:      { bg: "#dcfce7", color: "#166534", dot: "#16a34a", label: "Pago" },
    pendente:  { bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04", label: "Pendente" },
    cancelado: { bg: "#fee2e2", color: "#991b1b", dot: "#dc2626", label: "Cancelado" },
  }[status];

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: config.bg, color: config.color,
      borderRadius: "20px", padding: "3px 12px",
      fontSize: "12px", fontWeight: 500,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: config.dot, flexShrink: 0 }} />
      {config.label}
    </span>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ background: "#e5e7eb", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
      <div style={{
        width: `${value}%`, height: "100%",
        background: color, borderRadius: "4px",
        transition: "width 0.4s ease",
      }} />
    </div>
  );
}

const PAGE_SIZE = 5;

export function TransactionsList({ transactions, filters }: TransactionsListProps) {
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.month) {
        const mv = MONTH_YEAR_MAP[filters.month];
        if (mv) {
          const d = new Date(t.date);
          if (d.getMonth() !== mv.month || d.getFullYear() !== mv.year) return false;
        }
      }
      if (filters.category && t.category !== filters.category) return false;
      if (filters.type     && t.type     !== filters.type    ) return false;
      if (filters.status   && t.status   !== filters.status  ) return false;
      return true;
    });
  }, [transactions, filters]);

  // Reset to page 1 when filters change
  useMemo(() => setPage(1), [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalEntradas = filtered.filter(t => t.type === "entrada").reduce((s, t) => s + t.amount, 0);
  const totalSaidas   = filtered.filter(t => t.type === "saida"  ).reduce((s, t) => s + t.amount, 0);
  const saldoLiquido  = totalEntradas - totalSaidas;

  // Category breakdown (saidas only)
  const categoryTotals = filtered
    .filter(t => t.type === "saida")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});

  const categoryEntries = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const categoryColors = ["#312c85", "#534AB7", "#9f99e0"];

  return (
    <div style={{width:"100%", display: "flex", gap: "20px", alignItems: "flex-start", marginTop: "24px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/*Table*/}
      <div style={{ flex: 2, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", minHeight:"412px"}}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 2fr 1.2fr 1.2fr 1fr",
          padding: "12px 24px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}>
          {["DATA", "DESCRIÇÃO", "CATEGORIA", "STATUS", "VALOR"].map((h, i) => (
            <span key={h} style={{
              fontSize: "11px", fontWeight: 600, color: "#9ca3af",
              letterSpacing: "0.06em",
              textAlign: i === 4 ? "right" : "left",
            }}>
              {h}
            </span>
          ))}
        </div>
        {/* Rows */}
        {paginated.length === 0 ? (
          <div style={{ padding: "40px 24px", textAlign: "center", color: "#9ca3af", fontSize: "14px" }}>
            Nenhuma transação encontrada para os filtros selecionados.
          </div>
        ) : (
          paginated.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 2fr 1.2fr 1.2fr 1fr",
                padding: "16px 24px",
                borderBottom: i < paginated.length - 1 ? "1px solid #f3f4f6" : "none",
                alignItems: "center",
                transition: "background 0.12s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: "13px", color: "#6b7280" }}>{formatDate(t.date)}</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>{t.description}</span>
              <span><CategoryBadge category={t.category} /></span>
              <span><StatusBadge status={t.status} /></span>
              <span style={{
                fontSize: "14px", fontWeight: 600, textAlign: "right",
                color: t.type === "entrada" ? "#16a34a" : "#dc2626",
              }}>
                {formatCurrency(t.amount, t.type)}
              </span>
            </div>
          ))
        )}
        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 24px", borderTop: "1px solid #e5e7eb", background: "#f9fafb",
        }}>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            Exibindo {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} de{" "}
            <strong style={{ color: "#111827" }}>{filtered.length}</strong> transações
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Anterior", "Próximo"].map((label, i) => {
              const disabled = i === 0 ? page <= 1 : page >= totalPages;
              return (
                <button
                  key={label}
                  disabled={disabled}
                  onClick={() => setPage(p => p + (i === 0 ? -1 : 1))}
                  style={{
                    padding: "7px 16px", fontSize: "13px", fontWeight: 500,
                    background: "#fff", color: disabled ? "#d1d5db" : "#374151",
                    border: `1px solid ${disabled ? "#e5e7eb" : "#d1d5db"}`,
                    borderRadius: "8px", cursor: disabled ? "not-allowed" : "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/*KPI*/}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minWidth: "220px" }}>

        {/* Saldo card */}
        <div style={{
          background: "#312c85",
          borderRadius: "12px",
          padding: "24px",
          color: "#fff",
        }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", opacity: 0.75, margin: "0 0 8px" }}>
            SALDO LÍQUIDO
          </p>
          <p style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            {saldoLiquido >= 0 ? "" : "-"}R${" "}
            {Math.abs(saldoLiquido).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p style={{ fontSize: "12px", margin: "0 0 20px", color: "#a5b4fc", display: "flex", alignItems: "center", gap: "4px" }}>
            <span>↗</span> +12.5% em relação ao mês anterior
          </p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Total Entradas", value: totalEntradas, color: "#86efac" },
              { label: "Total Saídas",   value: totalSaidas,   color: "#fca5a5", negative: true },
            ].map(({ label, value, color, negative }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", opacity: 0.8 }}>{label}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color }}>
                  {negative ? "-" : ""}R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px",
        }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827", margin: "0 0 16px" }}>
            Gasto por Categoria
          </p>
          {categoryEntries.length === 0 ? (
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>Sem dados de saídas.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {categoryEntries.map(([cat, total], i) => {
                const pct = totalSaidas > 0 ? Math.round((total / totalSaidas) * 100) : 0;
                return (
                  <div key={cat}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "13px", color: "#374151" }}>
                        {CATEGORY_LABELS[cat] ?? cat}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{pct}%</span>
                    </div>
                    <ProgressBar value={pct} color={categoryColors[i] ?? "#312c85"} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}