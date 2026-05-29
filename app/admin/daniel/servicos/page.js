"use client"

import { useEffect, useState } from "react"

import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

import { db } from "../../../../firebase"

export default function TempoServicosDaniel() {

  const [servicos,
    setServicos] =
      useState([])

  const [tempos,
    setTempos] =
      useState({})

  const [salvando,
    setSalvando] =
      useState(false)

  const [carregando,
    setCarregando] =
      useState(true)

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "servicos"
        ),

        (snapshot) => {

          const lista = []

          snapshot.forEach(
            (docItem) => {

              lista.push({
                id: docItem.id,
                ...docItem.data()
              })

            }
          )

          setServicos(
            lista
          )

        }
      )

    return () =>
      unsubscribe()

  }, [])

  useEffect(() => {

    async function carregarTempos() {

      try {

        const ref = doc(
          db,
          "tempoServicosDaniel",
          "tempos"
        )

        const snapshot =
          await getDoc(ref)

        if (
          snapshot.exists()
        ) {

          setTempos(
            snapshot.data()
          )

        }

      } catch (erro) {

        console.log(erro)

        alert(
          "Erro ao carregar tempos."
        )

      } finally {

        setCarregando(false)

      }

    }

    carregarTempos()

  }, [])

  async function alterarTempo(
    id,
    valor
  ) {

    const novaLista = {

      ...tempos,

      [id]: valor

    }

    setTempos(
      novaLista
    )

    try {

      setSalvando(true)

      await setDoc(

        doc(
          db,
          "tempoServicosDaniel",
          "tempos"
        ),

        novaLista

      )

    } catch (erro) {

      console.log(erro)

      alert(
        "Erro ao salvar tempo."
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
          "linear-gradient(rgba(0,0,0,0.92), rgba(0,0,0,0.96)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition:
          "center",

        padding: 20,

        color: "#fff",

        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            flexWrap: "wrap",

            gap: 10,

            marginBottom: 30
          }}
        >

          <div>

            <h1
              style={{
                color: "#d4af37",

                fontSize: 38,

                marginBottom: 10
              }}
            >
              Tempo dos Serviços
            </h1>

            <p
              style={{
                color: "#999",

                fontSize: 16
              }}
            >
              Daniel pode editar somente o tempo dos serviços.
            </p>

          </div>

          <div
            style={{
              background:
                salvando
                  ? "#ffaa00"
                  : "#00ff66",

              color: "#000",

              padding:
                "12px 18px",

              borderRadius: 14,

              fontWeight: "bold"
            }}
          >
            {
              salvando
                ? "Salvando..."
                : "Online"
            }
          </div>

        </div>

        <div
          style={{
            display: "grid",

            gap: 18
          }}
        >

          {servicos.map(
            (servico) => (

              <div
                key={servico.id}

                style={{
                  background:
                    "rgba(0,0,0,0.55)",

                  border:
                    "1px solid rgba(212,175,55,0.15)",

                  borderRadius: 22,

                  padding: 20
                }}
              >

                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems: "center",

                    gap: 20,

                    flexWrap: "wrap"
                  }}
                >

                  <div>

                    <h2
                      style={{
                        color: "#d4af37",

                        marginTop: 0,

                        marginBottom: 10,

                        fontSize: 28
                      }}
                    >
                      {servico.nome}
                    </h2>

                    <p
                      style={{
                        color: "#ccc",

                        marginBottom: 0,

                        fontSize: 18
                      }}
                    >
                      💰 R$ {servico.preco}
                    </p>

                  </div>

                  <div
                    style={{
                      minWidth: 260,

                      flex: 1,

                      maxWidth: 320
                    }}
                  >

                    <label
                      style={{
                        display: "block",

                        marginBottom: 10,

                        color: "#aaa",

                        fontWeight: "bold",

                        fontSize: 15
                      }}
                    >
                      Tempo do serviço
                    </label>

                    <input
                      type="text"

                      placeholder=
                      "Ex: 40min"

                      value={
                        tempos[
                          servico.id
                        ] || ""
                      }

                      onChange={(e) =>
                        alterarTempo(
                          servico.id,
                          e.target.value
                        )
                      }

                      style={{
                        width: "100%",

                        background:
                          "#111",

                        color: "#fff",

                        border:
                          "1px solid rgba(212,175,55,0.15)",

                        padding: 16,

                        borderRadius: 16,

                        fontSize: 17
                      }}
                    />

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )

}