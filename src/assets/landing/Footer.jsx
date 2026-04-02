function Footer() {
  return (
    <section
      className="cta-section"
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #4338ca, #6b21a8)",
        color: "white"
      }}
    >
      <div
        style={{
          padding: "100px 20px 0px",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            marginBottom: "20px",
            fontWeight: "700"
          }}
        >
          Pronto para Transformar sua Vida Financeira?
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#cbd5f5",
            maxWidth: "700px",
            margin: "0 auto"
          }}
        >
          Junte-se a milhares de pessoas que já estão construindo um futuro
          próspero com a AuraFinance.
        </p>
      </div>

      <div
        style={{
          marginTop: "80px",
          background: "#1e1b4b",
          padding: "30px 0",
          textAlign: "center",
          fontSize: "14px",
          color: "#a5b4fc"
        }}
      >
        © 2026 AuraFinance. Todos os direitos reservados.
      </div>
    </section>
  );
}

export default Footer;