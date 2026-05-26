"use client"

import { useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../firebase"

export default function Agendamento() {

  const [nome, setNome] =
    useState("")

  const [telefone, setTelefone] =
    useState("")

  const [vip, setVip] =
    useState(null)

  async function escolherBarbeiro(nomeBarbeiro) {

    if (!nome || !telefone) {

      alert(
        "Preencha seu nome e telefone"
      )

      return
    }

    localStorage.setItem(
      "clienteNome",
      nome
    )

    localStorage.setItem(
      "clienteTelefone",
      telefone
    )

    localStorage.setItem(
      "barbeiroSelecionado",
      nomeBarbeiro
    )

    if (vip) {

      localStorage.setItem(
        "clienteVip",

        JSON.stringify(vip)
      )

    }

    window.location.href =
      "/servicos"
  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.92)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

        color: "#fff",

        padding: "40px 15px",

        fontFamily: "Arial",

        overflowX: "hidden"
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            color: "#f5d76e",

            fontSize: "42px",

            marginBottom: "12px",

            fontWeight: "bold",

            textShadow:
              "0 0 18px rgba(245,215,110,0.35)"
          }}
        >
          Agendamento
        </h1>

        <p
          style={{
            color: "#d1d5db",

            fontSize: "17px",

            maxWidth: 500,

            margin: "0 auto",

            lineHeight: 1.6
          }}
        >
          Preencha seus dados e escolha seu barbeiro 💈
        </p>

      </div>

      <div
        style={{
          maxWidth: 500,

          margin: "0 auto 30px auto",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          background:
            "rgba(15,15,15,0.55)",

          backdropFilter:
            "blur(10px)",

          border:
            "1px solid rgba(245,215,110,0.25)",

          borderRadius: 24,

          padding: 30
        }}
      >

        <input

          type="text"

          placeholder="Seu nome"

          value={nome}

          onChange={(e) =>
            setNome(e.target.value)
          }

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "18px",

            borderRadius: 12,

            border:
              "1px solid #333",

            background: "#111",

            color: "#fff",

            fontSize: 16,

            outline: "none"
          }}
        />

        <input

          type="tel"

          placeholder="Seu WhatsApp"

          value={telefone}

          onChange={async (e) => {

            const valor =
              e.target.value

            setTelefone(valor)

            try {

              const querySnapshot =
                await getDocs(
                  collection(
                    db,
                    "clientes"
                  )
                )

              let encontrado = null

              querySnapshot.forEach(
                (doc) => {

                const dados =
                  doc.data()

                const numeroBanco =
                  String(
                    dados.whatsapp || ""
                  ).replace(/\D/g, "")

                const numeroDigitado =
                  String(
                    valor || ""
                  ).replace(/\D/g, "")

                if (
                  numeroBanco ===
                  numeroDigitado
                ) {

                  encontrado = dados

                }

              })

              setVip(encontrado)

            } catch (erro) {

              console.log(erro)

            }

          }}

          style={{
            width: "100%",

            padding: "15px",

            borderRadius: 12,

            border:
              "1px solid #333",

            background: "#111",

            color: "#fff",

            fontSize: 16,

            outline: "none"
          }}
        />

        {vip && (

          <div
            style={{
              marginTop: "20px",

              width: "100%",

              background:
                "linear-gradient(90deg,#d4af37,#f5d76e)",

              borderRadius: "16px",

              padding: "14px",

              color: "#000",

              fontWeight: "bold",

              textAlign: "center",

              animation:
                "pulse 2s infinite"
            }}
          >
            👑 Cliente VIP Detectado

            <br /><br />

            Plano:
            {" "}
            {vip.plano}

            <br />

            Atendimentos restantes:
            {" "}
            {vip.atendimentosRestantes}
          </div>

        )}

      </div>

      <div
        style={{
          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          gap: 14,

          maxWidth: 650,

          margin: "0 auto"
        }}
      >

        {["Breno", "Daniel"].map(
          (barbeiro) => (

          <div

            key={barbeiro}

            style={{

              width: "170px",

              background:
                "rgba(15,15,15,0.55)",

              backdropFilter:
                "blur(10px)",

              border:
                "1px solid rgba(245,215,110,0.25)",

              boxShadow:
                "0 8px 28px rgba(0,0,0,0.35)",

              borderRadius: 24,

              padding: "25px 15px",

              textAlign: "center"
            }}
          >

            <img
              src={
                barbeiro ===
                "Breno"

                ? "/breno.jpeg"

                : "/daniel.jpeg"
              }

              alt={barbeiro}

              style={{
                width: "100px",

                height: "100px",

                objectFit: "cover",

                marginBottom: "18px",

                borderRadius: "50%",

                border:
                  "3px solid #f5d76e",

                padding: 5,

                background: "#222"
              }}
            />

            <h2
              style={{
                color: "#f5d76e",

                marginBottom: "10px",

                fontSize: 22
              }}
            >
              {barbeiro}
            </h2>

            <button

              onClick={() =>
                escolherBarbeiro(
                  barbeiro
                )
              }

              style={{

                background:
                  "#f5d76e",

                color: "#111",

                padding:
                  "12px 20px",

                borderRadius: 14,

                border: "none",

                fontWeight: "bold",

                cursor: "pointer",

                fontSize: 14,

                width: "100%"
              }}
            >
              Escolher
            </button>

          </div>

        ))}

      </div>

      <style jsx>{`

        @keyframes pulse {

          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.02);
          }

          100% {
            transform: scale(1);
          }

        }

      `}</style>

    </main>
  )
}