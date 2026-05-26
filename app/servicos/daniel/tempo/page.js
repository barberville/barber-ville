"use client"

import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore"

import { db } from "../../../../firebase"

export default function TempoDaniel() {

  const [servicos, setServicos] =
    useState([])

  useEffect(() => {

    async function carregar() {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "servicos"
          )
        )

      const lista = []

      querySnapshot.forEach((docItem) => {

        lista.push({
          id: docItem.id,
          ...docItem.data()
        })

      })

      setServicos(lista)

    }

    carregar()

  }, [])

  async function salvarTempo(
    id,
    novoTempo
  ) {

    await updateDoc(
      doc(db, "servicos", id),
      {
        tempo: novoTempo
      }
    )

    alert("Tempo atualizado")

  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: 20
      }}
    >

      <h1
        style={{
          color: "#d4af37",
          marginBottom: 30
        }}
      >
        Tempo dos Serviços
      </h1>

      <div
        style={{
          display: "grid",
          gap: 15
        }}
      >

        {servicos.map((item) => (

          <div
            key={item.id}

            style={{
              background: "#1a1a1a",
              padding: 15,
              borderRadius: 15,
              border:
                "1px solid #d4af37"
            }}
          >

            <h2>
              {item.nome}
            </h2>

            <input
              type="number"

              defaultValue={
                item.tempo
              }

              onBlur={(e) =>
                salvarTempo(
                  item.id,
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "none",
                marginTop: 10
              }}
            />

          </div>

        ))}

      </div>

    </main>

  )

}