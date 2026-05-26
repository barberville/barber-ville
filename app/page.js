"use client"

export default function Home() {

  return (

    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('/logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
        position: "relative"
      }}
    >

      {/* LOGIN */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10
        }}
      >

        <details>

          <summary
            style={{
              listStyle: "none",
              cursor: "pointer",
              color: "#d4af37",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            Login
          </summary>

          <div
            style={{
              marginTop: "10px",
              background: "#000",
              border: "1px solid #d4af37",
              borderRadius: "15px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              minWidth: "180px"
            }}
          >

            <a
              href="/login/admin"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "10px",
                borderRadius: "10px",
                background: "#1a1a1a"
              }}
            >
              Login Admin
            </a>

            <a
              href="/login/daniel"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "10px",
                borderRadius: "10px",
                background: "#1a1a1a"
              }}
            >
              Login Daniel
            </a>

          </div>

        </details>

      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "30px"
        }}
      >

        <h1
          style={{
            color: "#d4af37",
            fontSize: "90px",
            lineHeight: "90px",
            textAlign: "center",
            margin: "20px 0",
            fontWeight: "900",
            textShadow: "0 0 20px rgba(0,0,0,0.6)"
          }}
        >
          Barber
          <br />
          Ville
        </h1>

        <p
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "22px",
            lineHeight: "35px",
            marginTop: "20px"
          }}
        >
          Cortes modernos, barba e estilo premium.
        </p>

        <a
          href="/agendamento"
          style={{
            display: "block",
            marginTop: "50px",
            background: "#d4af37",
            padding: "30px",
            borderRadius: "30px",
            textAlign: "center",
            textDecoration: "none",
            color: "#000",
            fontSize: "28px",
            fontWeight: "bold",
            boxShadow: "0 0 30px rgba(212,175,55,0.5)"
          }}
        >
          Agende Aqui
        </a>

      </div>

    </main>
  )
}