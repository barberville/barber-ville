"use client"

import {
  useState,
  useEffect
} from "react"

import Link from "next/link"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../firebase"

export default function Servicos() {

  const [
    barbeiroSelecionado,
    setBarbeiroSelecionado
  ] = useState("")

  const [
    servicosSelecionados,
    setServicosSelecionados
  ] = useState([])

  const [
    servicos,
    setServicos
  ] = useState([])

  const [
  planoVip,
  setPlanoVip
] = useState("")

  const [
    carregando,
    setCarregando
  ] = useState(true)

  useEffect(() => {

    async function buscarServicos() {

      try {

        const barbeiroSalvo =
          localStorage.getItem(
            "barbeiroSelecionado"
          )

        if (barbeiroSalvo) {

          setBarbeiroSelecionado(
            barbeiroSalvo
          )

        }

const planoSalvo =
  localStorage.getItem(
    "planoVip"
  )

  console.log("PLANO VIP:", planoSalvo)

if (planoSalvo) {

  setPlanoVip(
    planoSalvo
  )

}

        const querySnapshot =
          await getDocs(
            collection(db, "servicos")
          )

        const lista = []

        querySnapshot.forEach((doc) => {

          const dados = doc.data()

          lista.push({
            id: doc.id,
            nome:
              dados.nome || "",
            preco:
              Number(dados.preco) || 0,
            tempo:
              Number(dados.tempo) || 0
          })

        })

        setServicos(lista)

        if (planoSalvo) {

  const inclusos = []

  lista.forEach((servico) => {

    const nome =
      servico.nome.toLowerCase()

    console.log("VALOR DO PLANO:", planoSalvo)
console.log("TIPO:", typeof planoSalvo)
console.log("NOME SERVIÇO:", nome)


    if (
      planoSalvo === "Plano Prata" &&
      nome.includes("cabelo")
    ) {
      inclusos.push(servico)
    }

    if (
      planoSalvo === "Plano Ouro" &&
      (
        nome.includes("cabelo") ||
        nome.includes("sobrancelha") ||
        nome.includes("barba") ||
        nome.includes("cavanhaque")
      )
    ) {
      inclusos.push(servico)
    }

  })

  setServicosSelecionados(
  inclusos
)

console.log("SERVIÇOS VIP:", inclusos)
}

      } catch (erro) {

        console.log(
          "ERRO:",
          erro
        )

      }

      setCarregando(false)

    }

    buscarServicos()

  }, [])

  function selecionarServico(servico) {

const nome = servico.nome.toLowerCase()

if (
  planoVip === "Plano Prata" &&
  nome.includes("cabelo")
) {
  return
}

if (
  planoVip === "Plano Ouro" &&
  (
    servico.nome.toLowerCase().includes("cabelo") ||
    servico.nome.toLowerCase().includes("barba") ||
    servico.nome.toLowerCase().includes("sobrancelha") ||
    servico.nome.toLowerCase().includes("cavanhaque")
  )
) {
  return
}

    const existe =
      servicosSelecionados.find(
        item =>
          item.id ===
          servico.id
      )

    if (existe) {

      setServicosSelecionados(

        servicosSelecionados.filter(
          item =>
            item.id !==
            servico.id
        )

      )

    } else {

      setServicosSelecionados([
        ...servicosSelecionados,
        servico
      ])

    }

  }

    function salvarServicos() {

  console.log(
    "BARBEIRO:",
    localStorage.getItem("barbeiroSelecionado")
  )

console.log(
  localStorage.getItem("barbeiroSelecionado")
)

    if (
      servicosSelecionados.length === 0
    ) {

      alert(
        "Escolha pelo menos um serviço"
      )

      return

    }

    localStorage.setItem(

      "servicosSelecionados",

      JSON.stringify(
        servicosSelecionados
      )

    )

  }

  const valorTotal =
  servicosSelecionados
    .filter(item => {
      const nome =
        item.nome.toLowerCase()

      if (
        planoVip === "Plano Ouro" &&
        (
          nome.includes("cabelo") ||
          nome.includes("barba") ||
          nome.includes("sobrancelha") ||
          nome.includes("cavanhaque")
        )
      ) {
        return false
      }

      if (
  planoVip === "Plano Prata" &&
  nome.includes("cabelo")
) {
  return false
}

      return true
    })
    .reduce(
      (total, item) =>
        total + item.preco,
      0
    )

let tempoTotal = 0

if (planoVip === "Plano Ouro") {
  tempoTotal = 80
}

tempoTotal += servicosSelecionados
  .filter(item => {
    const nome = item.nome.toLowerCase()

    if (
      planoVip === "Plano Ouro" &&
      (
        nome.includes("cabelo") ||
        nome.includes("barba") ||
        nome.includes("sobrancelha") ||
        nome.includes("cavanhaque")
      )
    ) {
      return false
    }
    
    return true
  })
  .reduce(
    (total, item) =>
      total + item.tempo,
    0
  )

  function pegarIcone(nome = "") {

    const texto =
      nome.toLowerCase()

    if (
      texto.includes("cabelo")
    ) return "✂"

    if (
      texto.includes("barba")
    ) return "🧔"

    if (
      texto.includes("sobrancelha")
    ) return "🔥"

    if (
      texto.includes("pigment")
    ) return "🎨"

    if (
      texto.includes("hidratação")
    ) return "💎"

    return "✂"

  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#070707",
        color: "#fff",
        padding:
          "18px 8px 110px 8px",
        fontFamily: "Arial"
      }}
    >

      <div
        onClick={() =>
          window.history.back()
        }

        style={{
          fontSize: "28px",
          cursor: "pointer",
          marginBottom: "8px",
          color: "#d4af37",
          width: "fit-content"
        }}
      >
        ←
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "#d4af37",
          fontSize: "34px",
          marginBottom: "6px",
          fontWeight: "bold"
        }}
      >
        Barber Ville
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: "0.6",
          marginBottom: "18px",
          fontSize: "13px"
        }}
      >
        Escolha seus serviços
      </p>

      <div
        style={{
          maxWidth: "500px",
          margin:
            "0 auto 20px auto",
          background: "#111",
          border:
            "1px solid rgba(212,175,55,0.08)",
          borderRadius: "18px",
          padding: "14px"
        }}
      >

     <div     
  style={{
    background: "#181818",
    borderRadius: "14px",
    padding: "15px",
    textAlign: "left",
    marginTop: "10px"
  }}

  >

  <h3
    style={{
      color: "#d4af37",
      marginTop: 0
    }}
  >
    Serviços Inclusos
  </h3>

  {planoVip === "Plano Ouro" && (
    <>
      <p>✓ Cabelo</p>
      <p>✓ Barba ou Cavanhaque</p>
      <p>✓ Sobrancelha</p>
    </>
  )}

  {planoVip === "Plano Prata" && (
    <>
      <p>✓ Cabelo</p>
    </>
  )}

  <hr
    style={{
      border: "none",
      borderTop: "1px solid #333"
    }}
  />

  <p>
    Extras: R$ {valorTotal.toFixed(2)}
  </p>

  <p>
    Tempo Total: {tempoTotal} min
  </p>

