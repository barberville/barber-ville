import { NextResponse } from "next/server"

import { db } from "../../../firebase"

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore"

export async function GET(req) {

  try {

    const { searchParams } =
      new URL(req.url)

    const id =
      searchParams.get("id")

    if (!id) {

      return NextResponse.json(
        { erro: "ID NÃO INFORMADO" },
        { status: 400 }
      )
    }

    const response =
      await fetch(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
          }
        }
      )

    const data =
      await response.json()

    console.log(
      "STATUS PAYMENT:",
      data
    )

    if (
      data.status === "approved"
    ) {

      const email =
        data.metadata?.email

      if (email) {

        const q = query(
          collection(
            db,
            "clientesVip"
          ),
          where(
            "email",
            "==",
            email
          )
        )

        const snapshot =
          await getDocs(q)

        if (!snapshot.empty) {

          await updateDoc(
            snapshot.docs[0].ref,
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

      status: data.status,

      approved:
        data.status ===
        "approved"

    })

  } catch (erro) {

    console.log(
      "ERRO STATUS:",
      erro
    )

    return NextResponse.json(
      { erro: "ERRO STATUS" },
      { status: 500 }
    )
  }
}