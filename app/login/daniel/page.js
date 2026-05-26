"use client"

import { useState, useEffect } from "react"

export default function LoginDaniel() {

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [lembrar, setLembrar] = useState(false)

  useEffect(() => {

    const usuarioSalvo =
      localStorage.getItem("usuarioDaniel")

    const senhaSalva =
      localStorage.getItem("senhaDaniel")

    if (usuarioSalvo && senhaSalva) {

      setUsuario(usuarioSalvo)
      setSenha(senhaSalva)
      setLembrar(true)

    }

  }, [])

  function entrar() {

    if (
      usuario === "daniel" &&
      senha === "123456"
    ) {

      localStorage.setItem(
        "danielLogado",
        "true"
      )

      if (lembrar) {

        localStorage.setItem(
          "usuarioDaniel",
          usuario
        )

        localStorage.setItem(
          "senhaDaniel",
          senha
        )

      } else {

        localStorage.removeItem(
          "usuarioDaniel"
        )

        localStorage.removeItem(
          "senhaDaniel"
        )

      }

      window.location.replace(
        "/servicos/daniel/painel"
      )

    } else {

      alert(
        "Usuário ou senha incorretos"
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "rgba(0,0,0,0.7)",
          padding: 30,
          borderRadius: 20
        }}
      >

        <h1
          style={{
            color: "#d4af37",
            textAlign: "center",
            marginBottom: 30
          }}
        >
          Login Daniel
        </h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) =>
            setUsuario(e.target.value)
          }
          style={{
            width: "100%",
            padding: 15,
            marginBottom: 20,
            borderRadius: 10,
            border: "none"
          }}
        />

        <div
          style={{
            position: "relative"
          }}
        >

          <input
            type={
              mostrarSenha
                ? "text"
                : "password"
            }
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            style={{
              width: "100%",
              padding: 15,
              marginBottom: 20,
              borderRadius: 10,
              border: "none",
              paddingRight: 50
            }}
          />

          <button
            onClick={() =>
              setMostrarSenha(!mostrarSenha)
            }
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              background: "transparent",
              border: "none",
              color: "#555",
              fontSize: 20,
              cursor: "pointer"
            }}
          >
            {mostrarSenha ? "🙈" : "👁"}
          </button>

        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            color: "white"
          }}
        >

          <input
            type="checkbox"
            checked={lembrar}
            onChange={(e) =>
              setLembrar(e.target.checked)
            }
          />

          Lembrar login

        </label>

        <button
          onClick={entrar}
          style={{
            width: "100%",
            padding: 15,
            background: "#d4af37",
            border: "none",
            borderRadius: 10,
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