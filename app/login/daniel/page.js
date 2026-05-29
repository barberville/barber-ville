"use client"

import { useState } from "react"

export default function LoginDaniel() {

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  function entrar() {

    if (
      email === "daniel@barberville.com"
      &&
      senha === "123456"
    ) {

      localStorage.setItem(
        "usuarioLogado",
        "Daniel"
      )

      window.location.href =
        "/admin/daniel"

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
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff"
      }}
    >

      <div
        style={{
          width: "350px",
          padding: "30px",
          border: "1px solid #d4af37",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#d4af37"
          }}
        >
          Login Daniel
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }

          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <input
          type="password"

          placeholder="Senha"

          value={senha}

          onChange={(e)=>
            setSenha(e.target.value)
          }

          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <button
          onClick={entrar}

          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "#d4af37",
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