"use client"

import { useState } from "react"

import {
  signInWithEmailAndPassword
} from "firebase/auth"

import {
  auth
} from "../../../firebase"

export default function LoginDaniel() {

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  const [carregando,
    setCarregando] =
      useState(false)

  async function entrar() {

    if (!email || !senha) {

      alert(
        "Preencha email e senha"
      )

      return
    }

    try {

      setCarregando(true)

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      )

      localStorage.setItem(
        "danielLogado",
        "true"
      )

      window.location.href =
        "/admin"

    } catch (error) {

      alert(
        "Email ou senha incorretos"
      )

    } finally {

      setCarregando(false)

    }

  }

  return (

    <main
      style={{

        minHeight: "100vh",

        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.88)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition:
          "center",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding: 20
      }}
    >

      <div
        style={{

          width: "100%",

          maxWidth: 420,

          background:
            "rgba(0,0,0,0.45)",

          border:
            "2px solid #d4af37",

          borderRadius: 20,

          padding: 30,

          backdropFilter:
            "blur(10px)"
        }}
      >

        <h1
          style={{

            textAlign: "center",

            color: "#d4af37",

            marginBottom: 30
          }}
        >
          Login Daniel
        </h1>

        <input
          type="email"

          autoComplete="off"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{

            width: "100%",

            padding: 14,

            marginBottom: 14,

            borderRadius: 10,

            border: "none"
          }}
        />

        <input
          type="password"

          autoComplete="new-password"

          placeholder="Senha"

          value={senha}

          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }

          style={{

            width: "100%",

            padding: 14,

            marginBottom: 20,

            borderRadius: 10,

            border: "none"
          }}
        />

        <button
          onClick={entrar}

          disabled={carregando}

          style={{

            width: "100%",

            padding: 14,

            background:
              "#d4af37",

            color: "#000",

            border: "none",

            borderRadius: 10,

            fontWeight: "bold",

            cursor: "pointer",

            fontSize: 16,

            opacity:
              carregando
                ? 0.7
                : 1
          }}
        >
          {
            carregando
              ? "Entrando..."
              : "Entrar"
          }
        </button>

      </div>

    </main>

  )

}