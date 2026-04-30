import { useState, useCallback } from "react";

export interface TransactionFilters {
  month: string;
  category: string;
  type: string;
  status: string;
}

interface Props {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
}

const OPTIONS = {
  month: [
    { value: "", label: "Todos os meses" },
    { value: "jan-2024", label: "Janeiro, 2024" },
    { value: "fev-2024", label: "Fevereiro, 2024" },
    { value: "mar-2024", label: "Março, 2024" },
    { value: "abr-2024", label: "Abril, 2024" },
    { value: "mai-2024", label: "Maio, 2024" },
    { value: "jun-2024", label: "Junho, 2024" },
    { value: "jul-2024", label: "Julho, 2024" },
    { value: "ago-2024", label: "Agosto, 2024" },
    { value: "set-2024", label: "Setembro, 2024" },
    { value: "out-2024", label: "Outubro, 2024" },
    { value: "nov-2024", label: "Novembro, 2024" },
    { value: "dez-2024", label: "Dezembro, 2024" },
    { value: "jan-2023", label: "Janeiro, 2023" },
    { value: "fev-2023", label: "Fevereiro, 2023" },
    { value: "mar-2023", label: "Março, 2023" },
  ],
  category: [
    { value: "", label: "Todas" },
    { value: "receita", label: "Receita" },
    { value: "alimentacao", label: "Alimentação" },
    { value: "moradia", label: "Moradia" },
    { value: "contas", label: "Contas" },
    { value: "lazer", label: "Lazer" },
  ],
  type: [
    { value: "", label: "Todos" },
    { value: "entrada", label: "Entrada" },
    { value: "saida", label: "Saída" },
  ],
  status: [
    { value: "", label: "Todos" },
    { value: "pago", label: "Pago" },
    { value: "pendente", label: "Pendente" },
  ],
};

const CONFIG = [
  { key: "month", label: "Período" },
  { key: "category", label: "Categoria" },
  { key: "type", label: "Tipo" },
  { key: "status", label: "Status" },
] as const;

const DEFAULT: TransactionFilters = {
  month: "",
  category: "",
  type: "",
  status: "",
};

export default function TransactionFilter({ filters, onChange }: Props) {
  const [hoverClear, setHoverClear] = useState(false);

  const handleChange = useCallback(
    (key: keyof TransactionFilters, value: string) => {
      onChange({ ...filters, [key]: value });
    },
    [filters, onChange]
  );

  const handleClear = () => onChange(DEFAULT);

  const active = CONFIG.filter((f) => filters[f.key] !== "");

  return (
    <div style={{background:"#fff",borderRadius:"16px",padding:"20px",border:"1px solid #e5e7eb",boxShadow:"0 2px 6px rgba(0,0,0,0.05)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:"12px",alignItems:"flex-end"}}>
        {CONFIG.map(({ key, label }) => (
          <div key={key} style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            <span style={{fontSize:"12px",color:"#6b7280",textTransform:"uppercase"}}>
              {label}
            </span>
            <select
              value={filters[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              style={{width:"100%",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"10px",fontSize:"14px",outline:"none"}}
>
              {OPTIONS[key].map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <button
            onClick={handleClear}
            onMouseEnter={() => setHoverClear(true)}
            onMouseLeave={() => setHoverClear(false)}
            style={{padding:"10px",background:"transparent",border:"none",color:"#312c85",cursor:"pointer",opacity:hoverClear?0.6:1}}
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {active.length > 0 && (
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"16px"}}>
          {active.map(({ key, label }) => (
            <div key={key} style={{display:"flex",alignItems:"center",gap:"6px",background:"#EEF2FF",borderRadius:"20px",padding:"6px 10px",fontSize:"12px"}}>
              
              <span>
                {label}: {
                  OPTIONS[key].find(o => o.value === filters[key])?.label
                }
              </span>

              <button
                onClick={() => handleChange(key, "")}
                style={{background:"none",border:"none",cursor:"pointer"}}
              >
                ✕
              </button>

            </div>
          ))}
        </div>
      )}
      {active.length > 0 && (
        <p style={{marginTop:"10px",fontSize:"13px",color:"#6b7280"}}>
            <span style={{fontWeight:"500",color:"#111827"}}>
            {active.length}
            </span>{" "}
            filtro{active.length > 1 ? "s" : ""} ativo{active.length > 1 ? "s" : ""}
        </p>
        )}

    </div>
  );
}