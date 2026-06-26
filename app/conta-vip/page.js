"use client"

import { useEffect, useState } from "react"

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"

import { db } from "../../firebase"

export default function ContaVip() {

  const [nome, setNome] =
    useState("")

  const [barbeiro, setBarbeiro] =
    useState("")

  const [plano, setPlano] =
    useState("")

  const [emailCliente,
    setEmailCliente] =
      useState("")

  const [clienteData,
    setClienteData] =
      useState(null)

  const [pagamentoConfirmado,
    setPagamentoConfirmado] =
      useState(false)

  const [mostrarPagamento,
    setMostrarPagamento] =
      useState(false)

  const [vipAprovado,
    setVipAprovado] =
      useState(false)

  const [restantes,
    setRestantes] =
      useState(4)

  const [vencimento,
  setVencimento] =
    useState("")

  const [diasRestantes,
  setDiasRestantes] =
    useState(0)

  const [vipVencido,
  setVipVencido] =
    useState(false)    

  const totalAtendimentos = 4

  const porcentagem =

    ((totalAtendimentos - restantes)
    / totalAtendimentos) * 100

  const valorPlano =
    plano === "Plano Ouro"
      ? "R$ 149,90"
      : "R$ 99,90"

  useEffect(() => {

  async function carregarCliente() {

    const emailLogado =

      localStorage.getItem(
        "clienteVipLogado"
      )

      console.log(
  "EMAIL SALVO:",
  emailLogado
)

    if (!emailLogado) {

      window.location.href =
        "/login-vip"

      return
    }

   const q = query(
  collection(db, "clientesVip"),
  where("email", "==", emailLogado.trim())
)

console.log("EMAIL LOGIN:", emailLogado)


const querySnapshot =
  await getDocs(q)

console.log(
  "QUANTIDADE DE DOCUMENTOS:",
  querySnapshot.docs.length
)

if (querySnapshot.empty) {

  alert(
    "Cliente não encontrado."
  )

  window.location.href =
    "/login-vip"

  return
}

const cliente =
  querySnapshot.docs[0].data()

  console.log(
  "CLIENTE CARREGADO:",
  cliente
)

  setClienteData(cliente)

    if (!cliente) {

      alert(
        "Cliente não encontrado."
      )

      window.location.href =
        "/login-vip"

      return
    }

    setNome(
      cliente.nome || ""
    )

    setBarbeiro(
      cliente.barbeiro || ""
    )

localStorage.setItem(
  "barbeiroSelecionado",
  cliente.barbeiro || ""
)

    setPlano(
      cliente.plano || ""
    )

    localStorage.setItem(
  "planoVip",
  cliente.plano || ""
)

    setRestantes(
      cliente.restantes ?? 4
    )

    setVipAprovado(
      cliente.aprovado || false
    )

    setEmailCliente(
      cliente.email || ""
    )

    console.log("CLIENTE:", cliente)
console.log("EMAIL FIREBASE:", cliente.email)

    setPagamentoConfirmado(
      cliente.pagamentoConfirmado || false
    )

    setVencimento(
      cliente.vencimento || ""
    )

    if (cliente.vencimento) {

      const hoje = new Date()

let proximoDia5 = new Date(
  hoje.getFullYear(),
  hoje.getMonth(),
  5
)

if (hoje.getDate() > 5) {

  proximoDia5 = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + 1,
    5
  )

}

const diferenca =
  proximoDia5 - hoje

const dias = Math.ceil(
  diferenca /
  (1000 * 60 * 60 * 24)
)

      setDiasRestantes(dias)

      if (dias <= 0) {

        setVipVencido(true)

      }

    }
  
  }

    carregarCliente()

  }, [] )

    function falarWhatsapp() {

  const numero =

    barbeiro === "Daniel"
      ? "5583999999999"
      : "5583991161032"

  window.open(
    `https://wa.me/${numero}`,
    "_blank"
  )
}

  async function confirmarPagamento() {

  try {

    const hoje =
      new Date()

    const dia =
      hoje.getDate()

    let valor = 99.90

    // PLANO OURO

    if (plano === "Plano Ouro") {

      if (dia >= 28) {

        valor = 50

      }

      else if (dia >= 21) {

        valor = 85

      }

      else if (dia >= 14) {

        valor = 125

      }

      else {

        valor = 149.90

      }

    }

    // PLANO PRATA

    else {

      if (dia >= 28) {

        valor = 30

      }

      else if (dia >= 21) {

        valor = 55

      }

      else if (dia >= 14) {

        valor = 85

      }

      else {

        valor = 99.90

      }

    }

    // GERAR PAGAMENTO PIX

if (!emailCliente) {

  alert("Email do cliente não encontrado")

  return

}
console.log("CLICOU NO BOTÃO")

const resposta = await fetch(
  "/api/mercadopago",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

  descricao: "Plano VIP",

  valor: valor,

  email:
    emailCliente

})
  }
)
console.log("RESPOSTA:", resposta)

    const data =
  await resposta.json()

