import { Bell, Search } from "lucide-react";
import { useState } from "react";

function TopBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f3f4f6",
          border: isFocused ? "3px solid #4338ca" : "none",
          padding: "10px 15px",
          borderRadius: "12px",
          width: "400px",
          gap: "10px",
        }}
      >
        <Search size={22} color="#6b7280" />
        <input
          type="text"
          placeholder="Buscar transações, relatórios..."
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            width: "100%",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "2px 4px",
            transition: "border 0.2s ease",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ position: "relative", cursor: "pointer" }}>
          <Bell size={20} color="#374151" />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "8px",
              height: "8px",
              background: "red",
              borderRadius: "50%",
            }}
          ></span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: "500" }}>Alex Rivera</p>
            <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
              ID: 4429-120
            </p>
          </div>

          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            A
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;