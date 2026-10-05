import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface AppointmentPayload {
  name: string
  phone: string
  date: string
  service: string
  time: string
}

export async function createAppointment(payload: AppointmentPayload) {
  return addDoc(collection(db, 'appointments'), {
    name: payload.name,
    phone: payload.phone,
    date: payload.date,
    service: payload.service,
    time: payload.time,
    status: 'new',
    createdAt: serverTimestamp(),
  })
}
