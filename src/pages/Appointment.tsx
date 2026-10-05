import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check, Home, Phone, UserRound } from 'lucide-react'
import { createAppointment } from '../lib/appointments'

export default function Appointment() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', date: '' })
  const [error, setError] = useState('')
  const update = (key: keyof typeof form, value: string) => { setForm(f => ({ ...f, [key]: value })); setError('') }
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.date) return setError('Please complete all three fields.')
    setSubmitting(true)
    setError('')
    try {
      await Promise.race([
        createAppointment(form),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase request timed out')), 10000)),
      ])
      setSubmitted(true)
    } catch (err) {
      console.error('Appointment submission failed:', err)
      setError('Booking could not be submitted. Please check Firebase setup or call the clinic.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <div style={{ minHeight: '100vh', padding: '140px 20px 80px', background: 'var(--off-white)', display: 'grid', placeItems: 'center' }}><div style={{ maxWidth: 520, textAlign: 'center' }}><div className="success-icon" style={{ width: 72, height: 72, margin: '0 auto 24px', borderRadius: '50%', background: 'var(--orange)', display: 'grid', placeItems: 'center' }}><Check color="#fff" size={34} /></div><div className="section-label" style={{ marginBottom: 10 }}>Request received</div><h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: 16 }}>Thank you, {form.name.split(' ')[0]}.</h1><p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>Our clinic team will call <strong>{form.phone}</strong> to confirm your preferred date.</p><Link to="/" className="btn-outline"><Home size={16} /> Back to Home</Link></div></div>

  return <div style={{ minHeight: '100vh', paddingTop: 72, background: 'var(--off-white)' }}><section style={{ padding: 'clamp(52px, 8vw, 92px) 20px', background: 'var(--black)', textAlign: 'center' }}><div className="section-label" style={{ marginBottom: 12 }}>Dr. Abedah's Sono Healthcare</div><h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 7vw, 3.2rem)', marginBottom: 12 }}>Book an Appointment</h1><p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Share your details and our clinic team will call to confirm your visit.</p></section><form onSubmit={submit} style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(36px, 7vw, 64px) 20px 90px' }}><div style={{ display: 'grid', gap: 22 }}><div className="form-field"><label htmlFor="name"><UserRound size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />Patient name</label><input id="name" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Enter patient name" autoComplete="name" /></div><div className="form-field"><label htmlFor="phone"><Phone size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />Phone number</label><input id="phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="e.g. 01727 414 991" autoComplete="tel" /></div><div className="form-field"><label htmlFor="date"><CalendarDays size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />Preferred date</label><input id="date" type="date" value={form.date} onChange={e => update('date', e.target.value)} min={new Date().toISOString().slice(0, 10)} /></div></div>{error && <p role="alert" style={{ color: '#d33', fontSize: '.875rem', marginTop: 16 }}>{error}</p>}<button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 28, opacity: submitting ? .7 : 1 }}>{submitting ? 'Submitting…' : 'Request Appointment'} {!submitting && <ArrowRight size={16} />}</button><p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.8rem', lineHeight: 1.6, marginTop: 18 }}>The clinic will contact you to confirm the exact time slot.</p></form></div>
}
