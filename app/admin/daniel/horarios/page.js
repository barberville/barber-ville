"use client"

import { useEffect, useState } from "react"

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

import { db } from "../../../../firebase"

export default function HorariosDaniel() {

  const [carregando,
    setCarregando] =
      useState(true)

  const [salvando,
    setSalvando] =
      useState(false)

  const [horarioInicial,
    setHorarioInicial] =
      useState("08:00")

  const [horarioFinal,
    setHorarioFinal] =
      useState("19:00")

  const [almocoInicio,
    setAlmocoInicio] =
      useState("12:00")

  const [almocoFim,
    setAlmocoFim] =
      useState("13:00")

  const [intervalo,
    setIntervalo] =
      useState("1 hora")

  const [diasSelecionados,
    setDiasSelecionados] =
      useState([])

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

    async function carregarDados() {

      try {

        const ref = doc(
          db,
          "horariosDaniel",
          "configuracoes"
        )

        const snapshot =
          await getDoc(ref)

        if (
          snapshot.exists()
        ) {

          const dados =
            snapshot.data()

          setHorarioInicial(
            dados.horarioInicial ||
            "08:00"
          )

          setHorarioFinal(
            dados.horarioFinal ||
            "19:00"
          )

          setAlmocoInicio(
            dados.almocoInicio ||
            "12:00"
          )

          setAlmocoFim(
            dados.almocoFim ||
            "13:00"
          )

          setIntervalo(
            dados.intervalo ||
            "1 hora"
          )

          setDiasSelecionados(
            dados.diasSelecionados ||
            []
          )

        }

      } catch (erro) {

        console.log(erro)

        alert(
          "Erro ao carregar horários."
        )

      } finally {

        setCarregando(false)

      }

    }

    carregarDados()

  }, [])

  function toggleDia(dia) {

    let novaLista =

      [...diasSelecionados]

    if (
      novaLista.includes(dia)
    ) {

      novaLista =
        novaLista.filter(
          (item) =>
            item !== dia
        )

    } else {

      novaLista.push(dia)

    }

    setDiasSelecionados(
      novaLista
    )

  }

  async function salvarConfiguracoes() {

    try {

      setSalvando(true)

      await setDoc(

        doc(
          db,
          "horariosDaniel",
          "configuracoes"
        ),

        {

          horarioInicial,
          horarioFinal,
          almocoInicio,
          almocoFim,
          intervalo,
          diasSelecionados,

          atualizadoEm:
            new Date()

        }

      )

      alert(
        "Horários do Daniel salvos no Firebase!"
      )

    } catch (erro) {

      console.log(erro)

      alert(
        "Erro ao salvar."
      )

    } finally {

      setSalvando(false)

    }

  }

  if (carregando) {

    return (

      <main
        style={{
          minHeight: "100vh",

          background:
            "#070707",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          color: "#d4af37",

          fontSize: 22,

          fontWeight: "bold"
        }}
      >
        Carregando...
      </main>

    )

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "#070707",

        color: "#fff",

        padding: 20
      }}
    >

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            color: "#d4af37",

            marginBottom: 30,

            fontSize: 38
          }}
        >
          Horários Daniel
        </h1>

        <div
          style={{
            display: "grid",

            gap: 18
          }}
        >

          {/* HORÁRIO INICIAL */}

          <div style={card}>

            <label style={label}>
              Horário inicial
            </label>

            <input
              type="time"

              value={horarioInicial}

              onChange={(e) =>
                setHorarioInicial(
                  e.target.value
                )
              }

              style={input}
            />

          </div>

          {/* HORÁRIO FINAL */}

          <div style={card}>

            <label style={label}>
              Horário final
            </label>

            <input
              type="time"

              value={horarioFinal}

              onChange={(e) =>
                setHorarioFinal(
                  e.target.value
                )
              }

              style={input}
            />

          </div>

          {/* ALMOÇO */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              gap: 18
            }}
          >

            <div style={card}>

              <label style={label}>
                Almoço início
              </label>

              <input
                type="time"

                value={almocoInicio}

                onChange={(e) =>
                  setAlmocoInicio(
                    e.target.value
                  )
                }

                style={input}
              />

            </div>

            <div style={card}>

              <label style={label}>
                Almoço fim
              </label>

              <input
                type="time"

                value={almocoFim}

                onChange={(e) =>
                  setAlmocoFim(
                    e.target.value
                  )
                }

                style={input}
              />

            </div>

          </div>

          {/* INTERVALO */}

          <div style={card}>

            <label style={label}>
              Intervalo entre clientes
            </label>

            <select
              value={intervalo}

              onChange={(e) =>
                setIntervalo(
                  e.target.value
                )
              }

              style={input}
            >

              <option>
                30 minutos
              </option>

              <option>
                1 hora
              </option>

              <option>
                1 hora e 30
              </option>

            </select>

          </div>

          {/* DIAS */}

          <div style={card}>

            <h2
              style={{
                color: "#d4af37",

                marginBottom: 20
              }}
            >
              Dias de atendimento
            </h2>

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit,minmax(160px,1fr))",

                gap: 14
              }}
            >

              {diasSemana.map(
                (dia) => (

                  <button
                    key={dia}

                    onClick={() =>
                      toggleDia(dia)
                    }

                    style={{
                      background:

                        diasSelecionados.includes(
                          dia
                        )

                          ? "#d4af37"

                          : "#111",

                      color:

                        diasSelecionados.includes(
                          dia
                        )

                          ? "#000"

                          : "#fff",

                      border:
                        "1px solid rgba(212,175,55,0.15)",

                      padding: 18,

                      borderRadius: 16,

                      fontWeight: "bold",

                      cursor: "pointer",

                      fontSize: 16
                    }}
                  >
                    {dia}
                  </button>

                )
              )}

            </div>

          </div>

          {/* BOTÃO */}

          <button
            onClick={
              salvarConfiguracoes
            }

            disabled={salvando}

            style={{
              width: "100%",

              background:
                "#d4af37",

              color: "#000",

              border: "none",

              padding: 20,

              borderRadius: 18,

              fontWeight: "bold",

              fontSize: 18,

              cursor: "pointer",

              marginTop: 10,

              opacity:
                salvando
                  ? 0.7
                  : 1
            }}
          >
            {
              salvando
                ? "Salvando..."
                : "Salvar Configurações"
            }
          </button>

        </div>

      </div>

    </main>

  )

}

const card = {

  background:
    "rgba(0,0,0,0.45)",

  border:
    "1px solid rgba(212,175,55,0.15)",

  borderRadius: 22,

  padding: 20
}

const label = {

  display: "block",

  marginBottom: 10,

  color: "#d4af37",

  fontWeight: "bold"
}

const input = {

  width: "100%",

  background: "#111",

  color: "#fff",

  border:
    "1px solid rgba(212,175,55,0.15)",

  padding: 16,

  borderRadius: 14,

  fontSize: 16
}