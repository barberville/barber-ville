import { initializeApp } from "firebase/app"

import {
  getFirestore
} from "firebase/firestore"

import {
  getStorage
} from "firebase/storage"

const firebaseConfig = {

  apiKey:
    "AIzaSyDJ6CcDrpoS5aLqdcYvD1bkWG_9zXP8-o",

  authDomain:
    "barber-ville-3c1c9.firebaseapp.com",

  projectId:
    "barber-ville-3c1c9",

  storageBucket:
    "barber-ville-3c1c9.firebasestorage.app",

  messagingSenderId:
    "833381427083",

  appId:
    "1:833381427083:web:1f5d9ee9d3e811d80af18e"
}

const app =
  initializeApp(
    firebaseConfig
  )

const db =
  getFirestore(app)

const storage =
  getStorage(app)

export {
  db,
  storage
}