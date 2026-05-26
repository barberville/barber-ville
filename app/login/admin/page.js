"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginAdmin() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  function entrar() {

    if (

      email ===
        "brennodasilva911@gmail.com"

      &&

      senha ===
        "20202020Bre@"

    ) {

      localStorage.setItem(
        "adminLogado",
        "true"
      )

      router.push("/admin")

    } else {

      alert(
        "Email ou senha incorretos"
      )

    }

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/logo.png')",

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",

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
            "rgba(0,0,0,0.55)",

          padding: 30,

          borderRadius: 25,

          border:
            "2px solid #d4af37",

          backdropFilter:
            "blur(5px)"
        }}
      >

        <h1
          style={{
            color: "#d4af37",

            textAlign: "center",

            fontSize: 40,

            marginBottom: 30
          }}
        >
          Login ADM
        </h1>

        <input
          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: 18,

            marginBottom: 20,

            borderRadius: 12,

            border: "none",

            fontSize: 18
          }}
        />

        <input
          type="password"

          placeholder="Senha"

          value={senha}

          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: 18,

            marginBottom: 25,

            borderRadius: 12,

            border: "none",

            fontSize: 18
          }}
        />

        <button
          onClick={entrar}

          style={{
            width: "100%",

            padding: 18,

            background: "#d4af37",

            color: "black",

            border: "none",

            borderRadius: 15,

            fontSize: 20,

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          Entrar
        </button>

      </div>

    </main>

  )

}