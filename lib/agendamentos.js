import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore"

import { db } from "../firebase"

export async function salvarAgendamento(dados) {
  return await addDoc(
    collection(db, "agendamentos"),
    dados
  )
}

export async function listarAgendamentos() {
  const snapshot = await getDocs(
    collection(db, "agendamentos")
  )

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function buscarPorBarbeiro(barbeiro) {
  const q = query(
    collection(db, "agendamentos"),
    where("barbeiro", "==", barbeiro)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}