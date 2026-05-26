"use client"

import {
  useEffect,
  useState
} from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../../firebase"

export default function DiaAdmin() {

  const [agendamentos, setAgendamentos] =
    useState([])

  const [mostrarTodos, setMostrarTodos] =
    useState(false)

  const hoje = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ][new Date().getDay()]

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      )

    const todos =
      params.get("todos")

    if (todos) {

      setMostrarTodos(true)

    }

    async function carregar() {

      const querySnapshot =
        await getDocs(
          collection(db, "agendamentos")
        )

      const lista = []

      querySnapshot.forEach((docItem) => {

        lista.push({
          id: docItem.id,
          ...docItem.data()
        })

      })

      setAgendamentos(lista)

    }

    carregar()

  }, [])

  const agendamentosFiltrados =

    mostrarTodos

      ? agendamentos

      : agendamentos.filter(
          (item) =>
            item.data === hoje
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
          marginBottom: 25,
          fontSize: 32
        }}
      >

        {mostrarTodos
          ? "Todos os Agendamentos"
          : `Agendamentos de ${hoje}`}

      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: 15
        }}
      >

        {agendamentosFiltrados.map((item) => (

          <div
            key={item.id}

            style={{
              background:

                item.status ===
                  "concluido"

                  ? "rgba(0,120,0,0.35)"

                  :

                  item.status ===
                    "faltou"

                    ? "rgba(180,0,0,0.35)"

                    :

                    "rgba(17,17,17,0.82)",

              padding: 14,
              borderRadius: 14,
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
              💈 {item.barbeiro}
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
                fontWeight: "bold",
                marginTop: 10
              }}
            >
              💰 R$
              {Number(item.total || 0).toFixed(2)}
            </p>

          </div>

        ))}

      </div>

    </main>

  )

}