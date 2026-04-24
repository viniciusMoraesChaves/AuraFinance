import { useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/sidebar";
import TopBar from "../components/topBar";
import ObjectivesKPIs from "../components/ObjectivesKPIs";
import { ObjectivesEvolution } from "../components/ObjectivesEvolution";
import { ObjectivesDistribuitionByCategory } from "../components/ObjectivesDistribuitionByCategory";
import ObjectivesList from "../components/ObjectivesList";
import NewObjectiveModal from "../components/NewObjectiveModal";

function Objectives() {
  const location = useLocation();

  const routeNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/objectives": "Objetivos",
    "/transactions": "Transações",
    "/savings": "Investimentos",
  };

  const currentPage = routeNames[location.pathname] || "Dashboard";
  const [openModal, setOpenModal] = useState(false);

  const pageTitle =
    currentPage === "Dashboard"
      ? "Dashboard Geral"
      : currentPage === "Objetivos"
      ? "Meus Objetivos Financeiros"
      : currentPage === "Transações"
      ? "Entradas e Saídas"
      : currentPage === "Investimentos"
      ? "Investimentos"
      : currentPage;

  return (
    <div>
      <Sidebar />

      <div style={{marginLeft: "260px", display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        <TopBar />

        <div style={{flex: 1, background: "#f9fafb", padding: "24px 32px"}}>
          <div>
            <div style={{fontSize: "16px", color: "#6b7280", marginBottom: "8px"}}>
              Início{" "}
              {currentPage && (
                <>
                  &gt;{" "}
                  <span style={{fontWeight: "500", color: "#262626"}}>
                    {currentPage}
                  </span>
                </>
              )}
            </div>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <h2 style={{margin: 0, color: "#111827", fontSize: "28px"}}>
                {pageTitle}
              </h2>

              <button onClick={() => setOpenModal(true)} style={{padding: "8px 16px", fontSize:"16px", background: "#312c85", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"}}>
                + Novo Objetivo
              </button>
            </div>

            <p style={{marginTop: "6px", fontSize: "14px", color: "#6b7280"}}>
              Acompanhe e gerencie suas metas de curto, médio e longo prazo
            </p>
          </div>

          <ObjectivesKPIs />

          <div style={{display: "flex", gap: "16px", marginTop: "24px"}}>
            <div style={{flex: 2}}>
              <ObjectivesEvolution />
            </div>
            <div style={{flex: 1}}>
              <ObjectivesDistribuitionByCategory />
            </div>
          </div>

          <div style={{marginTop: "24px"}}>
            <ObjectivesList />
          </div>
        </div>
      </div>
      {openModal && <NewObjectiveModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}

export default Objectives;