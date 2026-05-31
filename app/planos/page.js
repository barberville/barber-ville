"use client"

export default function Planos() {

  function abrirCadastro(plano) {

    localStorage.setItem(
      "planoVip",
      plano
    )

    const barbeiro =
      localStorage.getItem(
        "barbeiroSelecionado"
      )

    localStorage.setItem(
      "barbeiroVip",
      barbeiro
    )

    // VERIFICA SE JÁ EXISTE LOGIN VIP

    const clienteLogado =
      localStorage.getItem(
        "clienteVipLogado"
      )

    // SE JÁ EXISTIR LOGIN,
    // REMOVE PARA CRIAR OUTRA CONTA

    if (clienteLogado) {

      localStorage.removeItem(
        "clienteVipLogado"
      )

    }

    // ABRE CADASTRO VIP

    window.location.href =
      "/cadastro-vip"
  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92)), url('/logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "25px 15px 60px 15px",
        color: "#fff",
        fontFamily: "Arial"
      }}
    >

      {/* VOLTAR */}

      <div
        onClick={() =>
          window.history.back()
        }

        style={{
          fontSize: "18px",
          cursor: "pointer",
          marginBottom: "15px",
          color: "#d4af37",
          width: "fit-content"
        }}
      >
        ←
      </div>

      {/* TÍTULO */}

      <h1
        style={{
          textAlign: "center",
          color: "#d4af37",
          fontSize: "32px",
          marginBottom: "10px",
          fontWeight: "bold"
        }}
      >
        Barber Ville VIP
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#ccc",
          fontSize: "14px",
          lineHeight: "22px",
          maxWidth: "600px",
          margin: "0 auto 20px auto"
        }}
      >
        Fique alinhado o mês inteiro 💈
        <br />
        Atendimento semanal com prioridade e economia em todos os cortes.
      </p>

      {/* PLANOS */}

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    maxWidth: "100%",
    margin: "0 auto"
  }}
>

        {/* PLANO PRATA */}

        <div
          style={{
            background:
              "rgba(0,0,0,0.78)",

            border:
              "1px solid rgba(212,175,55,0.25)",

            borderRadius: "18px",

            padding: "10px",

            backdropFilter:
              "blur(10px)",

            boxShadow:
              "0 0 25px rgba(212,175,55,0.08)"
          }}
        >

          <div
            style={{
              background:
                "#d4af37",

              color: "#000",

              width: "fit-content",

              padding:
                "4px 8px",

              borderRadius: "999px",

              fontWeight: "bold",

              fontSize: "9px",

              marginBottom: "10px"
            }}
          >
            MAIS ESCOLHIDO 🔥
          </div>

          <h2
            style={{
              color: "#d4af37",
              fontSize: "18px",
              textAlign: "center",
              marginBottom: "10px"
            }}
          >
            Plano Prata
          </h2>

          <h3
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            R$ 99,90
          </h3>

          <p
            style={{
              textAlign: "center",
              color: "#aaa",
              marginBottom: "10px"
            }}
          >
            mensal
          </p>

          <div
            style={{
              background:
                "rgba(212,175,55,0.08)",

              border:
                "1px solid rgba(212,175,55,0.15)",

              borderRadius: "12px",

              padding: "8px",

              marginBottom: "12px",

              textAlign: "center",

              lineHeight: "18px",

              color: "#f1f1f1",

              fontSize: "11px"
            }}
          >
            ✂️ Cortes que normalmente sairiam por R$ 30
            <br />
            com o VIP saem por apenas
            <br />

            <span
              style={{
                color: "#d4af37",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            >
              R$ 24,99
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gap: "5px",
              marginBottom: "12px",
              color: "#ddd",
              lineHeight: "16px",
              fontSize:"11px"
            }}
          >

            <div>
              ✅ Fique alinhado toda semana
            </div>

            <div>
              ✅ Atendimento VIP prioritário
            </div>

            <div>
              ✅ 4 atendimentos por mês
            </div>

            <div>
              ✅ Seu horário reservado primeiro
            </div>

            <div>
              ✅ Economia todo mês
            </div>

          </div>

          <button
            onClick={() =>
              abrirCadastro(
                "Plano Prata"
              )
            }

            style={{
              width: "100%",

              background: "#d4af37",

              color: "#000",

              padding: "10px",

              borderRadius: "12px",

              border: "none",

              fontWeight: "bold",

              fontSize: "12px",

              cursor: "pointer",

              boxShadow:
                "0 0 25px rgba(212,175,55,0.30)"
            }}
          >
            Assinar Plano
          </button>

        </div>

        {/* PLANO OURO */}

        <div
          style={{
            background:
              "rgba(0,0,0,0.78)",

            border:
              "1px solid #d4af37",

            borderRadius: "18px",

            padding: "10px",

            boxShadow:
              "0 0 25px rgba(212,175,55,0.08)"
          }}
        >

          <div
            style={{
              background:
                "#d4af37",

              color: "#000",

              width: "fit-content",

              padding:
                "4px 8px",

              borderRadius: "999px",

              fontWeight: "bold",

              fontSize: "9px",

              marginBottom: "10px"
            }}
          >
            PREMIUM 👑
          </div>

          <h2
  style={{
    color: "#d4af37",
    fontSize: "18px",
    textAlign: "center",
    marginBottom: "10px",
  }}
>
  Plano Ouro
</h2>

          <h3
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "5px",
              fontWeight: "bold"
            }}
          >
            R$ 149,90
          </h3>

          <p
            style={{
              textAlign: "center",
              color: "#aaa",
              marginBottom: "10px"
            }}
          >
            mensal
          </p>

          <div
            style={{
              background:
                "rgba(212,175,55,0.08)",

              border:
                "1px solid rgba(212,175,55,0.15)",

              borderRadius: "12px",

              padding: "8px",

              marginBottom: "12px",

              textAlign: "center",

              lineHeight: "18px",

              color: "#f1f1f1",

              fontSize: "11px"
            }}
          >
            💎 Corte + barba + sobrancelha
            <br />
            que normalmente sairia por R$ 60
            <br />
            com o VIP sai por apenas

            <br />

            <span
              style={{
                color: "#d4af37",
                fontSize: "20px",
                fontWeight: "bold"
              }}
            >
              R$ 37,50
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gap: "5px",
              marginBottom: "12px",
              color: "#ddd",
              lineHeight: "16px",
              fontSize:"11px"
            }}
          >

            <div>
  ✅ Fique alinhado toda semana
</div>

<div>
  ✅ Atendimento VIP prioritário
</div>

<div>
  ✅ 4 atendimentos por mês
</div>

<div>
  ✅ Seu horário reservado primeiro
</div>

<div>
  ✅ Economia todo mês
</div>

          </div>

          <button
            onClick={() =>
              abrirCadastro(
                "Plano Ouro"
              )
            }

            style={{
              width: "100%",

              background: "#d4af37",

              color: "#000",

              padding: "10px",

              borderRadius: "12px",

              border: "none",

              fontWeight: "bold",

              fontSize: "12px",

              cursor: "pointer",

              boxShadow:
                "0 0 25px rgba(212,175,55,0.35)"
            }}
          >
            Assinar Plano
          </button>

        </div>

      </div>

    </main>
  )
}