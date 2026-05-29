import { NextResponse } from "next/server"

import { db } from "../../../firebase"

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore"

export async function POST(req) {

  try {

    const body = await req.json()

    console.log("WEBHOOK RECEBIDO:", body)

    if (body.type === "payment") {

      const paymentId = body.data.id

      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization:
              `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
          }
        }
      )

      const payment = await response.json()

      if (payment.status === "approved") {

        const email =
          payment.metadata?.email

        const q = query(
          collection(db, "clientesVip"),
          where("email", "==", email)
        )

        const snapshot =
          await getDocs(q)

        if (!snapshot.empty) {

          const clienteDoc =
            snapshot.docs[0]

          await updateDoc(
            clienteDoc.ref,
            {
              aprovado: true,
              pagamentoConfirmado: true,
              ativo: true,
              status: "pago",
              dataPagamento:
                new Date().toISOString()
            }
          )

          console.log(
            "VIP LIBERADO:",
            email
          )
        }
      }
    }

    return NextResponse.json({
      ok: true
    })

  } catch (error) {

    console.log(
      "ERRO WEBHOOK:",
      error
    )

    return NextResponse.json(
      { erro: "ERRO WEBHOOK" },
      { status: 500 }
    )
  }
}