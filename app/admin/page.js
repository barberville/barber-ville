"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore"

import {
  onAuthStateChanged,
  signOut
} from "firebase/auth"

import { 
  db,
  auth
} from "../../firebase"

import AdminCard from "../../components/AdminCard"

import AgendamentoCard from "../../components/AgendamentoCard"

export default function Admin() {

  const router = useRouter()

  const [usuarioLogado,
  setUsuarioLogado] =
    useState("")

  const [agendamentos,
    setAgendamentos] =
      useState([])

  const [filtro,
    setFiltro] =
      useState("")

  const [pesquisa,
    setPesquisa] =
      useState("")

  const [barbeiroFiltro,
    setBarbeiroFiltro] =
      useState("Todos")

  const [clientesVip,
    setClientesVip] =
      useState([])

  const [abaVip,
    setAbaVip] =
      useState("")

  const [mostrarAgendamentos,
    setMostrarAgendamentos] =
      useState(false)

  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ]

  useEffect(() => {

    setFiltro(
      diasSemana[
        Math.max(
          0,
          new Date().getDay() - 1
        )
      ]
    )

  }, [])

  useEffect(() => {

  const admin =
    localStorage.getItem(
      "adminLogado"
    )

  const daniel =
    localStorage.getItem(
      "danielLogado"
    )

  if (admin) {

    setUsuarioLogado(
      "Breno"
    )

  } else if (daniel) {

    setUsuarioLogado(
      "Daniel"
    )

  }

}, [])

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

            lista.push({
              id: docItem.id,
              ...docItem.data()
            })

          })

        setAgendamentos(lista)

      }

    )

    return () =>
      unsubscribe()

  }, [])

  useEffect(() => {

  const unsubscribe =
    onSnapshot(

      collection(
        db,
        "clientesVip"
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

        setClientesVip(
          lista
        )

      }

    )

  return () =>
    unsubscribe()

}, [])

