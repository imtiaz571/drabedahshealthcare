import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface ContactMessagePayload {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function createContactMessage(payload: ContactMessagePayload) {
  return addDoc(collection(db, 'messages'), { ...payload, createdAt: serverTimestamp() })
}
