"use client"

import { useState } from "react"

export default function Fotos() {

  const [logo, setLogo] =
    useState(null)

  const [banner, setBanner] =
    useState(null)

  const [barbeiro1, setBarbeiro1] =
    useState(null)

  const [barbeiro2, setBarbeiro2] =
    useState(null)

  function salvarImagem(
    evento,
    tipo
  ) {

    const arquivo =
      evento.target.files[0]

    if (!arquivo) return

    const leitor =
      new FileReader()

    leitor.onload = () => {

      const imagem =
        leitor.result

      localStorage.setItem(
        tipo,
        imagem
      )

      if (tipo === "logo") {
        setLogo(imagem)
      }

      if (tipo === "banner") {
        setBanner(imagem)
      }

      if (tipo === "barbeiro1") {
        setBarbeiro1(imagem)
      }

      if (tipo === "barbeiro2") {
        setBarbeiro2(imagem)
      }

      alert(
        "Imagem salva com sucesso 🔥"
      )

    }

    leitor.readAsDataURL(
      arquivo
    )

  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #000, #111)",

        padding: 20,
        color: "white"
      }}
    >

      <h1
        style={{
          color: "#d4af37",
          fontSize: 40,
          textAlign: "center",
          marginBottom: 40
        }}
      >
        Painel de Fotos
      </h1>

      <div
        style={{
          display: "grid",
          gap: 30,
          maxWidth: 700,
          margin: "0 auto"
        }}
      >

        {/* LOGO */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",

            padding: 20,
            borderRadius: 20,
            border:
              "1px solid #d4af37"
          }}
        >

          <h2
            style={{
              color: "#d4af37",
              marginBottom: 15
            }}
          >
            Logo da Barbearia
          </h2>

          <input
            type="file"
            accept="image/*"

            onChange={(e) =>
              salvarImagem(
                e,
                "logo"
              )
            }
          />

          {logo && (

            <img
              src={logo}

              style={{
                width: 200,
                marginTop: 20,
                borderRadius: 20
              }}
            />

          )}

        </div>

        {/* BANNER */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",

            padding: 20,
            borderRadius: 20,
            border:
              "1px solid #d4af37"
          }}
        >

          <h2
            style={{
              color: "#d4af37",
              marginBottom: 15
            }}
          >
            Banner Principal
          </h2>

          <input
            type="file"
            accept="image/*"

            onChange={(e) =>
              salvarImagem(
                e,
                "banner"
              )
            }
          />

          {banner && (

            <img
              src={banner}

              style={{
                width: "100%",
                marginTop: 20,
                borderRadius: 20
              }}
            />

          )}

        </div>

        {/* BARBEIRO 1 */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",

            padding: 20,
            borderRadius: 20,
            border:
              "1px solid #d4af37"
          }}
        >

          <h2
            style={{
              color: "#d4af37",
              marginBottom: 15
            }}
          >
            Foto Barbeiro Breno
          </h2>

          <input
            type="file"
            accept="image/*"

            onChange={(e) =>
              salvarImagem(
                e,
                "barbeiro1"
              )
            }
          />

          {barbeiro1 && (

            <img
              src={barbeiro1}

              style={{
                width: 200,
                marginTop: 20,
                borderRadius: 20
              }}
            />

          )}

        </div>

        {/* BARBEIRO 2 */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",

            padding: 20,
            borderRadius: 20,
            border:
              "1px solid #d4af37"
          }}
        >

          <h2
            style={{
              color: "#d4af37",
              marginBottom: 15
            }}
          >
            Foto Outro Barbeiro
          </h2>

          <input
            type="file"
            accept="image/*"

            onChange={(e) =>
              salvarImagem(
                e,
                "barbeiro2"
              )
            }
          />

          {barbeiro2 && (

            <img
              src={barbeiro2}

              style={{
                width: 200,
                marginTop: 20,
                borderRadius: 20
              }}
            />

          )}

        </div>

      </div>

    </main>

  )

}