console.log(data)

console.log(
  "PAYMENT ID:",
  data.payment_id
)

    // VALIDAR PIX

  if (
  data.qr_code &&
  data.qr_code_base64
) {

  const qr = {
  payment_id: data.payment_id,
  qr_code: data.qr_code,
  qr_code_base64: data.qr_code_base64
}
  localStorage.setItem(
  "pixQrCode",
  qr.qr_code_base64
)

localStorage.setItem(
  "pixCopiaCola",
  qr.qr_code
)

localStorage.setItem(
  "paymentId",
  data.payment_id
)

window.location.href =
  "/pagamento-vip"

} else {

  console.log(data)

  alert(
    "PIX não retornou corretamente"
  )

}

  }

  catch (erro) {

    console.log(erro)

    alert(
      "Erro ao gerar pagamento."
    )

  }

}

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(rgba(0,0,0,0.93), rgba(0,0,0,0.97)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        padding: "20px 14px 60px 14px",

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

    marginBottom: "20px"
  }}
>

  <div />

  <button
    onClick={() => {

      localStorage.removeItem(
        "clienteVipLogado"
      )

      window.location.href =
        "/login-vip"

    }}

    style={{
      background:
        "rgba(255,255,255,0.08)",

      color: "#fff",

      border:
        "1px solid rgba(255,255,255,0.10)",

      padding: "10px 16px",

      borderRadius: "14px",

      cursor: "pointer",

      fontWeight: "bold"
    }}
  >
    Sair
  </button>

</div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "24px"
        }}
      >

        <div
          style={{
            width: "100px",
            height: "100px",

            margin: "0 auto",

            borderRadius: "50%",

            padding: "4px",

            background:
              "linear-gradient(45deg,#d4af37,#ffdf70,#d4af37)",

            boxShadow:
              "0 0 25px rgba(212,175,55,0.40)"
          }}
        >

          <img
            src="/logo.png"

            style={{
              width: "100%",
              height: "100%",

              objectFit: "cover",

              borderRadius: "50%"
            }}
          />

        </div>

        <h1
          style={{
            color: "#d4af37",

            fontSize: "42px",

            marginTop: "16px",

            marginBottom: "6px"
          }}
        >
          Área VIP
        </h1>

        <p
          style={{
            color: "#ccc",
            fontSize: "16px"
          }}
        >
          Bem-vindo,

          {" "}

          <span
            style={{
              color: "#d4af37",
              fontWeight: "bold"
            }}
          >
            {nome}
          </span>

        </p>

      </div>

      {/* CONTEÚDO */}

      <div
        style={{
          maxWidth: "700px",

          margin: "0 auto",

          background:
            "rgba(0,0,0,0.72)",

          border:
            "1px solid rgba(212,175,55,0.15)",

          borderRadius: "30px",

          padding: "16px"
        }}
      >

        {/* STATUS */}

        <div
          style={{
            background:

              vipVencido
                ? "#ff3b30"

              : vipAprovado
                ? "#00ff66"
                : pagamentoConfirmado
                ? "#ffaa00"
                : "#ffd000",

            color: "#000",

            padding: "14px",

            borderRadius: "999px",

            textAlign: "center",

            fontWeight: "bold",

            marginBottom: "18px",

            fontSize: "16px"
          }}
        >

          {vipVencido
            ? "❌ VIP VENCIDO"

            : vipAprovado
            ? "VIP ATIVO 👑"
            : pagamentoConfirmado
            ? "⏳ AGUARDANDO LIBERAÇÃO"
            : "AGUARDANDO PAGAMENTO 💳"}

        </div>

{vipVencido && (

  <div
    style={{
      marginTop: "20px"
    }}
  >

    <button
      onClick={confirmarPagamento}

      style={{
        width: "100%",

        background:
          "linear-gradient(90deg,#ff3b30,#ff6b60)",

        color: "#fff",

        padding: "18px",

        borderRadius: "20px",

        border: "none",

        fontWeight: "bold",

        fontSize: "18px",

        cursor: "pointer"
      }}
    >
      🔄 Renovar VIP
    </button>

  </div>

)}

