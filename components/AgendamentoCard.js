export default function AgendamentoCard({

  item,
  alterarStatus,
  excluirAgendamento

}) {

  return (

    <div

      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "translateY(-6px)"

      }}

      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "translateY(0px)"

      }}

      style={{

        width: "100%",

        minHeight: 650,

        display: "flex",

        flexDirection: "column",

        justifyContent: "space-between",

        background:

          item.status ===
            "concluido"

            ? "rgba(0,120,0,0.35)"

            :

            item.status ===
              "faltou"

              ? "rgba(180,0,0,0.35)"

              :

              "rgba(17,17,17,0.82)",

        padding: 14,

        borderRadius: 14,

        border:
          "1px solid #d4af37",

        boxShadow:
          "0 6px 18px rgba(212,175,55,0.25)",

        transition: "0.3s",

        transform: "translateY(0px)"
      }}
    >

      <div>

        <p style={{ fontSize: 14 }}>
          👤 {item.nome}
        </p>

        <p style={{ fontSize: 14 }}>
          📱 {item.whatsapp}
        </p>

        <p style={{ fontSize: 14 }}>
          💈 {item.barbeiro}
        </p>

        <p style={{ fontSize: 14 }}>
          📅 {item.dia}
        </p>

        <p style={{ fontSize: 14 }}>
          ⏰ {item.hora}
        </p>

        <p
          style={{
            fontSize: 13,
            marginTop: 8,
            color: "#d1d5db",
            lineHeight: 1.5
          }}
        >
          ✂️ {
            item.servicos
            ?.map(
              (servico) =>
                servico.nome
            )
            .join(", ")
          }
        </p>

        {
          item.produtos
          ?.length > 0 && (

            <p
              style={{
                fontSize: 13,
                marginTop: 6,
                color: "#d4af37",
                lineHeight: 1.5
              }}
            >
              🛍️ {
                item.produtos
                ?.map(
                  (produto) =>
                    produto.nome
                )
                .join(", ")
              }
            </p>

          )
        }

        <p
          style={{
            marginTop: 8,
            marginBottom: 8,
            fontWeight: "bold",
            fontSize: 14
          }}
        >

          {item.status ===
            "concluido"
            ? "🟢 Concluído"

            : item.status ===
              "faltou"
              ? "🔴 Não Compareceu"

              : "🟡 Agendado"}

        </p>

        <p
          style={{
            color: "#25D366",
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 8
          }}
        >
          💰 R$
          {Number(item.total || 0).toFixed(2)}
        </p>

      </div>

      <div
        style={{
          display: "grid",
          gap: 8,
          marginTop: 14
        }}
      >

        <button
          onClick={() =>
            alterarStatus(
              item.id,
              "concluido",
              item
            )
          }

          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: 10,
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 13
          }}
        >
          Concluir
        </button>

        <button
          onClick={() =>
            alterarStatus(
              item.id,
              "faltou",
              item
            )
          }

          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: 10,
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 13
          }}
        >
          Faltou
        </button>

        <button
          onClick={() =>
            excluirAgendamento(
              item.id
            )
          }

          style={{
            background: "#444",
            color: "white",
            border: "none",
            padding: 10,
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 13
          }}
        >
          Cancelar
        </button>

      </div>

    </div>

  )

}