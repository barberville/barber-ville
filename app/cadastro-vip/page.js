"use client"

import { useEffect, useState } from "react"

import {
  createUserWithEmailAndPassword
} from "firebase/auth"

import {
  collection,
  addDoc
} from "firebase/firestore"

import {
  db,
  auth
} from "../../firebase"

export default function CadastroVip() {

  const [loading,
    setLoading] =
      useState(false)

  const [nome, setNome] =
    useState("")

  const [whatsapp, setWhatsapp] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  const [barbeiro, setBarbeiro] =
    useState("")

  const [plano, setPlano] =
    useState("")

  const hoje =
    new Date()

  const dia =
    hoje.getDate()

  let valorPlano =
    99.90

  let servicos =
    4

  let mensagemPlano =
    ""

  if (plano === "Plano Ouro") {

    if (dia >= 28) {

      valorPlano = 50

      servicos = 1

      mensagemPlano =
        "Você terá direito a 1 atendimento VIP Ouro até o próximo dia 5."

    }

    else if (dia >= 21 && dia <= 27) {

      valorPlano = 85

      servicos = 2

      mensagemPlano =
        "Plano Ouro proporcional 👑 Você terá direito a 2 atendimentos até o próximo dia 5."

    }

    else if (dia >= 15 && dia <= 20) {

      valorPlano = 125

      servicos = 3

      mensagemPlano =
        "Plano Ouro proporcional 👑 Você terá direito a 3 atendimentos até o próximo dia 5."

    }

    else {

      valorPlano = 149.90

      servicos = 4

      mensagemPlano =
        "Plano Ouro completo 👑 Você terá direito aos 4 atendimentos do plano."

    }

  }

  else {

    if (dia >= 28) {

      valorPlano = 30

      servicos = 1

      mensagemPlano =
        "Você terá direito a 1 serviço até o próximo dia 5."

    }

    else if (dia >= 21) {

      valorPlano = 55

      servicos = 2

      mensagemPlano =
        "Plano VIP Entrada 👑 Você terá direito a 2 serviços até o próximo dia 5."

    }

    else if (dia >= 14) {

      valorPlano = 85

      servicos = 3

      mensagemPlano =
        "Plano proporcional 👑 Você terá direito a 3 serviços até o próximo dia 5."

    }

    else {

      valorPlano = 99.90

      servicos = 4

      mensagemPlano =
        "Plano VIP completo 👑"

    }

  }

  useEffect(() => {

    const barbeiroSalvo =
      localStorage.getItem(
        "barbeiroVip"
      )

    const planoSalvo =
      localStorage.getItem(
        "planoVip"
      )

    if (
      !barbeiroSalvo ||
      !planoSalvo
    ) {

      window.location.href =
        "/planos"

      return

    }

    setBarbeiro(
      barbeiroSalvo
    )

    setPlano(
      planoSalvo
    )

  }, [])

  async function cadastrar() {

    if (

      nome.trim() === "" ||

      whatsapp.trim() === "" ||

      email.trim() === "" ||

      senha.trim() === ""

    ) {

      alert(
        "Preencha todos os campos."
      )

      return

    }

    try {

      setLoading(true)

      // CRIAR LOGIN FIREBASE

      const usuarioCriado =

        await createUserWithEmailAndPassword(

          auth,
          email,
          senha

        )

      // SALVAR CLIENTE VIP

      await addDoc(

        collection(
          db,
          "clientesVip"
        ),

        {

          uid:
            usuarioCriado.user.uid,

          nome,

          whatsapp,

          email,

          barbeiro,

          plano,

          aprovado: false,

          pagamentoConfirmado: false,

          restantes:
            servicos,

          valorPlano,

          criadoEm:
            new Date(),

          vencimento: (() => {

            const data =
              new Date()

            data.setMonth(
              data.getMonth() + 1
            )

            data.setDate(5)

            data.setHours(
              23,
              59,
              59,
              999
            )

            return data.toISOString()

          })()

        }

      )

      localStorage.setItem(

        "clienteVipLogado",

        email

      )

      window.location.href =
        "/conta-vip"

    } catch (erro) {

      console.log(erro)

      if (
        erro.code ===
        "auth/email-already-in-use"
      ) {

        alert(
          "Esse email já possui cadastro."
        )

      } else {

        alert(
          "Erro ao criar conta."
        )

      }

    } finally {

      setLoading(false)

    }

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        padding: "30px",

        color: "#fff",

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

          marginBottom: "15px",

          color: "#d4af37",

          width: "fit-content"
        }}
      >
        ←
      </div>

      <div
        style={{
          maxWidth: "450px",

          margin: "0 auto",

          marginTop: "40px",

          background:
            "rgba(0,0,0,0.75)",

          border:
            "1px solid rgba(212,175,55,0.25)",

          borderRadius: "25px",

          padding: "30px",

          backdropFilter:
            "blur(10px)"
        }}
      >

        <h1
          style={{
            textAlign: "center",

            color: "#d4af37",

            marginBottom: "10px",

            fontSize: "40px"
          }}
        >
          Cadastro VIP
        </h1>

        <p
          style={{
            textAlign: "center",

            marginBottom: "15px",

            color: "#ccc",

            lineHeight: "28px"
          }}
        >
          Finalize seu plano VIP 💈
        </p>

        <div
          style={{
            background:
              "rgba(212,175,55,0.08)",

            border:
              "1px solid rgba(212,175,55,0.18)",

            borderRadius: "18px",

            padding: "18px",

            marginBottom: "18px",

            textAlign: "center"
          }}
        >

          <h2
            style={{
              color: "#d4af37",

              marginBottom: "10px",

              fontSize: "30px"
            }}
          >
            R$ {valorPlano}
          </h2>

          <p
            style={{
              color: "#fff",

              lineHeight: "28px"
            }}
          >
            {mensagemPlano}
          </p>

        </div>

        <div
          style={{
            background:
              "rgba(212,175,55,0.08)",

            border:
              "1px solid rgba(212,175,55,0.18)",

            borderRadius: "18px",

            padding: "18px",

            marginBottom: "18px",

            textAlign: "center"
          }}
        >

          <p
            style={{
              color: "#aaa",

              marginBottom: "8px"
            }}
          >
            Barbeiro selecionado
          </p>

          <h2
            style={{
              color: "#d4af37",

              fontSize: "28px",

              margin: 0
            }}
          >
            💈 {barbeiro}
          </h2>

        </div>

        <div
          style={{
            background:
              "rgba(212,175,55,0.08)",

            border:
              "1px solid rgba(212,175,55,0.18)",

            borderRadius: "18px",

            padding: "18px",

            marginBottom: "25px",

            textAlign: "center"
          }}
        >

          <p
            style={{
              color: "#aaa",

              marginBottom: "8px"
            }}
          >
            Plano escolhido
          </p>

          <h2
            style={{
              color: "#d4af37",

              fontSize: "28px",

              margin: 0
            }}
          >
            👑 {plano}
          </h2>

        </div>

        <input
          type="text"

          placeholder="Seu nome"

          value={nome}

          onChange={(e) =>
            setNome(
              e.target.value
            )
          }

          style={input}
        />

        <input
  type="tel"
  inputMode="numeric"
  pattern="[0-9]*"

  placeholder="Seu WhatsApp"

  value={whatsapp}

  onChange={(e) =>
    setWhatsapp(
      e.target.value
    )
  }

  style={input}
/>

        <input
          type="email"

          placeholder="Seu email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={input}
        />

        <input
          type="password"

          placeholder="Crie uma senha"

          value={senha}

          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }

          style={input}
        />

        <button
          onClick={cadastrar}

          disabled={loading}

          style={{
            width: "100%",

            padding: "18px",

            borderRadius: "18px",

            border: "none",

            background:
              "linear-gradient(90deg,#d4af37,#ffdf70)",

            color: "#000",

            fontWeight: "bold",

            fontSize: "18px",

            cursor: "pointer",

            marginTop: "10px",

            boxShadow:
              "0 0 25px rgba(212,175,55,0.35)",

            opacity:
              loading
                ? 0.7
                : 1
          }}
        >
          {

            loading
              ? "Criando conta..."
              : "Criar Conta VIP"

          }
        </button>

      </div>

    </main>
  )

}

const input = {

  width: "100%",

  padding: "16px",

  marginBottom: "18px",

  borderRadius: "14px",

  border: "1px solid #333",

  background: "#111",

  color: "#fff",

  fontSize: "16px",

  outline: "none"
}