export default function GoldButton({

  texto,
  onClick,
  width = "100%",
  fontSize = 14

}) {

  return (

    <button

      onClick={onClick}

      onMouseDown={(e) => {

        e.currentTarget.style.transform =
          "scale(0.97)"

      }}

      onMouseUp={(e) => {

        e.currentTarget.style.transform =
          "scale(1)"

      }}

      style={{

        background: "#d4af37",

        color: "#000",

        border: "none",

        padding: "12px",

        borderRadius: 12,

        fontWeight: "bold",

        cursor: "pointer",

        width,

        fontSize,

        transition: "0.2s",

        transform: "scale(1)",

        boxShadow:
          "0 4px 14px rgba(212,175,55,0.35)"
      }}
    >

      {texto}

    </button>

  )

}