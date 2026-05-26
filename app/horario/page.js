"use client"

import {
  useState,
  useEffect
} from "react"

import Link from "next/link"

import { db } from "../../firebase"

import {
  collection,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore"

export default function Horario() {

  const [
    horariosManha,
    setHorariosManha
  ] = useState([])

  const [
    horariosTarde,
    setHorariosTarde
  ] = useState([])

  const [
    diasSemana,
    setDiasSemana
  ] = useState([])

  const [
    horarioSelecionado,
    setHorarioSelecionado
  ] = useState("")

  const [
    diaSelecionado,
    setDiaSelecionado
  ] = useState("")

  const [
    horariosOcupados,
    setHorariosOcupados
  ] = useState([])

  const hoje =
    new Date()

  const horaAtual =
    hoje.getHours()

  const minutoAtual =
    hoje.getMinutes()

  const horarioAtual =
    `${String(horaAtual).padStart(2, "0")}:${String(minutoAtual).padStart(2, "0")}`

  function gerarHorarios(
    inicio,
    fim,
    intervalo,
    almocoInicio,
    almocoFim
  ) {

    const horarios = []

    let atual =
      new Date(
        `2000-01-01T${inicio}`
      )

    const horarioFinal =
      new Date(
        `2000-01-01T${fim}`
      )

    while (
      atual < horarioFinal
    ) {

      const hora =
        atual
          .toTimeString()
          .slice(0, 5)

      if (

        !(
          hora >= almocoInicio
          &&
          hora < almocoFim
        )

      ) {

        horarios.push(hora)

      }

      atual.setMinutes(
        atual.getMinutes()
        +
        Number(intervalo)
      )
    }

    return horarios

  }

  useEffect(() => {

    async function carregarConfiguracoes() {

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

        const horarios =
          gerarHorarios(

            config.horarioInicio,

            config.horarioFim,

            config.intervalo,

            config.almocoInicio,

            config.almocoFim

          )

        const manha =
          horarios.filter(
            hora =>
              Number(
                hora.split(":")[0]
              ) < 12
          )

        const tarde =
          horarios.filter(
            hora =>
              Number(
                hora.split(":")[0]
              ) >= 12
          )

        setHorariosManha(
          manha
        )

        setHorariosTarde(
          tarde
        )

        const diasVisiveis =
          config.diasAtivos

        setDiasSemana(
          diasVisiveis
        )

        setDiaSelecionado(
          diasVisiveis[0]
        )

      }

    }

    carregarConfiguracoes()

  }, [])

  useEffect(() => {

    async function buscarHorarios() {

      const barbeiro =
        localStorage.getItem(
          "barbeiroSelecionado"
        )

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "agendamentos"
          )
        )

      const ocupados = []

      querySnapshot.forEach((doc) => {

        const dados =
          doc.data()

        if (

          dados.barbeiro ===
          barbeiro

          &&

          dados.dia ===
          diaSelecionado

          &&

          dados.status !==
          "faltou"

        ) {

          ocupados.push(
            dados.hora
          )
        }
      })

      setHorariosOcupados(
        ocupados
      )
    }

    if (diaSelecionado) {

      buscarHorarios()

      localStorage.setItem(
        "diaSelecionado",
        diaSelecionado
      )

    }

  }, [diaSelecionado])

  function selecionarHorario(
    horario
  ) {

    setHorarioSelecionado(
      horario
    )

    localStorage.setItem(
      "horarioSelecionado",
      horario
    )
  }

  function horarioPassou(
    horario
  ) {

    const hojeNome = [

      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"

    ][new Date().getDay()]

    if (
      diaSelecionado !==
      hojeNome
    ) {

      return false

    }

    return horario <= horarioAtual

  }

  function renderizarHorarios(
    lista
  ) {

    return lista.map(
      (horario, index) => {

      if (
        horarioPassou(
          horario
        )
      ) {

        return null

      }

      const ocupado =
        horariosOcupados.includes(
          horario
        )

      const ativo =
        horarioSelecionado ===
        horario

      return (

        <button

          key={index}

          disabled={ocupado}

          onClick={() =>
            selecionarHorario(
              horario
            )
          }

          style={{

            minHeight: "75px",

            background:

              ocupado

              ? "#1a1a1a"

              :

              ativo

              ? "rgba(212,175,55,0.12)"

              : "#111",

            color:

              ocupado

              ? "#555"

              :

              ativo

              ? "#d4af37"

              : "#fff",

            border:

              ativo

              ? "1px solid #d4af37"

              : "1px solid rgba(255,255,255,0.04)",

            borderRadius: "14px",

            cursor:

              ocupado

              ? "not-allowed"

              : "pointer",

            transition: "0.2s",

            padding: "6px",

            display: "flex",

            flexDirection: "column",

            justifyContent:
              "center",

            alignItems:
              "center",

            gap: "4px"
          }}
        >

          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            {horario}
          </span>

          {ocupado ? (

            <span
              style={{
                fontSize: "10px",
                color: "#777"
              }}
            >
              Indisponível
            </span>

          ) : ativo ? (

            <span
              style={{
                fontSize: "10px",
                color: "#d4af37"
              }}
            >
              Selecionado
            </span>

          ) : (

            <span
              style={{
                fontSize: "10px",
                opacity: "0.5"
              }}
            >
              Livre
            </span>

          )}

        </button>

      )

    })

  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#070707",
        color: "#fff",
        padding:
          "20px 8px 110px 8px",
        fontFamily: "Arial"
      }}
    >

      <div
        onClick={() =>
          window.history.back()
        }

        style={{
          fontSize: "28px",
          cursor: "pointer",
          marginBottom: "10px",
          color: "#d4af37",
          width: "fit-content"
        }}
      >
        ←
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "#d4af37",
          fontSize: "32px",
          marginBottom: "8px",
          fontWeight: "bold"
        }}
      >
        Escolha o Horário
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: "0.6",
          marginBottom: "22px",
          fontSize: "13px"
        }}
      >
        Escolha o dia e horário
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "8px",
          marginBottom: "22px"
        }}
      >

        {diasSemana.map(
          (dia, index) => (

          <button

            key={index}

            onClick={() => {

              setDiaSelecionado(
                dia
              )

              setHorarioSelecionado(
                ""
              )

            }}

            style={{

              background:

                diaSelecionado ===
                dia

                ? "#d4af37"

                : "#111",

              color:

                diaSelecionado ===
                dia

                ? "#000"

                : "#fff",

              border:

                diaSelecionado ===
                dia

                ? "1px solid #d4af37"

                : "1px solid rgba(255,255,255,0.05)",

              padding: "12px",

              borderRadius: "14px",

              fontSize: "12px",

              fontWeight: "bold",

              cursor: "pointer"
            }}
          >
            {dia}
          </button>

        ))}

      </div>

      {horariosManha.length > 0 && (

        <>

          <h2
            style={{
              fontSize: "18px",
              marginBottom: "10px",
              color: "#d4af37"
            }}
          >
            ☀️ Manhã
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, 1fr)",
              gap: "6px",
              marginBottom: "25px"
            }}
          >

            {renderizarHorarios(
              horariosManha
            )}

          </div>

        </>

      )}

      {horariosTarde.length > 0 && (

        <>

          <h2
            style={{
              fontSize: "18px",
              marginBottom: "10px",
              color: "#d4af37"
            }}
          >
            🌙 Tarde
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, 1fr)",
              gap: "6px",
              marginBottom: "30px"
            }}
          >

            {renderizarHorarios(
              horariosTarde
            )}

          </div>

        </>

      )}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          background:
            "rgba(0,0,0,0.95)"
        }}
      >

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto"
          }}
        >

          <Link href="/confirmacao">

            <button

              disabled={
                horarioSelecionado === ""
              }

              style={{
                width: "100%",

                background:

                  horarioSelecionado === ""

                  ? "#333"

                  : "#d4af37",

                color:

                  horarioSelecionado === ""

                  ? "#777"

                  : "#000",

                border: "none",

                padding: "16px",

                borderRadius: "14px",

                fontSize: "16px",

                fontWeight: "bold",

                cursor:

                  horarioSelecionado === ""

                  ? "not-allowed"

                  : "pointer"
              }}
            >
              Continuar
            </button>

          </Link>

        </div>

      </div>

    </main>
  )
}