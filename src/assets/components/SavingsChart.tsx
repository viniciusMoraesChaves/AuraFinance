import { useState } from "react";

type Period = "6M" | "1A" | "TUDO";

interface MonthData {
  month: string;
  value: number;
}

interface DiversificationItem {
  label: string;
  percent: number;
  color: string;
}

const DATA: Record<Period, MonthData[]> = {
  "6M": [
    { month: "Jan", value: 90000  },
    { month: "Fev", value: 95000  },
    { month: "Mar", value: 102000 },
    { month: "Abr", value: 110000 },
    { month: "Mai", value: 118000 },
    { month: "Jun", value: 128000 },
  ],
  "1A": [
    { month: "Jul", value: 60000  },
    { month: "Ago", value: 65000  },
    { month: "Set", value: 70000  },
    { month: "Out", value: 75000  },
    { month: "Nov", value: 82000  },
    { month: "Dez", value: 88000  },
    { month: "Jan", value: 90000  },
    { month: "Fev", value: 95000  },
    { month: "Mar", value: 102000 },
    { month: "Abr", value: 110000 },
    { month: "Mai", value: 118000 },
    { month: "Jun", value: 128000 },
  ],
  "TUDO": [
    { month: "Jan", value: 90000  },
    { month: "Fev", value: 95000  },
    { month: "Mar", value: 102000 },
    { month: "Abr", value: 110000 },
    { month: "Mai", value: 118000 },
    { month: "Jun", value: 128000 },
  ],
};

const DIVERSIFICATION: DiversificationItem[] = [
  { label: "Ações",      percent: 55, color: "#1e2a78" },
  { label: "Renda Fixa", percent: 25, color: "#7c3aed" },
  { label: "Cripto",     percent: 12, color: "#a78bfa" },
  { label: "Imóveis",    percent: 8,  color: "#ddd6fe" },
];

function DonutChart({ items }: { items: DiversificationItem[] }) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const R = 62;
  const r = 42;
  const gap = 3;

  let cumulative = 0;

  function polarToXY(angleDeg: number, radius: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function describeArc(startDeg: number, endDeg: number) {
    const s1 = polarToXY(startDeg, R);
    const e1 = polarToXY(endDeg, R);
    const s2 = polarToXY(endDeg, r);
    const e2 = polarToXY(startDeg, r);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${R} ${R} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${r} ${r} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
  }

  const segments = items.map((item) => {
    const startDeg = cumulative * 3.6 + gap / 2;
    const endDeg = (cumulative + item.percent) * 3.6 - gap / 2;
    cumulative += item.percent;
    return { ...item, path: describeArc(startDeg, endDeg) };
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg) => (
          <path key={seg.label} d={seg.path} fill={seg.color} />
        ))}
        <text
          x={cx}
          y={cy - 9}
          textAnchor="middle"
          style={{ fontSize: "20px", fontWeight: 700, fill: "#111827", fontFamily: "inherit" }}
        >
          100%
        </text>
        <text
          x={cx}
          y={cy + 13}
          textAnchor="middle"
          style={{ fontSize: "10px", fontWeight: 600, fill: "#9ca3af", letterSpacing: "0.1em", fontFamily: "inherit" }}
        >
          TOTAL
        </text>
      </svg>
    </div>
  );
}

function BarChart({
  data,
  activeIndex,
  onHover,
}: {
  data: MonthData[];
  activeIndex: number;
  onHover: (i: number) => void;
}) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const yTicks = [0, 35000, 70000, 105000, 140000];
  const chartH = 240;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", gap: "0" }}>
        <div  style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "space-between", height: `${chartH}px`, marginRight: "10px",flexShrink: 0}}>
          {yTicks.map((v) => (
            <span
              key={v}
              style={{ fontSize: "11px", color: "#9ca3af", textAlign: "right", lineHeight: 1, minWidth: "52px"}}>
              {v === 0 ? "0" : `${v / 1000}000`}
            </span>
          ))}
        </div>

        <div style={{ flex: 1, position: "relative" }}>
          <div
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column-reverse", justifyContent: "space-between", pointerEvents: "none",}}>
            {yTicks.map((v) => (
              <div key={v} style={{ borderTop: "1px solid #f0f0f4", width: "100%" }} />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end",  gap: "8px", height: `${chartH}px`, position: "relative", zIndex: 1, padding: "0 4px",}}>
            {data.map((d, i) => {
              const heightPct = (d.value / maxVal) * 100;
              const isActive = i === activeIndex;
              return (
                <div
                  key={d.month + i}
                  style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", cursor: "pointer",}}
                  onMouseEnter={() => onHover(i)}
                >
                  {isActive && (
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#312c85", marginBottom: "4px", background: "#eeedfe", borderRadius: "6px", padding: "2px 6px", whiteSpace: "nowrap",}}>
                      R$ {d.value.toLocaleString("pt-BR")}
                    </div>
                  )}
                  <div style={{ width: "100%", height: `${heightPct}%`, background: isActive ? "#1e2a78" : "#c7d2fe", borderRadius: "6px 6px 0 0", transition: "background 0.2s"}}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginLeft: "62px", marginTop: "8px", padding: "0 4px" }}>
        {data.map((d, i) => (
          <div
            key={d.month + i}
            style={{flex: 1, textAlign: "center", fontSize: "12px", color: i === activeIndex ? "#312c85" : "#9ca3af",fontWeight: i === activeIndex ? 600 : 400, transition: "color 0.2s" }}>
            {d.month}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SavingsChart() {
  const [period, setPeriod] = useState<Period>("TUDO");
  const [hoveredBar, setHoveredBar] = useState<number>(DATA[period].length - 1);

  const handlePeriod = (p: Period) => {
    setPeriod(p);
    setHoveredBar(DATA[p].length - 1);
  };

  return (
    <div style={{ display: "flex", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif",}}>

      <div style={{ flex: 3, padding: "28px 32px", borderRight: "1px solid #f0f0f4", minWidth: 0 }}>
        <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",marginBottom: "24px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#111827" }}>
            Histórico de Investimentos
          </h3>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["6M", "1A", "TUDO"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriod(p)}
                style={{ padding: "5px 14px", fontSize: "13px", fontWeight: 500, border: "1px solid", borderColor: period === p ? "#312c85" : "#e5e7eb", borderRadius: "8px", cursor: "pointer", background: period === p ? "#312c85" : "#fff", color: period === p ? "#fff" : "#6b7280", transition: "all 0.15s"}}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <BarChart
          data={DATA[period]}
          activeIndex={hoveredBar}
          onHover={setHoveredBar}
        />
      </div>

      <div style={{ width: "280px", flexShrink: 0, padding: "28px 32px" }}>
        <h3 style={{ margin: "0 0 24px", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
          Diversificação Atual
        </h3>

        <DonutChart items={DIVERSIFICATION} />

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "24px" }}>
          {DIVERSIFICATION.map((item) => (
            <div
              key={item.label}
              style={{display: "flex", alignItems: "center", justifyContent: "space-between",}}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{width: "10px", height: "10px", borderRadius: "50%", background: item.color, flexShrink: 0,}}/>
                <span style={{ fontSize: "14px", color: "#374151" }}>{item.label}</span>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}