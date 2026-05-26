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

import { db } from "../../../firebase"

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

  useEffect(() => {

    async function buscarServicos() {

      const barbeiroSalvo =
        localStorage.getItem(
          "barbeiroSelecionado"
        )

      if (!barbeiroSalvo) return

      setBarbeiroSelecionado(
        barbeiroSalvo
      )

      const querySnapshot =
        await getDocs(
          collection(db, "servicos")
        )

      const lista = []

      querySnapshot.forEach((doc) => {

        lista.push({
          id: doc.id,
          ...doc.data()
        })

      })

      setServicos(lista)

    }

    buscarServicos()

  }, [])

  function selecionarServico(servico) {

    const existe =
      servicosSelecionados.find(
        item =>
          item.nome ===
          servico.nome
      )

    if (existe) {

      setServicosSelecionados(

        servicosSelecionados.filter(
          item =>
            item.nome !==
            servico.nome
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
        total + Number(item.preco),
      0
    )

  const tempoTotal =
    servicosSelecionados.reduce(
      (total, item) =>
        total + Number(item.tempo),
      0
    )

  return (

    <main
      style={{
        minHeight: "100vh",

        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.92), rgba(0,0,0,0.96)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

        color: "#fff",

        padding: "30px 15px 130px 15px",

        fontFamily: "Arial"
      }}
    >

      <div
        onClick={() =>
          window.history.back()
        }

        style={{
          fontSize: "38px",
          cursor: "pointer",
          marginBottom: "10px",
          color: "#f5d76e",
          width: "fit-content"
        }}
      >
        ←
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "#f5d76e",
          fontSize: "45px",
          marginBottom: "10px",
          fontWeight: "bold",
          textShadow:
            "0 0 25px rgba(245,215,110,0.35)"
        }}
      >
        Barber Ville
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: "0.75",
          marginBottom: "25px",
          fontSize: "17px"
        }}
      >
        Escolha seus serviços premium ✂️
      </p>

      <div
        style={{
          maxWidth: "550px",
          margin: "0 auto 40px auto",

          background:
            "rgba(15,15,15,0.82)",

          border:
            "1px solid rgba(245,215,110,0.20)",

          borderRadius: "25px",

          padding: "22px",

          backdropFilter:
            "blur(8px)",

          boxShadow:
            "0 12px 35px rgba(0,0,0,0.45)"
        }}
      >

        <h2
          style={{
            color: "#25D366",
            marginBottom: "18px",
            fontSize: "28px",
            textAlign: "center"
          }}
        >
          👤 {barbeiroSelecionado}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",

            gap: "12px"
          }}
        >

          <div
            style={{
              flex: 1,

              background:
                "rgba(37,211,102,0.12)",

              border:
                "1px solid rgba(37,211,102,0.35)",

              borderRadius: "18px",

              padding: "16px",

              textAlign: "center"
            }}
          >

            <p
              style={{
                margin: 0,
                opacity: "0.7"
              }}
            >
              Total
            </p>

            <h2
              style={{
                marginTop: "10px",
                color: "#25D366",
                fontSize: "32px"
              }}
            >
              R$ {valorTotal.toFixed(2)}
            </h2>

          </div>

          <div
            style={{
              flex: 1,

              background:
                "rgba(245,215,110,0.10)",

              border:
                "1px solid rgba(245,215,110,0.35)",

              borderRadius: "18px",

              padding: "16px",

              textAlign: "center"
            }}
          >

            <p
              style={{
                margin: 0,
                opacity: "0.7"
              }}
            >
              Tempo
            </p>

            <h2
              style={{
                marginTop: "10px",
                color: "#f5d76e",
                fontSize: "32px"
              }}
            >
              {tempoTotal} min
            </h2>

          </div>

        </div>

      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",

          gap: "18px",

          maxWidth: "1400px",

          margin: "0 auto"
        }}
      >

        {servicos.map(
          (servico, index) => {

          const ativo =
            servicosSelecionados.find(
              item =>
                item.nome ===
                servico.nome
            )

          return (

            <div
              key={index}

              onClick={() =>
                selecionarServico(
                  servico
                )
              }

              style={{

                minHeight: "280px",

                display: "flex",

                flexDirection: "column",

                justifyContent:
                  "space-between",

                background:
                  ativo
                    ? "linear-gradient(145deg, #f5d76e, #d9b84f)"
                    : "rgba(17,17,17,0.86)",

                color:
                  ativo
                    ? "#111"
                    : "#fff",

                padding: "20px",

                borderRadius: "24px",

                cursor: "pointer",

                transition: "0.35s",

                border:
                  ativo
                    ? "2px solid #f5d76e"
                    : "1px solid rgba(255,255,255,0.08)",

                backdropFilter:
                  "blur(6px)",

                transform:
                  ativo
                    ? "scale(1.04)"
                    : "scale(1)",

                boxShadow:
                  ativo
                    ? "0 0 35px rgba(245,215,110,0.45)"
                    : "0 10px 25px rgba(0,0,0,0.35)"
              }}
            >

              <div>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    marginBottom: "18px"
                  }}
                >

                  <div
                    style={{
                      width: "65px",
                      height: "65px",

                      borderRadius: "18px",

                      background:
                        ativo
                          ? "rgba(17,17,17,0.12)"
                          : "rgba(245,215,110,0.12)",

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      overflow: "hidden",

                      border:
                        ativo
                          ? "2px solid rgba(0,0,0,0.15)"
                          : "2px solid rgba(245,215,110,0.25)"
                    }}
                  >

                    <img
                      src={servico.imagem}

                      alt={servico.nome}

                      style={{
                        width: "100%",
                        height: "100%",

                        objectFit: "cover"
                      }}
                    />

                  </div>

                  {ativo && (

                    <div
                      style={{
                        background:
                          "#111",

                        color:
                          "#f5d76e",

                        padding:
                          "7px 12px",

                        borderRadius:
                          "30px",

                        fontSize:
                          "12px",

                        fontWeight:
                          "bold",

                        boxShadow:
                          "0 0 15px rgba(0,0,0,0.25)"
                      }}
                    >
                      ✔ Selecionado
                    </div>

                  )}

                </div>

                <h2
                  style={{
                    fontSize: "22px",

                    marginBottom:
                      "18px",

                    lineHeight:
                      "30px",

                    textTransform:
                      "capitalize"
                  }}
                >
                  {servico.nome}
                </h2>

                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    marginBottom:
                      "18px"
                  }}
                >

                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      opacity: "0.85"
                    }}
                  >
                    ⏰ {servico.tempo} min
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      opacity: "0.7"
                    }}
                  >
                    Premium
                  </p>

                </div>

              </div>

              <div>

                <h1
                  style={{
                    color:
                      ativo
                        ? "#111"
                        : "#25D366",

                    fontSize: "32px",

                    margin: 0
                  }}
                >
                  R$ {servico.preco}
                </h1>

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

          padding: "15px",

          background:
            "rgba(0,0,0,0.88)",

          backdropFilter:
            "blur(10px)",

          borderTop:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto"
          }}
        >

          <Link href="/horario">

            <button

              onClick={salvarServicos}

              style={{
                width: "100%",

                background:
                  "linear-gradient(to right, #25D366, #1fa855)",

                color: "#fff",

                border: "none",

                padding: "22px",

                borderRadius: "20px",

                fontSize: "22px",

                fontWeight: "bold",

                cursor: "pointer",

                transition: "0.3s",

                boxShadow:
                  "0 0 30px rgba(37,211,102,0.40)"
              }}
            >
              Avançar Agendamento →
            </button>

          </Link>

        </div>

      </div>

    </main>
  )
}