import Sidebar from "../components/sidebar";
import TopBar from "../components/topBar";
import DashboardKPIs from "../components/DashboardKPIs";
import { DashboardFlux } from "../components/DashBoardFlux";
import { DashBoardExpensesByCategory } from "../components/DasBoardExpensesByCategory";
import DashBoardRecentTransactions from "../components/DashBoardRecentTransactions";

function DashBoard() {
  return (
    <div style={{ display: "flex", marginLeft: "260px"}}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <div style={{flex: 1, background: "#f9fafb", padding: "24px 32px",}}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{margin: 0, color: "#111827", fontSize: "28px",}}>
              Dashboard Geral
            </h2>

            <p style={{marginTop: "6px", fontSize: "14px", color: "#6b7280",}}>
              Bem-vindo! Aqui está o que está acontecendo com suas contas hoje.
            </p>
          </div>
           
          <DashboardKPIs />

          <div style={{display: "flex", gap: "16px", marginTop: "24px",}}>
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