import { initializeApp } from "firebase/app"

import {
  getFirestore
} from "firebase/firestore"

import {
  getStorage
} from "firebase/storage"

import {
  getAuth
} from "firebase/auth"

const firebaseConfig = {

  apiKey:
    "AIzaSyDJGcCDrpoSi5aLqdcYvD1bkWG_9zXP8-o",

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

console.log("FIREBASE CONFIG", firebaseConfig)

const app =
  initializeApp(
    firebaseConfig
  )

const db =
  getFirestore(app)

const storage =
  getStorage(app)

const auth =
  getAuth(app)

export {
  db,
  storage,
  auth
}