"use client"

import { useState } from "react"

export default function PainelDaniel() {

  const hoje = new Date().getDay()

  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ]

  const diasMostrar =
    diasSemana.slice(hoje)

  const [diaSelecionado,
    setDiaSelecionado] =
    useState(diasMostrar[0])

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: 25
      }}
    >

      <h1
        style={{
          color: "#d4af37",
          fontSize: 50,
          marginBottom: 40
        }}
      >
        Painel Daniel
      </h1>

      <h2
        style={{
          color: "#d4af37",
          fontSize: 40,
          marginBottom: 20
        }}
      >
        Agendamentos
      </h2>

      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
          marginBottom: 40
        }}
      >

        {diasMostrar.map((dia) => (

          <button

            key={dia}

            onClick={() =>
              setDiaSelecionado(dia)
            }

            style={{

              padding:
                "15px 30px",

              borderRadius: 15,

              border: "none",

              fontWeight: "bold",

              fontSize: 18,

              cursor: "pointer",

              background:
                diaSelecionado === dia
                  ? "#d4af37"
                  : "#d9d9d9",

              color:
                diaSelecionado === dia
                  ? "#000"
                  : "#444"

            }}
          >

            {dia}

          </button>

        ))}

      </div>

      <div
        style={{
          border:
            "3px solid #d4af37",

          borderRadius: 25,

          padding: 30,

          background: "#1a1a1a",

          minHeight: 350
        }}
      >

        <h2
          style={{
            color: "#d4af37",
            marginBottom: 15,
            fontSize: 35
          }}
        >
          {diaSelecionado}
        </h2>

        <p
          style={{
            fontSize: 20
          }}
        >
          Nenhum agendamento.
        </p>

      </div>

    </main>

  )

}