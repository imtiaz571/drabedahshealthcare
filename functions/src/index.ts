import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { initializeApp } from 'firebase-admin/app'
import { google } from 'googleapis'

initializeApp()

export const appendAppointmentToSheet = onDocumentCreated('appointments/{appointmentId}', async (event) => {
  const appointment = event.data?.data()
  if (!appointment) return

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.APPOINTMENTS_SHEET_ID,
    range: 'Bookings!A:C',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[
      appointment.name, appointment.phone, appointment.date,
    ]] },
  })
})
