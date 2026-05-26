"use client"

import { useEffect, useState } from "react"

export default function PagamentoVip() {

  const [qrCode, setQrCode] =
    useState("")

  const [pix, setPix] =
    useState("")

  useEffect(() => {

    const qr =
      localStorage.getItem(
        "pixQrCode"
      )

    const copiaCola =
      localStorage.getItem(
        "pixCopiaCola"
      )

    if (!qr || !copiaCola) {

      window.location.href =
        "/conta-vip"

      return
    }

    setQrCode(qr)

    setPix(copiaCola)

  }, [])

  function copiarPix() {

    navigator.clipboard.writeText(
      pix
    )

    alert(
      "PIX copiado!"
    )

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(rgba(0,0,0,0.93), rgba(0,0,0,0.97))",

        padding: "30px",

        color: "#fff",

        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: "450px",

          margin: "0 auto",

          background:
            "#111",

          border:
            "1px solid rgba(212,175,55,0.25)",

          borderRadius: "25px",

          padding: "30px",

          textAlign: "center"
        }}
      >

        <h1
          style={{
            color: "#d4af37",

            marginBottom: "10px"
          }}
        >
          Pagamento VIP 👑
        </h1>

        <p
          style={{
            color: "#aaa",

            marginBottom: "25px",

            lineHeight: "26px"
          }}
        >
          Escaneie o QR Code
          ou copie o PIX abaixo.
        </p>

        {

          qrCode && (

            <img
              src={`data:image/png;base64,${qrCode}`}

              alt="QR Code"

              style={{
                width: "100%",

                maxWidth: "260px",

                borderRadius: "20px",

                marginBottom: "25px"
              }}
            />

          )

        }

        <textarea
          value={pix}

          readOnly

          style={{
            width: "100%",

            height: "120px",

            borderRadius: "16px",

            padding: "14px",

            background: "#000",

            color: "#fff",

            border:
              "1px solid #333",

            resize: "none",

            marginBottom: "20px"
          }}
        />

        <button
          onClick={copiarPix}

          style={{
            width: "100%",

            padding: "18px",

            borderRadius: "18px",

            border: "none",

            background: "#d4af37",

            color: "#000",

            fontWeight: "bold",

            fontSize: "17px",

            cursor: "pointer",

            marginBottom: "15px"
          }}
        >
          Copiar PIX
        </button>

        <button
          onClick={() =>
            window.location.href =
              "/conta-vip"
          }

          style={{
            width: "100%",

            padding: "18px",

            borderRadius: "18px",

            border: "none",

            background: "#25d366",

            color: "#000",

            fontWeight: "bold",

            fontSize: "17px",

            cursor: "pointer"
          }}
        >
          Já fiz o pagamento
        </button>

      </div>

    </main>
  )
}