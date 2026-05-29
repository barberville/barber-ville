import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()

    console.log("BODY RECEBIDO:", body)

    const accessToken =
      process.env.MERCADO_PAGO_ACCESS_TOKEN

    console.log("TOKEN:", accessToken)

    if (!accessToken) {
      return NextResponse.json(
        {
          erro: "TOKEN NÃO ENCONTRADO"
        },
        {
          status: 500
        }
      )
    }

    const response = await fetch(
      "https://api.mercadopago.com/v1/payments",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${accessToken}`,

          "X-Idempotency-Key":
            crypto.randomUUID()
        },

        body: JSON.stringify({
          transaction_amount:
            Number(body.valor || 10),

          description:
            "Plano VIP Barber Ville",

          payment_method_id: "pix",

          notification_url:
            "https://barber-ville.vercel.app/api/webhook",

          payer: {
            email:
              body.email ||
              "teste@test.com",

            first_name:
              body.nome ||
              "Cliente",

            identification: {
              type: "CPF",
              number: "19119119100"
            }
          },

          metadata: {
            email: body.email
          }
        })
      }
    )

    const data =
      await response.json()

    console.log(
      "RESPOSTA MP:",
      JSON.stringify(data, null, 2)
    )

    if (!response.ok) {
      return NextResponse.json(
        {
          erro:
            data.message ||
            "ERRO MERCADO PAGO",

          detalhes: data
        },
        {
          status: 500
        }
      )
    }

    if (!data.point_of_interaction) {
      return NextResponse.json(
        {
          erro: "PIX NÃO GERADO",

          detalhes: data
        },
        {
          status: 500
        }
      )
    }

    return NextResponse.json({
      ok: true,

      payment_id: data.id,

      qr_code:
        data.point_of_interaction
          .transaction_data.qr_code,

      qr_code_base64:
        data.point_of_interaction
          .transaction_data
          .qr_code_base64,

      ticket_url:
        data.point_of_interaction
          .transaction_data
          .ticket_url
    })

  } catch (erro) {

    console.log(
      "ERRO API:",
      erro
    )

    return NextResponse.json(
      {
        erro: "ERRO INTERNO"
      },
      {
        status: 500
      }
    )
  }
}