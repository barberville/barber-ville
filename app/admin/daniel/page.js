"use client"

import { useEffect, useState } from "react"

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore"

import {
  signOut
} from "firebase/auth"

import {
  db,
  auth
} from "../../../firebase"

export default function Daniel() {

  const [agendamentos,
    setAgendamentos] =
      useState([])

  const [clientesVip,
    setClientesVip] =
      useState([])

  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ]

  const hojeIndex =
    Math.max(
      0,
      new Date().getDay() - 1
    )

  const [diaSelecionado,
    setDiaSelecionado] =
      useState(
        diasSemana[hojeIndex]
      )

  const [mostrarAtivos,
    setMostrarAtivos] =
      useState(false)

  const [mostrarAtrasados,
    setMostrarAtrasados] =
      useState(false)

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "agendamentos"
        ),

        (snapshot) => {

          const lista = []

          snapshot.forEach(
            (docItem) => {

              const dados =
                docItem.data()

              if (
                dados.barbeiro ===
                "Daniel"
              ) {

                lista.push({
                  id: docItem.id,
                  ...dados
                })

              }

            }
          )

          setAgendamentos(
            lista
          )

        }
      )

    return () =>
      unsubscribe()

  }, [])

  useEffect(() => {

    const listaVip =
      JSON.parse(

        localStorage.getItem(
          "clientesVip"
        ) || "[]"

      )

    const clientesDaniel =

      listaVip.filter(
        (cliente) =>

          cliente.barbeiro ===
          "Daniel"
      )

    setClientesVip(
      clientesDaniel
    )

  }, [])

  async function concluir(item) {

    await updateDoc(

      doc(
        db,
        "agendamentos",
        item.id
      ),

      {
        status: "concluido"
      }

    )

    const mensagem =

`Olá ${item.nome}, tudo certo? 👋

Seu atendimento na Barber Ville foi concluído com sucesso. 💈🔥

Agradecemos pela preferência e esperamos você novamente.`

    window.open(

      `https://wa.me/55${item.telefone}?text=${encodeURIComponent(mensagem)}`,

      "_blank"

    )

  }

  async function faltou(item) {

    await updateDoc(

      doc(
        db,
        "agendamentos",
        item.id
      ),

      {
        status: "faltou"
      }

    )

    const mensagem =

`Olá ${item.nome}, sentimos sua falta hoje na Barber Ville. 💈

Caso queira reagendar seu horário, estaremos à disposição.`

    window.open(

      `https://wa.me/55${item.telefone}?text=${encodeURIComponent(mensagem)}`,

      "_blank"

    )

  }

  async function cancelar(item) {

    const confirmar =
      confirm(
        "Deseja cancelar?"
      )

    if (!confirmar) return

    await deleteDoc(

      doc(
        db,
        "agendamentos",
        item.id
      )

    )

  }

  const concluidos =

    agendamentos.filter(
      (item) =>

        item.status ===
        "concluido"
    )

  const faturamentoTotal =

    concluidos.reduce(
      (acc, item) =>

        acc +
        Number(
          item.total || 0
        ),

      0
    )

  const faturamentoDaniel =

    faturamentoTotal * 0.5

  const clientesAtivos =

    clientesVip.filter(
      (cliente) =>

        cliente.aprovado &&
        cliente.pagamentoConfirmado
    )

  const clientesAtrasados =

    clientesVip.filter(
      (cliente) =>

        !cliente.pagamentoConfirmado
    )

  const agendamentosFiltrados =

    agendamentos.filter(
      (item) =>

        item.dia ===
        diaSelecionado
    )

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(rgba(0,0,0,0.93), rgba(0,0,0,0.96)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition:
          "center",

        padding: 16,

        color: "#fff",

        fontFamily: "Arial"
      }}
    >

      {/* TOPO */}

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: 25,

          gap: 10
        }}
      >

        <div>

          <h1
            style={{
              color: "#d4af37",

              margin: 0,

              fontSize: 34
            }}
          >
            Painel Daniel
          </h1>

          <p
            style={{
              color: "#999",

              marginTop: 8
            }}
          >
            {new Date()
              .toLocaleDateString(
                "pt-BR"
              )}
          </p>

        </div>

        <button
          onClick={async () => {

            await signOut(auth)

            localStorage.removeItem(
              "danielLogado"
            )

            window.location.href =
              "/"

          }}

          style={{
            background:
              "#d4af37",

            color: "#000",

            border: "none",

            padding:
              "12px 18px",

            borderRadius: 16,

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          Sair
        </button>

      </div>

      {/* DASHBOARD */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(160px,1fr))",

          gap: 12,

          marginBottom: 25
        }}
      >

        <Card
          titulo="💰 Faturamento"
          valor={`R$ ${faturamentoTotal.toFixed(2)}`}
        />

        <Card
          titulo="🧾 50% Daniel"
          valor={`R$ ${faturamentoDaniel.toFixed(2)}`}
        />

        <Card
          titulo="📅 Agendamentos"
          valor={agendamentos.length}
        />

        <Card
          titulo="👑 VIP"
          valor={clientesVip.length}
        />

      </div>

      {/* CLIENTES VIP */}

      <div
        style={{
          marginBottom: 30
        }}
      >

        <h2
          style={{
            color: "#d4af37",

            marginBottom: 18,

            fontSize: 28
          }}
        >
          Clientes VIP
        </h2>

        <div
          style={{
            display: "flex",

            gap: 10,

            marginBottom: 20
          }}
        >

          <button
            onClick={() =>
              setMostrarAtivos(
                !mostrarAtivos
              )
            }

            style={{
              flex: 1,

              background:
                mostrarAtivos
                  ? "#d4af37"
                  : "#111",

              color:
                mostrarAtivos
                  ? "#000"
                  : "#fff",

              border: "none",

              padding: 16,

              borderRadius: 16,

              fontWeight: "bold",

              fontSize: 15,

              cursor: "pointer"
            }}
          >
            Ativos
          </button>

          <button
            onClick={() =>
              setMostrarAtrasados(
                !mostrarAtrasados
              )
            }

            style={{
              flex: 1,

              background:
                mostrarAtrasados
                  ? "#d4af37"
                  : "#111",

              color:
                mostrarAtrasados
                  ? "#000"
                  : "#fff",

              border: "none",

              padding: 16,

              borderRadius: 16,

              fontWeight: "bold",

              fontSize: 15,

              cursor: "pointer"
            }}
          >
            Atrasados
          </button>

        </div>

        {mostrarAtivos && (

          <div
            style={{
              display: "grid",
              gap: 14,
              marginBottom: 20
            }}
          >

            {clientesAtivos.map(
              (cliente, index) => (

                <div
                  key={index}

                  style={cardVip}
                >

                  <h2
                    style={{
                      color: "#00ff66",
                      marginTop: 0
                    }}
                  >
                    {cliente.nome}
                  </h2>

                  <p>
                    📱 {cliente.telefone}
                  </p>

                  <p>
                    👑 {cliente.plano}
                  </p>

                  <p>
                    ✂️ {cliente.restantes || 4} restantes
                  </p>

                  <button
                    onClick={() =>

                      window.open(
                        `https://wa.me/55${cliente.telefone}`,
                        "_blank"
                      )

                    }

                    style={whats}
                  >
                    WhatsApp
                  </button>

                </div>

              )
            )}

          </div>

        )}

        {mostrarAtrasados && (

          <div
            style={{
              display: "grid",
              gap: 14
            }}
          >

            {clientesAtrasados.map(
              (cliente, index) => (

                <div
                  key={index}

                  style={cardVip}
                >

                  <h2
                    style={{
                      color: "#ff4444",
                      marginTop: 0
                    }}
                  >
                    {cliente.nome}
                  </h2>

                  <p>
                    📱 {cliente.telefone}
                  </p>

                  <p>
                    👑 {cliente.plano}
                  </p>

                  <p>
                    ❌ Pagamento pendente
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* AGENDAMENTOS */}

      <div
        style={{
          marginBottom: 30
        }}
      >

        <h2
          style={{
            color: "#d4af37",

            marginBottom: 18,

            fontSize: 28
          }}
        >
          📅 Agendamentos
        </h2>

        <div
          style={{
            display: "flex",

            gap: 8,

            flexWrap: "wrap",

            marginBottom: 20
          }}
        >

          {diasSemana.map(
            (dia) => (

              <button
                key={dia}

                onClick={() =>

                  setDiaSelecionado(

                    diaSelecionado === dia
                      ? ""
                      : dia

                  )

                }

                style={{
                  background:
                    diaSelecionado === dia
                      ? "#d4af37"
                      : "#111",

                  color:
                    diaSelecionado === dia
                      ? "#000"
                      : "#fff",

                  border: "none",

                  padding:
                    "12px 18px",

                  borderRadius: 14,

                  fontWeight: "bold",

                  cursor: "pointer",

                  fontSize: 14
                }}
              >
                {dia}
              </button>

            )
          )}

        </div>

        <div
          style={{
            display: "grid",
            gap: 16
          }}
        >

          {diaSelecionado &&

            agendamentosFiltrados.map(
              (item) => (

                <div
                  key={item.id}

                  style={agendamentoCard}
                >

                  <p>
                    👤 {item.nome}
                  </p>

                  <p>
                    📱 {item.telefone}
                  </p>

                  <p>
                    💈 {item.barbeiro}
                  </p>

                  <p>
                    📅 {item.dia}
                  </p>

                  <p>
                    🕒 {item.horario}
                  </p>

                  <p>
                    ✂️ {item.servico}
                  </p>

                  <p>
                    🧴 {item.produto || "Nenhum"}
                  </p>

                  <p>
                    📌 {item.status || "agendado"}
                  </p>

                  <p
                    style={{
                      color: "#00ff66",

                      fontWeight: "bold",

                      fontSize: 22
                    }}
                  >
                    💰 R$ {item.total}
                  </p>

                  <div
                    style={{
                      display: "grid",

                      gap: 10,

                      marginTop: 16
                    }}
                  >

                    <button
                      onClick={() =>
                        concluir(item)
                      }

                      style={btnConcluir}
                    >
                      Concluir
                    </button>

                    <button
                      onClick={() =>
                        faltou(item)
                      }

                      style={btnFaltou}
                    >
                      Faltou
                    </button>

                    <button
                      onClick={() =>
                        cancelar(item)
                      }

                      style={btnCancelar}
                    >
                      Cancelar
                    </button>

                  </div>

                </div>

              )
            )}

        </div>

      </div>

      {/* AÇÕES */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",

          gap: 14
        }}
      >

        <div style={box}>

          <h2
            style={titulo}
          >
            Horários
          </h2>

          <p
            style={descricao}
          >
            Editar horários
          </p>

          <button
            onClick={() =>

              window.location.href =
                "/admin/daniel/horarios"

            }

            style={botao}
          >
            Abrir
          </button>

        </div>

        <div style={box}>

          <h2
            style={titulo}
          >
            Tempo Serviços
          </h2>

          <p
            style={descricao}
          >
            Editar tempo
          </p>

          <button
            onClick={() =>

              window.location.href =
                "/admin/daniel/servicos"

            }

            style={botao}
          >
            Abrir
          </button>

        </div>

      </div>

    </main>

  )

}

function Card({
  titulo,
  valor
}) {

  return (

    <div
      style={{
        background:
          "rgba(0,0,0,0.45)",

        border:
          "1px solid rgba(212,175,55,0.15)",

        borderRadius: 22,

        padding: 18
      }}
    >

      <p
        style={{
          color: "#aaa",

          marginBottom: 10,

          fontSize: 14
        }}
      >
        {titulo}
      </p>

      <h1
        style={{
          color: "#d4af37",

          margin: 0,

          fontSize: 28
        }}
      >
        {valor}
      </h1>

    </div>

  )

}

const agendamentoCard = {

  background:
    "rgba(0,0,0,0.55)",

  border:
    "1px solid rgba(212,175,55,0.15)",

  borderRadius: 22,

  padding: 20,

  lineHeight: "30px",

  fontSize: 16

}

const cardVip = {

  background:
    "rgba(0,0,0,0.55)",

  border:
    "1px solid rgba(212,175,55,0.15)",

  borderRadius: 22,

  padding: 20,

  lineHeight: "30px"

}

const box = {

  background:
    "rgba(0,0,0,0.55)",

  border:
    "1px solid rgba(212,175,55,0.15)",

  borderRadius: 22,

  padding: 20

}

const titulo = {

  color: "#d4af37",

  marginBottom: 10

}

const descricao = {

  color: "#aaa",

  marginBottom: 20

}

const botao = {

  width: "100%",

  background:
    "#d4af37",

  color: "#000",

  border: "none",

  padding: 16,

  borderRadius: 16,

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: 16

}

const btnConcluir = {

  background:
    "#00ff66",

  color: "#000",

  border: "none",

  padding: 16,

  borderRadius: 14,

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: 16

}

const btnFaltou = {

  background:
    "#ff4444",

  color: "#fff",

  border: "none",

  padding: 16,

  borderRadius: 14,

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: 16

}

const btnCancelar = {

  background:
    "#555",

  color: "#fff",

  border: "none",

  padding: 16,

  borderRadius: 14,

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: 16

}

const whats = {

  width: "100%",

  marginTop: 14,

  background:
    "#25D366",

  color: "#fff",

  border: "none",

  padding: 16,

  borderRadius: 16,

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: 16

}