{/* GRID */}

        {/* GRID */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap: "14px"
          }}
        >

          {/* BARBEIRO */}

          <div style={card}>

            <p style={label}>
              Seu barbeiro
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >

              <img
  src={
    barbeiro === "Daniel"
      ? "/daniel.jpeg"
      : "/breno.jpeg"
  }

                style={{
                  width: "42px",
                  height: "42px",

                  borderRadius: "50%",

                  objectFit: "cover",

                  border:
                    "2px solid #d4af37"
                }}
              />

              <h2 style={value}>
                {barbeiro}
              </h2>

            </div>

          </div>

          {/* PLANO */}

          <div style={card}>

            <p style={label}>
              Seu plano
            </p>

            <h2 style={value}>
              👑 {plano}
            </h2>

          </div>

          {/* SERVIÇOS */}

          <div style={card}>

            <p style={label}>
              Serviços restantes
            </p>

            <h2 style={value}>
  ✂️ {restantes} {restantes === 1 ? "corte disponível" : "cortes disponíveis"}
</h2>

            <div
              style={{
                marginTop: "6px"
              }}
            >

              <div
                style={{
                  height: "8px",

                  width: "100%",

                  background:
                    "rgba(255,255,255,0.08)",

                  borderRadius: "999px",

                  overflow: "hidden"
                }}
              >

                <div
                  style={{
                    height: "100%",

                    width:
                      `${porcentagem}%`,

                    background:
                      "linear-gradient(90deg,#d4af37,#ffdf70)"
                  }}
                />

              </div>

              <p
                style={{
                  color: "#999",

                  fontSize: "12px",

                  marginTop: "6px"
                }}
              >
                {totalAtendimentos - restantes}
                {" "}de{" "}
                {totalAtendimentos}
                {" "}utilizados
              </p>

            </div>

          </div>

          {/* RENOVAÇÃO */}

          <div style={card}>

            <p style={label}>
              Renovação
            </p>

            <h2 style={value}>
              📅 {diasRestantes} dias
            </h2>

            {diasRestantes <= 5 &&
 !vipVencido && (

  <p
    style={{
      color: "#ff3b30",

      marginTop: "10px",

      fontSize: "13px",

      lineHeight: "22px"
    }}
  >
    ⚠️ 👑 Sua renovação está próxima.
Garanta a continuidade do seu plano VIP.
  </p>

)}

          </div>

        </div>

        {/* PAGAMENTO */}

        {!vipAprovado && (

          <div
            style={{
              marginTop: "28px"
            }}
          >

            {!pagamentoConfirmado && (

              <button
  onClick={confirmarPagamento}
  style={button}
>
  Finalizar pagamento
</button>
            )}

            {!pagamentoConfirmado &&
             mostrarPagamento && (

              <div style={infoCard}>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "20px"
                  }}
                >

                  <p
                    style={{
                      color: "#aaa"
                    }}
                  >
                    Valor do plano
                  </p>

                  <h2
                    style={{
                      color: "#d4af37",
                      fontSize: "34px"
                    }}
                  >
                    {valorPlano}
                  </h2>

                </div>

                <img
  src={`data:image/png;base64,${localStorage.getItem("pixQrCode")}`}
  alt="QR Code Pix"
  style={{
    width: "190px",
    height: "190px",
    objectFit: "cover",
    display: "block",
    margin: "0 auto",
    borderRadius: "18px"
  }}
/>

                <div
                  style={{
                    background: "#111",

                    padding: "15px",

                    borderRadius: "18px",

                    textAlign: "center",

                    marginBottom: "20px"
                  }}
                >

                  <p
                    style={{
                      color: "#aaa"
                    }}
                  >
                    Chave Pix
                  </p>

                  <h3
                    style={{
                      color: "#d4af37",

                      wordBreak: "break-all"
                    }}
                  >
                    {localStorage.getItem("pixCopiaCola")}
                  </h3>

                </div>

                <button
                  onClick={confirmarPagamento}
                  style={button}
                >
                  Já realizei o pagamento
                </button>

              </div>

            )}

            {pagamentoConfirmado &&
             !vipAprovado && (

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <div
                  style={{
                    background:
                      "rgba(255,170,0,0.12)",

                    border:
                      "1px solid rgba(255,170,0,0.25)",

                    borderRadius: "20px",

                    padding: "20px",

                    textAlign: "center"
                  }}
                >

                  <h2
                    style={{
                      color: "#ffaa00"
                    }}
                  >
                    🔒 Aguardando aprovação
                  </h2>

                  <p
                    style={{
                      color: "#ccc",

                      lineHeight: "28px",

                      marginTop: "10px"
                    }}
                  >
                    Seu comprovante foi enviado
                    para análise do administrador.

                    Assim que o pagamento for
                    confirmado, seu acesso VIP
                    será liberado automaticamente.
                  </p>

                </div>

              </div>

            )}

          </div>

        )}

        {/* AGENDAMENTO */}

        {vipAprovado &&
 restantes > 0 &&
 !vipVencido && (

          <div
            style={{
              marginTop: "28px"
            }}
          >

           <button
  onClick={() => {

    console.log(
      "BARBEIRO VIP:",
      barbeiro
    )

    localStorage.setItem(
      "barbeiroSelecionado",
      barbeiro
    )

    window.location.href =
      "/servicos-vip"

  }}

              style={{
                width: "100%",

                background:
                  "linear-gradient(90deg,#d4af37,#ffdf70)",

                color: "#000",

                padding: "20px",

                borderRadius: "20px",

                border: "none",

                fontWeight: "bold",

                fontSize: "20px",

                cursor: "pointer"
              }}
            >
              📅 Agendar Agora
            </button>

{restantes <= 0 && (

  <div
    style={{
      marginTop: "18px",

      background:
        "rgba(255,59,48,0.12)",

      border:
        "1px solid rgba(255,59,48,0.25)",

      borderRadius: "20px",

      padding: "18px",

      textAlign: "center"
    }}
  >

    <h2
      style={{
        color: "#ff3b30"
      }}
    >
      ❌ Serviços encerrados
    </h2>

    <p
      style={{
        color: "#ccc",

        marginTop: "10px",

        lineHeight: "28px"
      }}
    >
      Você utilizou todos os serviços
      do seu plano VIP.
    </p>

  </div>

)}

          </div>

        )}

        {/* WHATSAPP */}

        <div
          style={{
            marginTop: "18px"
          }}
        >

          <button
            onClick={falarWhatsapp}

            style={{
              ...button,

              background:
                "#25D366",

              color: "#fff"
            }}
          >
            Falar com meu barbeiro
          </button>

        </div>

        {/* COMO FUNCIONA */}

        <div
          style={{
            marginTop: "30px"
          }}
        >

          <h2
            style={{
              color: "#d4af37",

              marginBottom: "18px",

              fontSize: "26px",

              textAlign: "center"
            }}
          >
            Como funciona seu VIP 👑
          </h2>

          <div style={infoCard}>

            <div style={topico}>

              <h3 style={titulo}>
                💈 Plano vinculado ao barbeiro
              </h3>

              <p style={descricao}>
                Seu plano VIP fica vinculado exclusivamente ao barbeiro escolhido no momento da assinatura.
              </p>

            </div>

            <div style={topico}>

              <h3 style={titulo}>
                🛠️ Serviços inclusos
              </h3>

              <p style={descricao}>
                O plano VIP inclui até 4 serviços mensais.
              </p>

            </div>

            <div style={topico}>

              <h3 style={titulo}>
                📅 Renovação do plano
              </h3>

              <p style={descricao}>
                A renovação acontece todo dia 5.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

