"use client"

import { useEffect, useState } from "react"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"

import { db } from "../../../firebase"

export default function ServicosAdmin() {

  const [servicos, setServicos] =
    useState([])

  const [nome, setNome] =
    useState("")

  const [preco, setPreco] =
    useState("")

  const [tempo, setTempo] =
    useState("")

    const [categoria, setCategoria] =
  useState("Cortes")

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {

    carregarServicos()

  }, [])

  async function carregarServicos() {

    const querySnapshot =
      await getDocs(
        collection(db, "servicos")
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

  async function adicionarServico() {

    if (
      !nome ||
      !preco ||
      !tempo
    ) {

      alert(
        "Preencha tudo"
      )

      return

    }

    try {

      setLoading(true)

      await addDoc(
  collection(db, "servicos"),
  {
    nome,
    preco,
    tempo,
    categoria
  }
)

      setNome("")
      setPreco("")
      setTempo("")
      setCategoria("Cortes")

      carregarServicos()

      alert(
        "Serviço adicionado!"
      )

    } catch (error) {

      console.log(error)

      alert(
        "Erro ao adicionar serviço"
      )

    }

    setLoading(false)

  }

  async function excluirServico(id) {

    const confirmar =
      confirm(
        "Excluir serviço?"
      )

    if (!confirmar) return

    await deleteDoc(
      doc(db, "servicos", id)
    )

    carregarServicos()

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        padding: 12,

        background:
          "#070707",

        color: "white",

        fontFamily:
          "Arial"
      }}
    >

      <h1
        style={{
          color: "#d4af37",

          marginBottom: 22,

          fontSize: 28,

          textAlign: "center",

          fontWeight: "bold"
        }}
      >
        Serviços Premium
      </h1>

      {/* FORMULÁRIO */}

      <div
        style={{
          display: "grid",

          gap: 10,

          marginBottom: 25,

          background:
            "#111",

          padding: 14,

          borderRadius: 18,

          border:
            "1px solid rgba(212,175,55,0.10)",

          boxShadow:
            "0 6px 18px rgba(0,0,0,0.30)"
        }}
      >

        <input
          placeholder="Nome do serviço"

          value={nome}

          onChange={(e) =>
            setNome(
              e.target.value
            )
          }

          style={{
            padding: 14,

            borderRadius: 12,

            border: "none",

            outline: "none",

            background:
              "#1b1b1b",

            color: "white",

            fontSize: 14
          }}
        />

        <input
          placeholder="Preço"

          value={preco}

          onChange={(e) =>
            setPreco(
              e.target.value
            )
          }

          style={{
            padding: 14,

            borderRadius: 12,

            border: "none",

            outline: "none",

            background:
              "#1b1b1b",

            color: "white",

            fontSize: 14
          }}
        />

        <input
          placeholder="Tempo em minutos"

          value={tempo}

          onChange={(e) =>
            setTempo(
              e.target.value
            )
          }

          style={{
            padding: 14,

            borderRadius: 12,

            border: "none",

            outline: "none",

            background:
              "#1b1b1b",

            color: "white",

            fontSize: 14
          }}
        />

<select
  value={categoria}
  onChange={(e) =>
    setCategoria(e.target.value)
  }
  style={{
    padding: 14,
    borderRadius: 12,
    border: "none",
    outline: "none",
    background: "#1b1b1b",
    color: "white",
    fontSize: 14
  }}
>
  <option>Cortes</option>
  <option>Barba</option>
  <option>Outros Serviços</option>
</select>

        <button
          onClick={
            adicionarServico
          }

          style={{
            background:
              "linear-gradient(to right, #d4af37, #f1d27a)",

            color: "#000",

            border: "none",

            padding: 14,

            borderRadius: 12,

            fontWeight: "bold",

            fontSize: 14,

            cursor: "pointer"
          }}
        >
          {
            loading
              ? "Adicionando..."
              : "Adicionar Serviço"
          }
        </button>

      </div>

      {/* LISTA */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, 1fr)",

          gap: 8
        }}
      >

        {servicos.map((item) => (

          <div
            key={item.id}

            style={{

              minHeight: "150px",

              background:
                "#111",

              border:
                "1px solid rgba(255,255,255,0.04)",

              borderRadius: 14,

              padding: 10,

              transition: "0.25s",

              boxShadow:
                "0 6px 16px rgba(0,0,0,0.28)"
            }}
          >

            <div
              style={{
                width: 34,
                height: 34,

                borderRadius: 10,

                background:
                  "rgba(212,175,55,0.08)",

                display: "flex",

                alignItems: "center",

                justifyContent:
                  "center",

                fontSize: 15,

                marginBottom: 10
              }}
            >
              ✂
            </div>

            <h2
              style={{
                marginTop: 0,

                marginBottom: 12,

                color: "#fff",

                fontSize: 15,

                lineHeight: "20px",

                textTransform:
                  "capitalize"
              }}
            >
              {item.nome}
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5
              }}
            >

              <p
                style={{
                  margin: 0,

                  color: "#bdbdbd",

                  fontSize: 11
                }}
              >
                Tempo:
                {" "}

                <strong
                  style={{
                    color: "#fff"
                  }}
                >
                  {item.tempo} min
                </strong>
              </p>

              <p
                style={{
                  margin: 0,

                  color: "#bdbdbd",

                  fontSize: 11
                }}
              >
                Valor:
                {" "}

                <strong
                  style={{
                    color: "#d4af37"
                  }}
                >
                  R$ {item.preco}
                </strong>
              </p>

            </div>

            <button
              onClick={() =>
                excluirServico(
                  item.id
                )
              }

              style={{
                marginTop: 12,

                background:
                  "#1f1f1f",

                color: "#ff4d4d",

                border:
                  "1px solid rgba(255,77,77,0.15)",

                padding: 8,

                borderRadius: 10,

                cursor: "pointer",

                width: "100%",

                fontWeight: "bold",

                fontSize: 11
              }}
            >
              Excluir
            </button>

          </div>

        ))}

      </div>

    </main>

  )

}