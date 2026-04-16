function FormLogin() {
  return (
    <div
      style={{
        background: "#ffffff",
        width: "720px",
        padding: "40px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", color: "#111827" }}>
            Bem-vindo de volta!
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
            E-mail
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
        </div>

        {/* Senha */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
            Senha
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
        </div>

        {/* Lembrar-me + Esqueceu senha */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "#b0b0b0" }}>
            <input type="checkbox" />
            Lembrar usuário
          </label>

          <a href="#" style={{ color: "#4f46e5", textDecoration: "none" }}>
            Esqueceu a senha?
          </a>
        </div>

        {/* Botão */}
        <button
          style={{
            marginTop: "10px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#4338ca",
            color: "#ffffff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>

        {/* Cadastro */}
        <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
          Não tem uma conta?{" "}
          <a href="#" style={{ color: "#4338ca", fontWeight: "500" }}>
            Cadastre-se gratuitamente
          </a>
        </p>
      </form>
    </div>
  );
}

export default FormLogin;