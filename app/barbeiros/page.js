"use client"

import Link from "next/link"

export default function Barbeiros() {

  const barbeiros = [
    {
      nome: "Breno",
      especialidade: "Corte moderno",
      foto:
        "https://i.imgur.com/8Km9tLL.jpg",
    },

    {
      nome: "Daniel",
      especialidade: "Barba e degradê",
      foto:
        "https://i.imgur.com/2DhmtJ4.jpg",
    },
  ]

  function selecionarBarbeiro(nome) {

    localStorage.setItem(
      "barbeiroSelecionado",
      nome
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#f5d76e",
          fontSize: "42px",
          marginBottom: "50px",
        }}
      >
        Escolha seu barbeiro
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "30px",
        }}
      >

        {barbeiros.map((barbeiro, index) => (

          <Link
            key={index}
            href="/servicos"
            onClick={() =>
              selecionarBarbeiro(
                barbeiro.nome
              )
            }
            style={{
              textDecoration: "none",
            }}
          >

            <div
              style={{
                background: "#222",
                borderRadius: "25px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >

              <img
                src={barbeiro.foto}
                alt={barbeiro.nome}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >

                <h2
                  style={{
                    color: "#f5d76e",
                    marginBottom: "10px",
                    fontSize: "28px",
                  }}
                >
                  {barbeiro.nome}
                </h2>

                <p
                  style={{
                    color: "#ccc",
                    fontSize: "18px",
                  }}
                >
                  {barbeiro.especialidade}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  )
}