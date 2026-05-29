"use client"

export default function Home() {

  return (

    <main
      style={{
        minHeight: "100vh",

        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.70)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

        display: "flex",

        justifyContent: "center",

        alignItems: "flex-start",

        padding: "20px",

        paddingTop: "45px",

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

              border:
                "1px solid #d4af37",

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

          maxWidth: "430px",

          padding: "10px"
        }}
      >

        {/* LOGO */}

        <h1
          style={{
            color: "#d4af37",

            fontSize: "82px",

            lineHeight: "82px",

            textAlign: "center",

            margin: "10px 0",

            fontWeight: "900",

            textShadow:
              "0 0 20px rgba(0,0,0,0.6)"
          }}
        >
          Barber
          <br />
          Ville
        </h1>

        {/* FRASE */}

        <p
          style={{
            color: "#fff",

            textAlign: "center",

            fontSize: "21px",

            lineHeight: "34px",

            marginTop: "18px",

            marginBottom: "35px"
          }}
        >
          Cortes modernos,
          barba e estilo premium.
        </p>

        {/* BOTÃO AGENDAR */}

        <a
          href="/agendamento"

          style={{
            display: "block",

            background:
              "linear-gradient(90deg,#d4af37,#ffdf70)",

            padding: "26px",

            borderRadius: "28px",

            textAlign: "center",

            textDecoration: "none",

            color: "#000",

            fontSize: "28px",

            fontWeight: "bold",

            boxShadow:
              "0 0 30px rgba(212,175,55,0.35)"
          }}
        >
          Agende Aqui
        </a>

        {/* VIP */}

        <div
          style={{
            marginTop: "24px",

            background:
              "linear-gradient(180deg, rgba(212,175,55,0.10), rgba(0,0,0,0.92))",

            border:
              "1px solid rgba(212,175,55,0.15)",

            borderRadius: "28px",

            padding: "24px",

            textAlign: "center",

            boxShadow:
              "0 0 30px rgba(212,175,55,0.08)"
          }}
        >

          <h2
            style={{
              color: "#d4af37",

              fontSize: "30px",

              marginBottom: "12px"
            }}
          >
            👑 Clube VIP
          </h2>

          <p
            style={{
              color: "#ccc",

              lineHeight: "30px",

              fontSize: "16px",

              marginBottom: "24px"
            }}
          >
            Cortes mensais,
            benefícios exclusivos
            e acesso premium
            Barber Ville.
          </p>

          <div
            style={{
              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              justifyContent: "center"
            }}
          >

            <a
              href="/login-vip"

              style={{
                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                width: "100%",

                maxWidth: "320px",

                background:
                  "linear-gradient(90deg,#d4af37,#ffdf70)",

                color: "#000",

                padding: "18px 22px",

                borderRadius: "20px",

                textDecoration: "none",

                fontWeight: "bold",

                fontSize: "18px",

                boxShadow:
                  "0 0 20px rgba(212,175,55,0.25)"
              }}
            >
               LOGIN VIP
            </a>

            <p
              style={{
                color: "#d4af37",

                fontSize: "15px",

                marginTop: "18px",

                textAlign: "center",

                lineHeight: "26px"
              }}
            >
              👑 Venha ser VIP com a gente
            </p>

          </div>

        </div>

      </div>

    </main>

  )

}