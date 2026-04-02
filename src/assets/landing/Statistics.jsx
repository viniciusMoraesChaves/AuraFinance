function Statistics() {
  const stats = [
    {
      value: "50k+",
      label: "Usuários Ativos"
    },
    {
      value: "R$ 2.5B",
      label: "Em Investimentos"
    },
    {
      value: "95%",
      label: "Satisfação"
    }
  ];

  return (
    <section className="stats-section" style={{display: "flex", justifyContent: "space-around", alignItems: "center", padding: "80px 40px", background: "#f5f6fa"}}>
      {stats.map((stat, index) => (
        <div key={index} style={{textAlign: "center"}}>
          <h2 style={{fontSize: "48px", fontWeight: "700", color: "#3d3a8f", margin: "0"}}>{stat.value}</h2>
          <p style={{marginTop: "8px", fontSize: "16px", color: "#555"}}>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

export default Statistics;