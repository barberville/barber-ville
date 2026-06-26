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

  const cortes =
  servicos.filter(
    item =>
      item.categoria ===
      "Cortes"
  )

const barba =
  servicos.filter(
    item =>
      item.categoria ===
      "Barba"
  )

const extras =
  servicos.filter(
    item =>
      item.categoria ===
      "Outros Serviços"
  )

console.log("Cortes:", cortes)

console.log("Barba:", barba)

console.log("Extras:", extras)

console.log(servicos)

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

              categoria: dados.categoria || "",
            preco: Number(
  String(dados.preco)
    .replace(",", ".")
) || 0,
            tempo:
              Number(dados.tempo) || 0
          })

        })

        setServicos(lista)

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

    console.log("Selecionados:", servicosSelecionados)

  setServicosSelecionados((anterior) => {

    const existe = anterior.find(
      item => item.id === servico.id
    )

    if (existe) {

      return anterior.filter(
        item => item.id !== servico.id
      )

    }

    return [
      ...anterior,
      servico
    ]

  })

}

  function salvarServicos() {

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
    servicosSelecionados.reduce(
      (total, item) =>
        total + item.preco,
      0
    )

  const tempoTotal =
    servicosSelecionados.reduce(
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
    padding: "18px 8px 110px 8px",
    fontFamily: "Arial",
    overflowX: "hidden"
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

      {/* VIP FIXO */}

<div
  style={{
    position: "sticky",
    top: "10px",
    zIndex: 999,
    marginBottom: "20px"
  }}
>

  <div
    style={{
      maxWidth: "700px",
      margin: "0 auto",

      background:
        "linear-gradient(135deg, #000, #d4af37)",

      backgroundSize: "400% 400%",

      animation:
        "vipPulse 8s ease infinite",

      border:
        "2px solid #d4af37",

      borderRadius: "24px",

      padding: "22px 20px",

      display: "flex",

      alignItems: "center",

      justifyContent: "space-between",

      gap: "18px",

      boxShadow:
        "0 0 30px rgba(212,175,55,0.35)"
    }}
  >

    <div>

      <h2
        style={{
          margin: 0,
          color: "#fff",
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        💈 Barber Ville VIP
      </h2>

      <p
        style={{
          margin: 0,
          marginTop: "6px",
          fontSize: "14px",
          color: "#fff",
          opacity: "0.92",
          lineHeight: "22px"
        }}
      >
        Pague menos nos cortes
        e tenha benefícios exclusivos.
      </p>

    </div>

    <a
      href="/planos"
      style={{
        background: "#fff",
        color: "#000",
        padding: "14px 18px",
        borderRadius: "16px",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "bold",
        whiteSpace: "nowrap"
      }}
    >
      Conhecer
    </a>

  </div>

  <style jsx>{`

    @keyframes vipPulse {

      0% {
        background-position: 0% 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0% 50%;
      }

    }

  `}</style>

</div>

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

        <h2
          style={{
            color: "#d4af37",
            marginBottom: "14px",
            fontSize: "20px",
            textAlign: "center"
          }}
        >
          {barbeiroSelecionado}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "8px"
          }}
        >

          <div
            style={{
              flex: 1,
              background: "#181818",
              borderRadius: "14px",
              padding: "10px",
              textAlign: "center"
            }}
          >

            <p
              style={{
                margin: 0,
                opacity: "0.7",
                fontSize: "10px"
              }}
            >
              Valor
            </p>

            <h2
              style={{
                marginTop: "6px",
                color: "#d4af37",
                fontSize: "18px"
              }}
            >
              R$ {valorTotal.toFixed(2)}
            </h2>

          </div>

          <div
            style={{
              flex: 1,
              background: "#181818",
              borderRadius: "14px",
              padding: "10px",
              textAlign: "center"
            }}
          >

            <p
              style={{
                margin: 0,
                opacity: "0.7",
                fontSize: "10px"
              }}
            >
              Tempo
            </p>

            <h2
              style={{
                marginTop: "6px",
                color: "#d4af37",
                fontSize: "18px"
              }}
            >
              {tempoTotal} min
            </h2>

          </div>

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
<div>
          <div
  style={{
    width: "100%",
    gridColumn: "1 / -1",
    textAlign: "center",
    marginBottom: "20px"
  }}
>
  <h2>CORTES</h2>
</div>

<div
  style={{
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr",
  gap: "12px",
  width: "100%",
  maxWidth: "100%",
  padding: "0 8px",
  boxSizing: "border-box",
  margin: "0 auto"
}}
>
  {cortes.map((servico) => {

  const ativo =
    servicosSelecionados.find(
      item => item.id === servico.id
    )

  return (
    <div
      key={servico.id}
      onClick={() => selecionarServico(servico)}
      style={{
  minHeight: "150px",
  width: "100%",
  minWidth: "0",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
        background: ativo
          ? "rgba(212,175,55,0.12)"
          : "#111",
        padding: "12px",
        borderRadius: "14px",
        cursor: "pointer",
        border: ativo
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
            background: "rgba(212,175,55,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            marginBottom: "10px"
          }}
        >
          {pegarIcone(servico.nome)}
        </div>

        <h2
  style={{
    fontSize: "11px",
    lineHeight: "14px",
    color: ativo ? "#d4af37" : "#fff",
    whiteSpace: "pre-line"
  }}
>
  {servico.nome.replace("/", "/\n")}
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
<div
  style={{
    width: "100%",
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "20px"
  }}
>
  <h2>BARBA</h2>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    width: "100%",
    maxWidth: "100%",
    padding: "0 8px",
    boxSizing: "border-box",
    margin: "0 auto"
  }}
>
  {barba.map((servico) => {
const ativo =
  servicosSelecionados.some(
    item => String(item.id) === String(servico.id)
  )

    return (
      <div
        key={servico.id}
        onClick={() => selecionarServico(servico)}
        style={{
          height: "150px",
          width: "100%",
          minWidth: "0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ativo
            ? "rgba(212,175,55,0.12)"
            : "#111",
          padding: "12px",
          borderRadius: "14px",
          cursor: "pointer",
          outline: "none",
WebkitTapHighlightColor: "transparent",
          border: ativo
  ? "1px solid #d4af37"
  : "none",

        


        }}
      >
        <div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(212,175,55,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              marginBottom: "10px"
            }}
          >
            🧔
          </div>

          <h2
            style={{
              fontSize: "11px",
              lineHeight: "14px",
              color: ativo ? "#d4af37" : "#fff"
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

<div
  style={{
    width: "100%",
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "20px"
  }}
>
  <h2>EXTRAS</h2>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    width: "100%",
    maxWidth: "100%",
    padding: "0 8px",
    boxSizing: "border-box",
    margin: "0 auto"
  }}
>
  {extras.map((servico) => {

    const ativo =
      servicosSelecionados.some(
        item => item.id === servico.id
      )

    return (

      <div
        key={servico.id}
        onClick={() => selecionarServico(servico)}
        style={{
          height: "150px",
          width: "100%",
          minWidth: "0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ativo
            ? "rgba(212,175,55,0.12)"
            : "#111",
          padding: "12px",
          borderRadius: "14px",
          cursor: "pointer",
          border: ativo
            ? "1px solid #d4af37"
            : "none"
        }}
      >

        <div>

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(212,175,55,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              marginBottom: "10px"
            }}
          >
            🔥
          </div>

          <h2
            style={{
              fontSize: "11px",
              lineHeight: "14px",
              color: ativo ? "#d4af37" : "#fff"
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

<div
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "10px",
    background: "rgba(0,0,0,0.95)"
  }}
>

        <Link href="/horario">

          <button

            onClick={
              salvarServicos
            }

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

        </Link>

      </div>
      </div>
)}
    </main>

  );

}