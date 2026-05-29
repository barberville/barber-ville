"use client"

import { useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../../firebase"

export default function LoginVip() {

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function entrar() {

    if (
      email.trim() === "" ||
      senha.trim() === ""
    ) {

      alert(
        "Preencha todos os campos."
      )

      return
    }

    setLoading(true)

    try {

      const snapshot =
        await getDocs(
          collection(
            db,
            "clientesVip"
          )
        )

      let clienteEncontrado =
        null

      snapshot.forEach(
        (docItem) => {

          const dados =
            docItem.data()

          if (

            dados.email === email &&

            dados.senha === senha

          ) {

            clienteEncontrado = {
              id: docItem.id,
              ...dados
            }

          }

        }
      )

      if (!clienteEncontrado) {

        alert(
          "Email ou senha incorretos."
        )

        setLoading(false)

        return
      }

      localStorage.setItem(
        "clienteVipLogado",
        email
      )

      window.location.href =
        "/conta-vip"

    } catch (erro) {

      console.log(erro)

      alert(
        "Erro ao entrar."
      )

    }

    setLoading(false)

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.92)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: 20
      }}
    >

      <div
        style={{
          width: "100%",

          maxWidth: 450,

          background:
            "rgba(0,0,0,0.78)",

          border:
            "1px solid rgba(212,175,55,0.18)",

          borderRadius: 30,

          padding: 35,

          backdropFilter:
            "blur(10px)"
        }}
      >

        <h1
          style={{
            color: "#d4af37",

            textAlign: "center",

            fontSize: 48,

            marginBottom: 10
          }}
        >
          👑 Conta VIP
        </h1>

        <p
          style={{
            color: "#aaa",

            textAlign: "center",

            marginBottom: 35,

            fontSize: 18
          }}
        >
          Entre na sua conta VIP Barber Ville.
        </p>

        <div
          style={{
            marginBottom: 20
          }}
        >

          <label
            style={{
              color: "#d4af37",

              fontWeight: "bold",

              display: "block",

              marginBottom: 10
            }}
          >
            Email
          </label>

          <input
            type="email"

            placeholder="Digite seu email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            style={input}
          />

        </div>

        <div
          style={{
            marginBottom: 25
          }}
        >

          <label
            style={{
              color: "#d4af37",

              fontWeight: "bold",

              display: "block",

              marginBottom: 10
            }}
          >
            Senha
          </label>

          <input
            type="password"

            placeholder="Digite sua senha"

            value={senha}

            onChange={(e) =>
              setSenha(
                e.target.value
              )
            }

            style={input}
          />

        </div>

        <button
          onClick={entrar}

          disabled={loading}

          style={{
            width: "100%",

            background: "#d4af37",

            color: "#000",

            border: "none",

            padding: 20,

            borderRadius: 18,

            fontWeight: "bold",

            fontSize: 22,

            cursor: "pointer",

            opacity:
              loading ? 0.7 : 1
          }}
        >
          {

            loading

              ? "Entrando..."

              : "Entrar"

          }
        </button>

      </div>

    </main>

  )

}

const input = {

  width: "100%",

  padding: 18,

  borderRadius: 16,

  border:
    "1px solid rgba(212,175,55,0.18)",

  background: "#111",

  color: "#fff",

  fontSize: 17,

  outline: "none"
}