export default function AdminCard({
  titulo,
  descricao,
  onClick
}) {

  return (

    <div
      style={{
        background:
          "rgba(0,0,0,0.55)",

        padding: 14,

        borderRadius: 20,

        border:
          "2px solid #d4af37",

        display: "flex",

        flexDirection: "column",

        justifyContent:
          "space-between",

        minWidth: 0,
      }}
    >

      <div>

        <h2
          style={{
            color: "#d4af37",
            fontSize: 18,
            marginBottom: 8
          }}
        >
          {titulo}
        </h2>

        <p
          style={{
            fontSize: 13,
            margin: 0
          }}
        >
          {descricao}
        </p>

      </div>

      <button

        onClick={onClick}

        style={{
          background: "#d4af37",
          color: "black",
          border: "none",
          padding: 10,
          borderRadius: 10,
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
          marginTop: 12,
          fontSize: 13
        }}
      >
        Abrir
      </button>

    </div>

  )

}