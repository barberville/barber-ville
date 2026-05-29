"use client"

import { useEffect } from "react"

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore"

import {
  onAuthStateChanged
} from "firebase/auth"

import {
  db,
  auth
} from "../../firebase"

import AdminCard from "../../components/AdminCard"

import AgendamentoCard from "../../components/AgendamentoCard"

export default function Admin() {

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (usuario) => {

          if (!usuario) {

            window.location.href =
              "/login"

          }

        }
      )

    return () =>
      unsubscribe()

  }, [])

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        padding: 20
      }}
    >

      <h1
        style={{
          color: "gold",
          marginBottom: 30,
          textAlign: "center"
        }}
      >
        Painel Admin
      </h1>

      <div
        style={{
          display: "grid",
          gap: 20
        }}
      >

        <AdminCard />

        <AgendamentoCard />

      </div>

    </main>

  )

}