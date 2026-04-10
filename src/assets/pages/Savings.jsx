import Sidebar from "../components/sidebar";
import TopBar from "../components/topBar";

function Savings() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <div style={{ flex: 1, background: "#a98c0c" }}>
        </div>
      </div>
    </div>
  );
}

export default Savings;