async function liberarVip(id) {

  try {

    await updateDoc(

      doc(
        db,
        "clientesVip",
        id
      ),

      {

        aprovado: true,

        pagamentoConfirmado: true

      }

    )

    alert(
      "Cliente VIP liberado!"
    )

  } catch (erro) {

    console.log(erro)

    alert(
      "Erro ao liberar VIP."
    )

  }

}

    

  async function excluirAgendamento(id) {

    const confirmar =
      confirm(
        "Deseja cancelar esse agendamento?"
      )

    if (!confirmar) return

    await deleteDoc(
      doc(
        db,
        "agendamentos",
        id
      )
    )

    setAgendamentos(
      agendamentos.filter(
        (item) =>
          item.id !== id
      )
    )

  }

  async function alterarStatus(
    id,
    novoStatus,
    item
  ) {

    await updateDoc(

      doc(
        db,
        "agendamentos",
        id
      ),

      {
        status: novoStatus
      }

    )

    setAgendamentos(

      agendamentos.map(
        (agendamento) => {

          if (
            agendamento.id === id
          ) {

            return {
              ...agendamento,
              status: novoStatus
            }

          }

          return agendamento

        })

    )

    if (
      novoStatus ===
      "concluido"
    ) {

      const listaVip =
        JSON.parse(

          localStorage.getItem(
            "clientesVip"
          ) || "[]"

        )

      const novaListaVip =

        listaVip.map(
          (cliente) => {

            if (

              cliente.nome
                ?.toLowerCase()
                .trim()

              ===

              item.nome
                ?.toLowerCase()
                .trim()

            ) {

              const restantesAtuais =

                Number(
                  cliente.restantes || 4
                )

              const novosRestantes =

                restantesAtuais > 0
                  ? restantesAtuais - 1
                  : 0

              return {

                ...cliente,

                restantes:
                  novosRestantes

              }

            }

            return cliente

          })

      localStorage.setItem(

        "clientesVip",

        JSON.stringify(
          novaListaVip
        )

      )

      setClientesVip(
        novaListaVip
      )

    }

  }

  const agendamentosFiltrados =

    agendamentos

      .filter((item) => {

        const nomeMatch =

          item.nome
            ?.toLowerCase()
            .includes(
              pesquisa.toLowerCase()
            )

        const barbeiroMatch =

          barbeiroFiltro ===
            "Todos"

            ? true

            : item.barbeiro ===
            barbeiroFiltro

        const diaMatch =

          filtro === "Todos"

            ? true

            : item.dia === filtro

        return (
          nomeMatch &&
          barbeiroMatch &&
          diaMatch
        )

      })

      .sort((a, b) => {

        const horarioA =
          a.horario || ""

        const horarioB =
          b.horario || ""

        return horarioA.localeCompare(
          horarioB
        )

      })

  const mesAtual =
    new Date().getMonth() + 1

  const anoAtual =
    new Date().getFullYear()

  const agendamentosMes =
    agendamentos.filter(
      (item) =>

        item.mes === mesAtual &&
        item.ano === anoAtual
    )

  const hojeNome =
    diasSemana[
      Math.max(
        0,
        new Date().getDay() - 1
      )
    ]

  const faturamentoHoje =
  agendamentosMes

    .filter(
      (item) => {

        const barbeiroMatch =

          usuarioLogado === "Breno"

            ? true

            : item.barbeiro ===
              usuarioLogado

        return (

          item.status ===
          "concluido"

          &&

          item.dia ===
          hojeNome

          &&

          barbeiroMatch

        )

      }
    )

    .reduce(
      (acc, item) =>
        acc +
        Number(
          item.total || 0
        ),
      0
    )

  const faturamentoSemana =
  agendamentosMes

    .filter(
      (item) => {

        const barbeiroMatch =

          usuarioLogado === "Breno"

            ? true

            : item.barbeiro ===
              usuarioLogado

        return (

          item.status ===
          "concluido"

          &&

          barbeiroMatch

        )

      }
    )

    .reduce(
      (acc, item) =>
        acc +
        Number(
          item.total || 0
        ),
      0
    )

  const totalClientes =
    agendamentosMes.length

  const totalConcluidos =
    agendamentosMes.filter(
      (item) =>
        item.status ===
        "concluido"
    ).length

  const totalFaltaram =
    agendamentosMes.filter(
      (item) =>
        item.status ===
        "faltou"
    ).length

  const solicitacoes =

  clientesVip.filter(
    (cliente) => {

      const barbeiroMatch =

        usuarioLogado === "Breno"

          ? true

          : cliente.barbeiro ===
            usuarioLogado

      return (

        cliente.pagamentoConfirmado &&
        !cliente.aprovado &&
        barbeiroMatch

      )

    }
  )

  const clientesAtivos =

  clientesVip.filter(
    (cliente) => {

      const barbeiroMatch =

        usuarioLogado === "Breno"

          ? true

          : cliente.barbeiro ===
            usuarioLogado

      return (

        cliente.aprovado &&
        barbeiroMatch

      )

    }
  )

  const clientesAtrasados =

  clientesVip.filter(
    (cliente) => {

      const barbeiroMatch =

        usuarioLogado === "Breno"

          ? true

          : cliente.barbeiro ===
            usuarioLogado

      return (

        cliente.aprovado &&
        !cliente.pagamentoConfirmado &&
        barbeiroMatch

      )

    }
  )

  return (

    <main
      style={{
        minHeight: "100vh",

        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.88)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition:
          "center",

        padding: 20,

        paddingTop: 40,

        color: "white"
      }}
    >

      {/* TOPO */}

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: 40
        }}
      >

        <h1
          style={{
            color: "#d4af37",
            fontSize: 40,
            margin: 0
          }}
        >
          Painel Admin
        </h1>

        <button
          onClick={async () => {

  await signOut(auth)

  localStorage.removeItem(
    "adminLogado"
  )

  localStorage.removeItem(
    "danielLogado"
  )

  window.location.href =
    "/"

}}

          style={{
            background: "#d4af37",

            color: "black",

            border: "none",

            padding:
              "12px 20px",

            borderRadius: 12,

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          Sair
        </button>

      </div>

      {/* MENU VIP */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, 1fr)",

          gap: 10,

          marginBottom: 25
        }}
      >

        <button
          onClick={() =>

            setAbaVip(
              abaVip ===
                "solicitacoes"
                ? ""
                : "solicitacoes"
            )
          }

          style={{
            background:
              abaVip ===
                "solicitacoes"
                ? "#d4af37"
                : "#1f2937",

            color:
              abaVip ===
                "solicitacoes"
                ? "#000"
                : "#fff",

            border: "none",

            padding: "14px",

            borderRadius: 14,

            fontWeight: "bold",

            cursor: "pointer",

            position: "relative"
          }}
        >
          Solicitações

          {solicitacoes.length > 0 && (

            <span
              style={{
                position: "absolute",

                top: -8,

                right: -8,

                background: "#ff0000",

                width: 24,

                height: 24,

                borderRadius: "50%",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                fontSize: 12,

                fontWeight: "bold"
              }}
            >
              {solicitacoes.length}
            </span>

          )}

        </button>

        <button
          onClick={() =>

            setAbaVip(
              abaVip ===
                "ativos"
                ? ""
                : "ativos"
            )
          }

          style={{
            background:
              abaVip ===
                "ativos"
                ? "#d4af37"
                : "#1f2937",

            color:
              abaVip ===
                "ativos"
                ? "#000"
                : "#fff",

            border: "none",

            padding: "14px",

            borderRadius: 14,

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          Clientes Ativos
        </button>

        <button
          onClick={() =>

            setAbaVip(
              abaVip ===
                "atrasados"
                ? ""
                : "atrasados"
            )
          }

          style={{
            background:
              abaVip ===
                "atrasados"
                ? "#d4af37"
                : "#1f2937",

            color:
              abaVip ===
                "atrasados"
                ? "#000"
                : "#fff",

            border: "none",

            padding: "14px",

            borderRadius: 14,

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          Em Atraso
        </button>

      </div>

      {/* CLIENTES VIP */}

      <div
        style={{
          display: "grid",
          gap: 14,
          marginBottom: 40
        }}
      >

        {abaVip ===
          "solicitacoes" &&

          solicitacoes.map(
            (cliente, index) => (

              <div
                key={index}

                style={{
                  background:
                    "rgba(0,0,0,0.45)",

                  border:
                    "1px solid rgba(212,175,55,0.15)",

                  borderRadius: 20,

                  padding: 20
                }}
              >

                <h2
                  style={{
                    color: "#d4af37"
                  }}
                >
                  {cliente.nome}
                </h2>

                <p>
                  💈 {cliente.barbeiro}
                </p>

                <p>
                  👑 {cliente.plano}
                </p>

                <p>
                  🛠️ {cliente.restantes || 4} serviços restantes
                </p>

                <button
                  onClick={() =>
                    liberarVip(cliente.id)
                  }

                  style={{
                    marginTop: 14,

                    background:
                      "#00ff66",

                    color: "#000",

                    border: "none",

                    padding:
                      "12px 18px",

                    borderRadius: 14,

                    fontWeight: "bold",

                    cursor: "pointer"
                  }}
                >
                  🔓 Liberar VIP
                </button>

              </div>

            ))}

        {abaVip ===
          "ativos" &&

          clientesAtivos.map(
            (cliente, index) => (

              <div
                key={index}

                style={{
                  background:
                    "rgba(0,0,0,0.45)",

                  border:
                    "1px solid rgba(212,175,55,0.15)",

                  borderRadius: 20,

                  padding: 20
                }}
              >

                <h2
                  style={{
                    color: "#00ff66"
                  }}
                >
                  {cliente.nome}
                </h2>

                <p>
                  💈 {cliente.barbeiro}
                </p>

                <p>
                  👑 {cliente.plano}
                </p>

                <p>
                  🛠️ {cliente.restantes || 4} serviços restantes
                </p>

                <p>
                  ✅ VIP Liberado
                </p>

              </div>

            ))}

      </div>

      {/* AGENDAMENTOS */}

      <button
        onClick={() =>

          setMostrarAgendamentos(
            !mostrarAgendamentos
          )
        }

        style={{
          width: "100%",

          background:
            mostrarAgendamentos
              ? "#d4af37"
              : "#1f2937",

          color:
            mostrarAgendamentos
              ? "#000"
              : "#fff",

          border: "none",

          padding: "18px",

          borderRadius: 16,

          fontWeight: "bold",

          fontSize: 18,

          cursor: "pointer",

          marginBottom: 20
        }}
      >
        📅 Agendamentos
      </button>

      {mostrarAgendamentos && (

        <>

          {/* FILTROS */}

          <div
            style={{
              display: "flex",

              gap: 10,

              marginBottom: 20,

              flexWrap: "wrap"
            }}
          >

            <input
              type="text"

              placeholder=
              "Pesquisar cliente"

              value={pesquisa}

              onChange={(e) =>
                setPesquisa(
                  e.target.value
                )
              }

              style={{
                flex: 1,

                minWidth: 200,

                padding: 12,

                borderRadius: 10,

                border: "none"
              }}
            />

            <select

              value={barbeiroFiltro}

              onChange={(e) =>
                setBarbeiroFiltro(
                  e.target.value
                )
              }

              style={{
                padding: 12,

                borderRadius: 10,

                border: "none",

                fontWeight: "bold"
              }}
            >

              <option>
                Todos
              </option>

              <option>
                Breno
              </option>

              <option>
                Daniel
              </option>

            </select>

          </div>

          {/* DIAS */}

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
                    setFiltro(dia)
                  }

                  style={{
                    background:
                      filtro === dia
                        ? "#d4af37"
                        : "#6b7280",

                    color: "white",

                    border: "none",

                    padding:
                      "8px 14px",

                    borderRadius: 10,

                    cursor: "pointer",

                    fontWeight: "bold",

                    fontSize: 13
                  }}
                >
                  {dia}
                </button>

              ))}

          </div>

          {/* CARDS */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",

              gap: 14,

              paddingBottom: 20
            }}
          >

            {agendamentosFiltrados.map(
              (item) => (

                <AgendamentoCard
                  key={item.id}

                  item={item}

                  alterarStatus={
                    alterarStatus
                  }

                  excluirAgendamento={
                    excluirAgendamento
                  }
                />

              ))}

          </div>

        </>

      )}

      {/* MENU */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",

          gap: 12,

          marginBottom: 40
        }}
      >

        <AdminCard
          titulo="Serviços"
          descricao="Gerencie serviços."
          onClick={() =>
            router.push(
              "/admin/servicos"
            )
          }
        />

        <AdminCard
          titulo="Barbeiros"
          descricao="Gerencie barbeiros."
          onClick={() =>
            router.push(
              "/admin/barbeiros"
            )
          }
        />

        <AdminCard
          titulo="Horários"
          descricao="Controle horários."
          onClick={() =>
            router.push(
              "/admin/horarios"
            )
          }
        />

        <AdminCard
          titulo="Fotos"
          descricao="Troque fotos."
          onClick={() =>
            router.push(
              "/fotos"
            )
          }
        />

        <AdminCard
          titulo="Produtos"
          descricao="Gerencie produtos."
          onClick={() =>
            router.push(
              "/admin/produtos"
            )
          }
        />

      </div>

      {/* DASHBOARD */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(140px, 1fr))",

          gap: 8
        }}
      >

        <DashboardCard
          titulo="💰 Hoje"
          valor={`R$ ${faturamentoHoje.toFixed(2)}`}
        />

        <DashboardCard
          titulo="📅 Semana"
          valor={`R$ ${faturamentoSemana.toFixed(2)}`}
        />

        <DashboardCard
          titulo="👥 Clientes"
          valor={totalClientes}
        />

        <DashboardCard
          titulo="🟢 Concluídos"
          valor={totalConcluidos}
        />

        <DashboardCard
          titulo="🔴 Faltaram"
          valor={totalFaltaram}
        />

      </div>

    </main>
  )

}

function DashboardCard({
  titulo,
  valor
}) {

  return (

    <div
      style={{
        background:
          "rgba(0,0,0,0.45)",

        padding: 14,

        borderRadius: 16,

        border:
          "1px solid rgba(212,175,55,0.15)"
      }}
    >

      <h3
        style={{
          margin: 0,

          fontSize: 15,

          color: "#ccc"
        }}
      >
        {titulo}
      </h3>

      <h1
        style={{
          color: "#d4af37",

          marginTop: 10,

          marginBottom: 0
        }}
      >
        {valor}
      </h1>

    </div>

  )
}