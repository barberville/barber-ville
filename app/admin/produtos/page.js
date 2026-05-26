"use client"

import {
  useState,
  useEffect
} from "react"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore"

import { db }
from "../../../firebase"

export default function ProdutosAdmin() {

  const [
    nome,
    setNome
  ] = useState("")

  const [
    preco,
    setPreco
  ] = useState("")

  const [
    descricao,
    setDescricao
  ] = useState("")

  const [
    imagem,
    setImagem
  ] = useState("")

  const [
    produtos,
    setProdutos
  ] = useState([])

  const [
    loading,
    setLoading
  ] = useState(false)

  useEffect(() => {

    buscarProdutos()

  }, [])

  async function buscarProdutos() {

    const querySnapshot =
      await getDocs(
        collection(
          db,
          "produtos"
        )
      )

    const lista = []

    querySnapshot.forEach((doc) => {

      lista.push({
        id: doc.id,
        ...doc.data()
      })

    })

    setProdutos(lista)

  }

  async function adicionarProduto() {

    if (
      nome === ""
      ||
      preco === ""
      ||
      descricao === ""
      ||
      imagem === ""
    ) {

      alert(
        "Preencha todos os campos"
      )

      return

    }

    try {

      setLoading(true)

      await addDoc(
        collection(
          db,
          "produtos"
        ),

        {
          nome,
          preco,
          descricao,
          imagem
        }
      )

      setNome("")
      setPreco("")
      setDescricao("")
      setImagem("")

      buscarProdutos()

      alert(
        "Produto adicionado!"
      )

    } catch (erro) {

      console.log(erro)

      alert(
        "Erro ao adicionar produto"
      )

    }

    setLoading(false)

  }

  async function excluirProduto(
    id
  ) {

    const confirmar =
      confirm(
        "Deseja excluir este produto?"
      )

    if (!confirmar) return

    await deleteDoc(
      doc(
        db,
        "produtos",
        id
      )
    )

    buscarProdutos()

  }

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "#070707",

        color: "white",

        padding: "20px",

        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          color: "#d4af37",

          marginBottom: "8px",

          textAlign: "center",

          fontSize: "32px"
        }}
      >
        Produtos Adicionais
      </h1>

      <p
        style={{
          textAlign: "center",
          opacity: "0.6",
          marginBottom: "30px"
        }}
      >
        Gerencie os produtos da barbearia
      </p>

      <div
        style={{
          maxWidth: "650px",

          margin: "0 auto",

          background:
            "#111",

          padding: "20px",

          borderRadius: "22px",

          border:
            "1px solid rgba(255,255,255,0.05)",

          marginBottom: "30px"
        }}
      >

        <input
          placeholder="Nome do produto"

          value={nome}

          onChange={(e) =>
            setNome(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "14px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.05)",

            background:
              "#1a1a1a",

            color: "#fff",

            outline: "none",

            fontSize: "15px"
          }}
        />

        <input
          placeholder="Preço"

          value={preco}

          onChange={(e) =>
            setPreco(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "14px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.05)",

            background:
              "#1a1a1a",

            color: "#fff",

            outline: "none",

            fontSize: "15px"
          }}
        />

        <textarea
          placeholder="Para que serve o produto"

          value={descricao}

          onChange={(e) =>
            setDescricao(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "14px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.05)",

            background:
              "#1a1a1a",

            color: "#fff",

            outline: "none",

            fontSize: "15px",

            resize: "none",

            minHeight: "100px"
          }}
        />

        <input
          placeholder="Caminho da imagem"

          value={imagem}

          onChange={(e) =>
            setImagem(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "15px",

            marginBottom: "10px",

            borderRadius: "14px",

            border:
              "1px solid rgba(255,255,255,0.05)",

            background:
              "#1a1a1a",

            color: "#fff",

            outline: "none",

            fontSize: "15px"
          }}
        />

        <p
          style={{
            fontSize: "12px",
            opacity: "0.5",
            marginBottom: "20px"
          }}
        >
          Exemplo:
          /produtos/shampoo.png
        </p>

        {imagem && (

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",

              marginBottom: "20px"
            }}
          >

            <img
              src={imagem}

              style={{
                width: "140px",
                height: "140px",

                objectFit: "cover",

                borderRadius: "18px",

                border:
                  "2px solid #d4af37"
              }}
            />

          </div>

        )}

        <button

          onClick={
            adicionarProduto
          }

          style={{
            width: "100%",

            background:
              "#d4af37",

            color: "#000",

            border: "none",

            padding: "16px",

            borderRadius: "16px",

            fontSize: "16px",

            fontWeight: "bold",

            cursor: "pointer"
          }}
        >
          {
            loading

            ? "Adicionando..."

            : "Adicionar Produto"
          }
        </button>

      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(3, 1fr)",

          gap: "12px"
        }}
      >

        {produtos.map(
          (produto) => (

          <div
            key={produto.id}

            style={{
              background:
                "#111",

              borderRadius: "18px",

              overflow: "hidden",

              border:
                "1px solid rgba(255,255,255,0.05)"
            }}
          >

            <img
              src={produto.imagem}

              alt={produto.nome}

              style={{
                width: "100%",
                height: "170px",
                objectFit: "cover"
              }}
            />

            <div
              style={{
                padding: "12px"
              }}
            >

              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "6px",
                  fontSize: "17px"
                }}
              >
                {produto.nome}
              </h3>

              <p
                style={{
                  color: "#d4af37",

                  fontWeight: "bold",

                  fontSize: "16px",

                  marginBottom: "10px"
                }}
              >
                R$ {produto.preco}
              </p>

              <p
                style={{
                  opacity: "0.7",

                  fontSize: "12px",

                  lineHeight: "18px",

                  marginBottom: "14px"
                }}
              >
                {produto.descricao}
              </p>

              <button

                onClick={() =>
                  excluirProduto(
                    produto.id
                  )
                }

                style={{
                  width: "100%",

                  background:
                    "#dc2626",

                  color: "#fff",

                  border: "none",

                  padding: "12px",

                  borderRadius: "12px",

                  cursor: "pointer",

                  fontWeight: "bold"
                }}
              >
                Excluir
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>

  )

}