</div>

</div>

      {carregando ? (

        <p
          style={{
            textAlign: "center",
            opacity: "0.7"
          }}
        >
          Carregando serviços...
        </p>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            maxWidth: "900px",
            margin: "0 auto"
          }}
        >

          {
  servicos
    .filter((servico) => {
      const nome = servico.nome.toLowerCase()

      if (planoVip === "Plano Ouro") {
        return !(
          nome.includes("cabelo") ||
          nome.includes("barba") ||
          nome.includes("sobrancelha") ||
          nome.includes("cavanhaque")
        )
      }

if (planoVip === "Plano Prata") {
  return !nome.includes("cabelo")
}

      return true
    })
    .map((servico) => {

      const ativo =
        servicosSelecionados.find(
          item =>
            item.id === servico.id
        )

            return (

              <div
                key={servico.id}

                onClick={() =>
                  selecionarServico(
                    servico
                  )
                }

                style={{
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent:
                    "space-between",
                  background:
                    ativo
                      ? "rgba(212,175,55,0.12)"
                      : "#111",
                  padding: "12px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  border:
                    ativo
                      ? "1px solid #d4af37"
                      : "1px solid rgba(255,255,255,0.03)"
                }}
              >

                <div>

                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background:
                        "rgba(212,175,55,0.08)",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      fontSize: "18px",
                      marginBottom: "10px"
                    }}
                  >
                    {pegarIcone(
                      servico.nome
                    )}
                  </div>

                  <h2
                    style={{
                      fontSize: "15px",
                      marginBottom:
                        "10px",
                      lineHeight:
                        "18px",
                      color:
                        ativo
                          ? "#d4af37"
                          : "#fff"
                    }}
                  >
                    {servico.nome}
                  </h2>

                </div>

                <div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#d4af37",
                      fontWeight: "bold"
                    }}
                  >
                    💰 R$ {servico.preco}
                  </p>

                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "10px",
                      color: "#aaa"
                    }}
                  >
                    ⏰ {servico.tempo} min
                  </p>

                </div>

              </div>

            )

          })}

        </div>

      )}

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

  onClick={() => {

    salvarServicos()

    console.log(
  "BARBEIRO SALVO:",
  localStorage.getItem(
    "barbeiroSelecionado"
  )
)

    window.location.href =
      "/horario"

  }}

  style={{
    width: "100%",
    background: "#d4af37",
    color: "#000",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Avançar Agendamento
</button>

      </div>

    </main>

  )

}