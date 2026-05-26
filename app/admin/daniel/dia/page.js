"use client"

import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../../../firebase"

export default function DiaDaniel() {

  const [agendamentos, setAgendamentos] =
    useState([])

  const [mostrarTodos, setMostrarTodos] =
    useState(false)

  const [diaSelecionado, setDiaSelecionado] =
    useState("")

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      )

    const todos =
      params.get("todos")

    const dia =
      params.get("dia")

    if (todos) {

      setMostrarTodos(true)

    }

    if (dia) {

      setDiaSelecionado(dia)

    }

    async function carregar() {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "agendamentos"
          )
        )

      const lista = []

      querySnapshot.forEach((doc) => {

        const dados = doc.data()

        if (
          dados.barbeiro ===
          "Daniel"
        ) {

          lista.push({
            id: doc.id,
            ...dados
          })

        }

      })

      setAgendamentos(lista)

    }

    carregar()

  }, [])

  const filtrados =

    mostrarTodos

      ? agendamentos

      : agendamentos.filter(
          (item) =>
            item.data ===
            diaSelecionado
        )

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
          marginBottom: 25
        }}
      >

        {mostrarTodos
          ? "Todos os Agendamentos"
          : `Agendamentos de ${diaSelecionado}`}

      </h1>

      <div
        style={{
          display: "grid",
          gap: 15
        }}
      >

        {filtrados.map((item) => (

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

            <p>
              👤 {item.nome}
            </p>

            <p>
              📱 {item.whatsapp}
            </p>

            <p>
              📅 {item.data}
            </p>

            <p>
              ⏰ {item.horario}
            </p>

            <p
              style={{
                color: "#25D366",
                fontWeight: "bold"
              }}
            >
              💰 R$
              {Number(
                item.total || 0
              ).toFixed(2)}
            </p>

          </div>

        ))}

      </div>

    </main>

  )

}