const card = {

  background:
    "linear-gradient(180deg, rgba(212,175,55,0.07), rgba(0,0,0,0.95))",

  border:
    "1px solid rgba(212,175,55,0.10)",

  borderRadius: "24px",

  padding: "18px",

  minHeight: "140px",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  gap: "10px"
}

const label = {

  color: "#aaa",

  marginBottom: "6px",

  fontSize: "14px"
}

const value = {

  color: "#d4af37",

  margin: 0,

  fontSize: "22px",

  fontWeight: "bold",

  lineHeight: "30px"
}

const button = {

  width: "100%",

  background: "#d4af37",

  color: "#000",

  padding: "16px",

  borderRadius: "18px",

  border: "none",

  fontWeight: "bold",

  fontSize: "16px",

  cursor: "pointer"
}

const infoCard = {

  background:
    "rgba(212,175,55,0.06)",

  border:
    "1px solid rgba(212,175,55,0.12)",

  borderRadius: "24px",

  padding: "18px",

  lineHeight: "26px",

  marginTop: "20px"
}

const topico = {

  marginBottom: "24px"
}

const titulo = {

  color: "#d4af37",

  marginBottom: "8px",

  fontSize: "18px"
}

const descricao = {

  color: "#ccc",

  lineHeight: "28px",

  fontSize: "15px"
}