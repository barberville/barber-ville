"use client"

import { useEffect, useState } from "react"

import { db } from "../../firebase"

import { salvarAgendamento } from "../../lib/agendamentos"

import {
  collection,
  getDocs,
  query,
  where,
  runTransaction,
  doc
} from "firebase/firestore"

export default function Confirmacao() {

  const [nome, setNome] =
    useState("")

  const [telefone, setTelefone] =
    useState("")

  const [barbeiro, setBarbeiro] =
    useState("")

  const [dia, setDia] =
    useState("")

  const [hora, setHora] =
    useState("")

  const [servicos, setServicos] =
    useState([])

  const [produtos, setProdutos] =
    useState([])

  const [
    produtosSelecionados,
    setProdutosSelecionados
  ] = useState([])

  const [total, setTotal] =
    useState(0)

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {

  async function carregarDados() {

    if (
      localStorage.getItem(
        "agendamentoConcluido"
      ) === "sim"
    ) {

      localStorage.removeItem(
        "agendamentoConcluido"
      )

      window.location.href = "/"

      return
    }

    const nomeSalvo =
      localStorage.getItem(
        "clienteNome"
      ) || ""

      const telefoneSalvo =
        localStorage.getItem(
          "clienteTelefone"
        ) || ""

      const barbeiroSalvo =
        localStorage.getItem(
          "barbeiroSelecionado"
        ) || ""

      const diaSalvo =
        localStorage.getItem(
          "diaSelecionado"
        ) || ""

      const horaSalva =
        localStorage.getItem(
          "horarioSelecionado"
        ) || ""

      const servicosSalvos =
        JSON.parse(
          localStorage.getItem(
            "servicosSelecionados"
          )
        ) || []

      setNome(nomeSalvo)

      setTelefone(
        telefoneSalvo
      )

      setBarbeiro(
        barbeiroSalvo
      )

      setDia(
        diaSalvo
      )

      console.log("DIA DO LOCALSTORAGE:", diaSalvo)
console.log("HORA DO LOCALSTORAGE:", horaSalva)

      setHora(
        horaSalva
      )

      setServicos(
        servicosSalvos
      )

      const soma =
        servicosSalvos.reduce(
          (acc, item) =>
            acc + Number(item.preco),
          0
        )

      setTotal(soma)

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "produtos"
          )
        )

      const lista = []

      querySnapshot.forEach((doc) => {

        lista.push({
          id: doc.id,
          ...doc.data()
        })

      })

      setProdutos(lista)

    }

    carregarDados()

  }, [])

  function selecionarProduto(
    produto
  ) {

    const existe =
      produtosSelecionados.find(
        item =>
          item.nome ===
          produto.nome
      )

    let novaLista = []

    if (existe) {

      novaLista =
        produtosSelecionados.filter(
          item =>
            item.nome !==
            produto.nome
        )

    } else {

      novaLista = [
        ...produtosSelecionados,
        produto
      ]

    }

    setProdutosSelecionados(
      novaLista
    )

    const totalServicos =
      servicos.reduce(
        (acc, item) =>
          acc + Number(item.preco),
        0
      )

    const totalProdutos =
      novaLista.reduce(
        (acc, item) =>
          acc + Number(item.preco),
        0
      )

    setTotal(
      totalServicos +
      totalProdutos
    )

  }

  
