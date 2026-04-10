import Sidebar from "../components/sidebar";
import TopBar from "../components/topBar";

function Transactions() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <div style={{ flex: 1, background: "#ca2525" }}>
        </div>
      </div>
    </div>
  );
}

export default Transactions;