import Sidebar from "../components/sidebar";
import TopBar from "../components/topBar";

function Objectives() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <div style={{ flex: 1, background: "#15b34f" }}>
        </div>
      </div>
    </div>
  );
}

export default Objectives;