async function confirmarAgendamento() {

if (loading) return

try {

setLoading(true)
console.log(
  "DATA QUE VAI PRO FIREBASE:",
  localStorage.getItem("dataSelecionada")
)

const q = query(
  collection(db, "agendamentos"),
  where("barbeiro", "==", barbeiro),
  where("dataAgendamento", "==", localStorage.getItem("dataSelecionada")),
  where("hora", "==", hora),
  where("status", "==", "agendado")
)

const resultado = await getDocs(q)

if (!resultado.empty) {
  alert("Este horário acabou de ser reservado. Escolha outro horário.")
  setLoading(false)
  return
}

await salvarAgendamento({
    nome,
    whatsapp: telefone,
    barbeiro,
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),

    dataCriacao: new Date().toISOString(),

    dia,
    hora,
    dataAgendamento:
  localStorage.getItem(
    "dataSelecionada"
  ),
    servicos,
    produtos: produtosSelecionados,
    total,
    status: "agendado"
  }
)
const mensagem = `

Olá, ${barbeiro}!

Meu agendamento foi realizado com sucesso pela Barber Ville.

DADOS DO AGENDAMENTO

Nome: ${nome}
Telefone: ${telefone}

Dia: ${dia}
Horário: ${hora}

Serviços: ${servicos.map(item => item.nome).join(", ")}

Produtos: ${
  produtosSelecionados.length > 0
    ? produtosSelecionados.map(item => item.nome).join(", ")
    : "Nenhum"
}

Total: R$ ${total}

Até breve!
`

let numeroWhatsApp = ""
if (barbeiro === "Breno") {
  numeroWhatsApp =
    "5583991161032"
} else if (
  barbeiro === "Daniel"
) {
  numeroWhatsApp =
    "5583993793911"
}
localStorage.removeItem(
  "servicosSelecionados"
)
localStorage.removeItem(
  "horarioSelecionado"
)
localStorage.removeItem(
  "diaSelecionado"
)
localStorage.removeItem(
  "barbeiroSelecionado"
)
localStorage.setItem(
  "agendamentoConcluido",
  "sim"
)
window.location.href =
  `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`

} catch (erro) {

console.log(erro)
alert(
  "Erro ao confirmar agendamento"
)

} finally {

setLoading(false)

}

}

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "#070707",

        color: "#fff",

        padding:
          "12px 12px 100px 12px",

        fontFamily:
          "Arial"
      }}
    >

      {/* VOLTAR */}

      <div
        onClick={() =>
          window.history.back()
        }

        style={{
          fontSize: "26px",
          cursor: "pointer",
          marginBottom: "8px",
          color: "#d4af37",
          width: "fit-content"
        }}
      >
        ←
      </div>

      {/* TÍTULO */}

      <h1
        style={{
          textAlign: "center",

          color: "#d4af37",

          fontSize: "30px",

          marginBottom: "5px"
        }}
      >
        Confirmar Agendamento
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: "0.6",
          marginBottom: "15px",
          fontSize: "13px"
        }}
      >
        Confira seus dados
      </p>

      {/* DADOS */}

      <div
        style={{
          background:
            "#111",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "18px",

          padding: "14px",

          marginBottom: "14px"
        }}
      >

        <div
          style={{
            display: "grid",
            gap: "8px"
          }}
        >

          <div
            style={{
              background:
                "#1a1a1a",

              padding: "10px",

              borderRadius: "12px",

              fontSize: "13px"
            }}
          >
            👤 {nome}
          </div>

          <div
            style={{
              background:
                "#1a1a1a",

              padding: "10px",

              borderRadius: "12px",

              fontSize: "13px"
            }}
          >
            📞 {telefone}
          </div>

          <div
            style={{
              background:
                "#1a1a1a",

              padding: "10px",

              borderRadius: "12px",

              fontSize: "13px"
            }}
          >
            💈 {barbeiro}
          </div>

          <div
            style={{
              background:
                "#1a1a1a",

              padding: "10px",

              borderRadius: "12px",

              fontSize: "13px"
            }}
          >
            📅 {dia}
          </div>

          <div
            style={{
              background:
                "#1a1a1a",

              padding: "10px",

              borderRadius: "12px",

              fontSize: "13px"
            }}
          >
            ⏰ {hora}
          </div>

        </div>

      </div>

      {/* SERVIÇOS */}

      <div
        style={{
          background:
            "#111",

          borderRadius: "18px",

          padding: "12px",

          marginBottom: "14px",

          border:
            "1px solid rgba(255,255,255,0.05)"
        }}
      >

        <h2
          style={{
            color: "#d4af37",
            marginBottom: "10px",
            fontSize: "16px"
          }}
        >
          Serviços
        </h2>

        {servicos.map((s, i) => (

          <div
            key={i}

            style={{
              display: "flex",

              justifyContent:
                "space-between",

              background:
                "#1a1a1a",

              padding: "8px",

              borderRadius: "10px",

              marginBottom: "6px",

              fontSize: "12px"
            }}
          >

            <span>
              ✂️ {s.nome}
            </span>

            <strong
              style={{
                color: "#d4af37"
              }}
            >
              R$ {s.preco}
            </strong>

          </div>

        ))}

      </div>

      {/* PRODUTOS */}

      <div
        style={{
          marginBottom: "16px"
        }}
      >

        <h2
          style={{
            color: "#d4af37",
            marginBottom: "14px",
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          Produtos adicionais
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "10px"
          }}
        >

          {produtos.map(
            (produto) => {

            const ativo =
              produtosSelecionados.find(
                item =>
                  item.nome ===
                  produto.nome
              )

            return (

              <div
                key={produto.id}

                onClick={() =>
                  selecionarProduto(
                    produto
                  )
                }

                style={{

                  background:
                    ativo
                      ? "rgba(212,175,55,0.10)"
                      : "#111",

                  border:

                    ativo

                    ? "1px solid #d4af37"

                    : "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "18px",

                  overflow: "hidden",

                  cursor: "pointer",

                  transition: "0.2s",

                  position: "relative"
                }}
              >

                {ativo && (

                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",

                      background:
                        "#d4af37",

                      color: "#000",

                      padding:
                        "4px 8px",

                      borderRadius: "30px",

                      fontSize: "10px",

                      fontWeight: "bold",

                      zIndex: 2
                    }}
                  >
                    Selecionado
                  </div>

                )}

                <img
                  src={produto.imagem}

                  alt={produto.nome}

                  style={{
                    width: "100%",
                    height: "130px",
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    padding: "10px"
                  }}
                >

                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: "5px",
                      fontSize: "14px",
                      lineHeight: "18px"
                    }}
                  >
                    {produto.nome}
                  </h3>

                  <p
                    style={{
                      opacity: "0.6",
                      fontSize: "11px",
                      lineHeight: "15px",
                      marginBottom: "8px",
                      minHeight: "32px"
                    }}
                  >
                    {produto.descricao}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#d4af37",
                      fontWeight: "bold",
                      fontSize: "15px"
                    }}
                  >
                    R$ {produto.preco}
                  </p>

                </div>

              </div>

            )

          })}

        </div>

      </div>

      {/* TOTAL */}

      <div
        style={{
          background:
            "#111",

          padding: "14px",

          borderRadius: "18px",

          marginBottom: "20px",

          border:
            "1px solid rgba(255,255,255,0.05)"
        }}
      >

        <p
          style={{
            margin: 0,
            opacity: "0.6",
            fontSize: "13px"
          }}
        >
          Valor total
        </p>

        <h1
          style={{
            marginTop: "6px",
            color: "#d4af37",
            marginBottom: 0,
            fontSize: "28px"
          }}
        >
          R$ {total}
        </h1>

      </div>

      {/* BOTÃO */}

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

        <button

          onClick={
            confirmarAgendamento
          }

          disabled={loading}

          style={{
            width: "100%",

            background:
              "#d4af37",

            color: "#000",

            border: "none",

            padding: "16px",

            borderRadius: "16px",

            fontSize: "17px",

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          {
            loading

            ? "Confirmando..."

            : "Confirmar Agendamento"
          }
        </button>

      </div>

    </main>

  )

}