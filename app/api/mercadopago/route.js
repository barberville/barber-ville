import {
  MercadoPagoConfig,
  Payment
} from "mercadopago"

const client =
  new MercadoPagoConfig({

    accessToken:
      process.env
        .MERCADO_PAGO_ACCESS_TOKEN

  })

export async function POST(req) {

  try {

    const body =
      await req.json()

    const payment =
      new Payment(client)

    const pagamento =
      await payment.create({

        body: {

          transaction_amount:
            Number(body.valor),

          description:
            body.descricao,

          payment_method_id:
            "pix",

          payer: {

            email: "teste@teste.com",
              

          }

        }

      })

    return Response.json({
  qr_code:
    pagamento.point_of_interaction
      ?.transaction_data
      ?.qr_code,

  qr_code_base64:
    pagamento.point_of_interaction
      ?.transaction_data
      ?.qr_code_base64
})

  }

  catch (erro) {

  console.log(
    "ERRO MERCADO PAGO:",
    erro
  )

  return Response.json(
    {
      erro:
        erro.message
    },
    {
      status: 500
    }
  )

}

}