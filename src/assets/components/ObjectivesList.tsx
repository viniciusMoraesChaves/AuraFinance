import { Pencil, Trash2, Target } from "lucide-react";
import { useState } from "react";

type Objective = {
  title: string;
  currentValue: number;
  goalValue: number;
  monthlyContribution: number;
  deadline: string;
  tag: string;
};

const getProgressColor = (p: number) => {
  // garante que fique entre 0 e 100
  const percentage = Math.max(0, Math.min(100, p));
  // 0 = vermelho | 120 = verde
  const hue = (percentage / 100) * 120;
  return `hsl(${hue}, 70%, 45%)`;
};

function ObjectiveCard({ data }: { data: Objective }) {
  const progress = (data.currentValue / data.goalValue) * 100;
  const progressColor = getProgressColor(progress);
  const remaining = data.goalValue - data.currentValue;
  const [hover, setHover] = useState(false);

  return (
    <div onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fcfcfc",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        boxShadow: hover
          ? "0 6px 8px rgba(0, 0, 0, 0.21)"
          : "0 1px 3px rgba(0, 0, 0, 0.13)",
        transition: "all 0.2s ease",
      }}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px",}}>
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{width: "44px", height: "44px", background: "#e0e7ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",}}>
            <Target color="#4338ca" />
          </div>

          <div>
            <h3 style={{ margin: 0 }}>{data.title}</h3>

            <div style={{display: "flex",alignItems: "center",gap: "10px",marginTop: "4px",}}>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                📅 Meta: {data.deadline}
              </span>

              <span style={{fontSize: "12px", padding: "4px 10px", borderRadius: "999px",background: "#f3f4f6",}}>
                {data.tag}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Pencil size={18} style={{ cursor: "pointer" }} />
          <Trash2 size={18} color="#dc2626" style={{ cursor: "pointer" }} />
        </div>
      </div>

      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap",  gap: "20px",}}>
        <div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Valor Atual
          </div>
          <div style={{ fontWeight: 600 }}>
            R$ {data.currentValue.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Meta Total
          </div>
          <div style={{ fontWeight: 600 }}>
            R$ {data.goalValue.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Faltam
          </div>
          <div style={{ fontWeight: 600, color: "#dc2626" }}>
            R$ {remaining.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            Contribuição Mensal
          </div>
          <div style={{ fontWeight: 600, color: "#16a34a" }}>
            R$ {data.monthlyContribution.toLocaleString()}
          </div>
        </div>
      </div>

      <div>
        <div style={{fontSize: "13px", marginBottom: "6px", color: "#374151",}}>
          Progresso
        </div>

        <div style={{ height: "10px", width: "100%", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden",}}>
          <div style={{ width: `${progress}%`, height: "100%", background: progressColor, borderRadius: "999px", transition: "all 0.4s ease",}}/>
        </div>

        <div style={{ marginTop: "6px",textAlign: "right",fontSize: "12px",color: "#374151",}}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

export default function ObjectivesList() {
  const objectives = [
    {
      title: "Casa Própria",
      currentValue: 1000,
      goalValue: 50000,
      monthlyContribution: 5000,
      deadline: "Dez 2028",
      tag: "Imóveis",
    },
    {
      title: "Aposentadoria",
      currentValue: 180000,
      goalValue: 1000000,
      monthlyContribution: 2000,
      deadline: "Jun 2050",
      tag: "Longo Prazo",
    },
    {
      title: "Viagem Europa",
      currentValue: 14722.50,
      goalValue: 15000,
      monthlyContribution: 500,
      deadline: "Set 2024",
      tag: "Longo Prazo",
    },
    {
      title: "Curso de Desenvolvimento",
      currentValue: 2000,
      goalValue: 5000,
      monthlyContribution: 300,
      deadline: "Dez 2024",
      tag: "Educação",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "#fff", padding: "20px", borderRadius: "16px", border: "1px solid #e5e7eb",boxShadow: "0 1px 3px rgba(0,0,0,0.05)",}}>
      <h1 style={{ margin: 0, fontSize: "20px", color: "#111827" }}>
        Todos os Objetivos
      </h1>
      {objectives.map((obj, index) => (
        <ObjectiveCard key={index} data={obj} />
      ))}
    </div>
  );
}