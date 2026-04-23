import { useLocation } from "react-router-dom";

import Sidebar from "../components/sidebar";
import TopBar from "../components/topBar";
import DashboardKPIs from "../components/DashboardKPIs";
import { DashboardFlux } from "../components/DashBoardFlux";
import { DashBoardExpensesByCategory } from "../components/DasBoardExpensesByCategory";
import DashBoardRecentTransactions from "../components/DashBoardRecentTransactions";

function DashBoard() {
  const location = useLocation();

  //Mapeamento de rotas
  const routeNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/objectives": "Objetivos",
    "/transactions": "Transações",
    "/savings": "Investimentos",
  };

  const currentPage = routeNames[location.pathname] || "Dashboard";

  //Título dinâmico
  const pageTitle =
    currentPage === "Dashboard"
      ? "Dashboard Geral"
      : currentPage === "Objetivos"
      ? "Meus Objetivos Financeiros"
      : currentPage;

  return (
    <div>
      <Sidebar />

      <div style={{marginLeft: "260px", display: "flex", flexDirection: "column", minHeight: "100vh",}}>
        <TopBar />

        <div style={{flex: 1, background: "#f9fafb", padding: "24px 32px",}}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{fontSize: "16px",color: "#6b7280",marginBottom: "6px",}}>
              Início{" "}
              {currentPage && (
                <>
                  &gt;{" "}
                  <span style={{ fontWeight: "500", color: "#262626" }}>
                    {currentPage}
                  </span>
                </>
              )}
            </div>
            <h2 style={{margin: 0,color: "#111827",fontSize: "28px",}}>
              {pageTitle}
            </h2>
            <p style={{marginTop: "6px",fontSize: "14px",color: "#6b7280",}}>
              Bem-vindo! Aqui está o que está acontecendo com suas contas hoje.
            </p>
          </div>
          <DashboardKPIs />
          <div style={{ display: "flex",gap: "16px",marginTop: "24px",}}>
            <div style={{ flex: 2 }}>
              <DashboardFlux />
            </div>

            <div style={{ flex: 1 }}>
              <DashBoardExpensesByCategory />
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <DashBoardRecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;