import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function NewObjectiveModal({ onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    category: "Imóveis",
    goal: "",
    deadline: "",
    monthly: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    onClose();
  };

  return (
    <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,}}>
      <div style={{background: "#fff", borderRadius: "16px", padding: "24px", width: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)",}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px"}}>
          <h3 style={{margin: 0}}>Novo Objetivo</h3>
          <X size={20} style={{cursor: "pointer"}} onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "12px"}}>

          <div>
            <label style={{color: "#7e7e7e"}}>Nome do objetivo</label>
            <input name="name" onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={{color: "#7e7e7e"}}>Categoria</label>
            <select name="category" onChange={handleChange} style={inputStyle}>
              <option>Imóveis</option>
              <option>Viagem</option>
              <option>Investimento</option>
              <option>Educação</option>
            </select>
          </div>

          <div>
            <label style={{color: "#7e7e7e"}}>Meta total</label>
            <input name="goal" type="number" onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={{color: "#7e7e7e"}}  >Prazo</label>
            <input name="deadline" type="date" placeholder="Ex: Dez 2028" onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={{color: "#7e7e7e"}}>Contribuição mensal</label>
            <input name="monthly" type="number" onChange={handleChange} style={inputStyle} />
          </div>

          <button type="submit"style={{marginTop: "10px", padding: "10px", background: "#312c85", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer",}}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
};