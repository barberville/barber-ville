"use client"

import {
  useState,
  useEffect
} from "react"

import { db } from "../../../firebase"

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

export default function HorariosAdmin() {

  const [
    horarioInicio,
    setHorarioInicio
  ] = useState("08:00")

  const [
    horarioFim,
    setHorarioFim
  ] = useState("19:00")

  const [
    almocoInicio,
    setAlmocoInicio
  ] = useState("12:00")

  const [
    almocoFim,
    setAlmocoFim
  ] = useState("13:00")

  const [
    intervalo,
    setIntervalo
  ] = useState("30")

  const [
    diasAtivos,
    setDiasAtivos
  ] = useState([
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ])

  const diasSemana = [

    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo"

  ]

  useEffect(() => {

    async function carregarConfiguracoes() {

      try {

        const docRef =
          doc(
            db,
            "configuracoes",
            "horarios"
          )

        const docSnap =
          await getDoc(docRef)

        if (docSnap.exists()) {

          const config =
            docSnap.data()

          setHorarioInicio(
            config.horarioInicio
          )

          setHorarioFim(
            config.horarioFim
          )

          setAlmocoInicio(
            config.almocoInicio
          )

          setAlmocoFim(
            config.almocoFim
          )

          setIntervalo(
            config.intervalo
          )

          setDiasAtivos(
            config.diasAtivos
          )

        }

      } catch (erro) {

        console.log(erro)

      }

    }

    carregarConfiguracoes()

  }, [])

  async function salvarConfiguracoes() {

    try {

      const config = {

        horarioInicio,
        horarioFim,

        almocoInicio,
        almocoFim,

        intervalo,

        diasAtivos

      }

      await setDoc(

        doc(
          db,
          "configuracoes",
          "horarios"
        ),

        config

      )

      alert(
        "Configurações salvas!"
      )

    } catch (erro) {

      console.log(erro)

      alert(
        "Erro ao salvar configurações"
      )

    }

  }

  function alternarDia(dia) {

    if (
      diasAtivos.includes(
        dia
      )
    ) {

      setDiasAtivos(

        diasAtivos.filter(
          item =>
            item !== dia
        )

      )

    } else {

      setDiasAtivos([
        ...diasAtivos,
        dia
      ])

    }

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "#070707",

        color: "white",

        padding: "20px",

        fontFamily:
          "Arial"
      }}
    >

      <h1
        style={{
          color: "#d4af37",
          fontSize: "34px",
          marginBottom: "8px",
          textAlign: "center"
        }}
      >
        Gerenciar Horários
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: "0.6",
          marginBottom: "30px"
        }}
      >
        Controle completo da agenda
      </p>

      <div
        style={{
          display: "grid",
          gap: "18px",

          background:
            "#111",

          padding: "20px",

          borderRadius: "22px",

          border:
            "1px solid rgba(212,175,55,0.15)"
        }}
      >

        <div>

          <p
            style={{
              marginBottom: "8px",
              color: "#d4af37",
              fontWeight: "bold"
            }}
          >
            Horário inicial
          </p>

          <input
            type="time"

            value={horarioInicio}

            onChange={(e) =>
              setHorarioInicio(
                e.target.value
              )
            }

            style={{
              width: "100%",
              padding: "16px",
              background: "#1a1a1a",
              border:
                "1px solid rgba(255,255,255,0.05)",
              borderRadius: "14px",
              color: "white",
              fontSize: "16px"
            }}
          />

        </div>

        <div>

          <p
            style={{
              marginBottom: "8px",
              color: "#d4af37",
              fontWeight: "bold"
            }}
          >
            Horário final
          </p>

          <input
            type="time"

            value={horarioFim}

            onChange={(e) =>
              setHorarioFim(
                e.target.value
              )
            }

            style={{
              width: "100%",
              padding: "16px",
              background: "#1a1a1a",
              border:
                "1px solid rgba(255,255,255,0.05)",
              borderRadius: "14px",
              color: "white",
              fontSize: "16px"
            }}
          />

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "12px"
          }}
        >

          <div>

            <p
              style={{
                marginBottom: "8px",
                color: "#d4af37",
                fontWeight: "bold"
              }}
            >
              Almoço início
            </p>

            <input
              type="time"

              value={almocoInicio}

              onChange={(e) =>
                setAlmocoInicio(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "16px",
                background: "#1a1a1a",
                border:
                  "1px solid rgba(255,255,255,0.05)",
                borderRadius: "14px",
                color: "white",
                fontSize: "16px"
              }}
            />

          </div>

          <div>

            <p
              style={{
                marginBottom: "8px",
                color: "#d4af37",
                fontWeight: "bold"
              }}
            >
              Almoço fim
            </p>

            <input
              type="time"

              value={almocoFim}

              onChange={(e) =>
                setAlmocoFim(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "16px",
                background: "#1a1a1a",
                border:
                  "1px solid rgba(255,255,255,0.05)",
                borderRadius: "14px",
                color: "white",
                fontSize: "16px"
              }}
            />

          </div>

        </div>

        <div>

          <p
            style={{
              marginBottom: "8px",
              color: "#d4af37",
              fontWeight: "bold"
            }}
          >
            Intervalo entre clientes
          </p>

          <select

            value={intervalo}

            onChange={(e) =>
              setIntervalo(
                e.target.value
              )
            }

            style={{
              width: "100%",
              padding: "16px",
              background: "#1a1a1a",
              border:
                "1px solid rgba(255,255,255,0.05)",
              borderRadius: "14px",
              color: "white",
              fontSize: "16px"
            }}
          >

            <option value="15">
              15 minutos
            </option>

            <option value="30">
              30 minutos
            </option>

            <option value="45">
              45 minutos
            </option>

            <option value="60">
              1 hora
            </option>

          </select>

        </div>

        <div>

          <p
            style={{
              marginBottom: "14px",
              color: "#d4af37",
              fontWeight: "bold"
            }}
          >
            Dias de atendimento
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, 1fr)",
              gap: "10px"
            }}
          >

            {diasSemana.map(
              (dia, index) => {

              const ativo =
                diasAtivos.includes(
                  dia
                )

              return (

                <button

                  key={index}

                  onClick={() =>
                    alternarDia(
                      dia
                    )
                  }

                  style={{

                    background:

                      ativo

                      ? "#d4af37"

                      : "#1a1a1a",

                    color:

                      ativo

                      ? "#000"

                      : "#fff",

                    border:

                      ativo

                      ? "1px solid #d4af37"

                      : "1px solid rgba(255,255,255,0.05)",

                    padding: "14px",

                    borderRadius: "14px",

                    fontWeight: "bold",

                    cursor: "pointer"
                  }}
                >
                  {dia}
                </button>

              )

            })}

          </div>

        </div>

        <button

          onClick={
            salvarConfiguracoes
          }

          style={{

            background:
              "#d4af37",

            color: "#000",

            border: "none",

            padding: "18px",

            borderRadius: "16px",

            fontWeight: "bold",

            fontSize: "16px",

            cursor: "pointer",

            marginTop: "10px"
          }}
        >
          Salvar Configurações
        </button>

      </div>

    </main>

  )

}