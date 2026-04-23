import { useNavigate, useLocation } from "react-router-dom";
import logo from "../img/aurafinance_logo.png";
import {
  FileText,
  Target,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/dashboard", icon: FileText },
    { label: "Objetivos", path: "/objectives", icon: Target },
    { label: "Transações", path: "/transactions", icon: ArrowLeftRight },
    { label: "Investimentos", path: "/savings", icon: TrendingUp },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        borderRight: "1px solid #e5e7eb",

        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div>
        <div
          style={{
            height: "90px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "30px",
            borderBottom: "1px solid #dadadb",
          }}
        >
          <div
            style={{
              background: "#4338ca",
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <img src={logo} alt="AF" style={{ maxWidth: "60px" }} />
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: "20px", color: "#1f2937" }}>
              AuraFinance
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
              Conta Premium
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {menu.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? "#312c85" : "transparent",
                  color: isActive ? "white" : "#374151",
                  transition: "all 0.2s ease",
                  fontSize: "15px",
                  textAlign: "left",
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER (opcional) */}
      <div style={{ fontSize: "12px", color: "#9ca3af" }}>
        © 2026 AuraFinance
      </div>
    </div>
  );
}

export default Sidebar;