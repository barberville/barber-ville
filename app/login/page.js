"use client"

import { useState } from "react"

export default function Login() {

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  function entrar() {

    if (
      email ===
        "admin@barberville.com"
      &&
      senha === "123456"
    ) {

      localStorage.setItem(
        "adminLogado",
        "true"
      )

      window.location.href =
        "/admin"

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
        background: "#111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}
    >

      <div
        style={{
          background: "#222",
          padding: 40,
          borderRadius: 20,
          width: "100%",
          maxWidth: 380
        }}
      >

        <h1
          style={{
            color: "gold",
            textAlign: "center",
            marginBottom: 30
          }}
        >
          Barber Ville
        </h1>

        <input
          type="email"

          placeholder="Seu email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{
            width: "100%",
            padding: 15,
            marginBottom: 20,
            borderRadius: 10,
            border: "none"
          }}
        />

        <input
          type="password"

          placeholder="Sua senha"

          value={senha}

          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }

          style={{
            width: "100%",
            padding: 15,
            marginBottom: 20,
            borderRadius: 10,
            border: "none"
          }}
        />

        <button
          onClick={entrar}

          style={{
            width: "100%",
            padding: 15,
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: 15
          }}
        >
          Entrar Admin
        </button>

        <button
          onClick={() =>
            window.location.href =
              "/admin/daniel"
          }

          style={{
            width: "100%",
            padding: 15,
            background: "#d4af37",
            color: "#111",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login Daniel
        </button>

      </div>

    </main>

  )

}