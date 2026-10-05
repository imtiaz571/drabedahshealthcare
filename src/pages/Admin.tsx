import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { LogOut, LockKeyhole, CalendarDays, Users, RefreshCw, Trash2, Search } from 'lucide-react'
import { auth, db } from '../lib/firebase'

const ADMIN_EMAIL = 'abedahbegum@gmail.com'

type Appointment = {
  id: string
  name: string
  phone: string
  date: string
  service?: string
  time?: string
  status?: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled'
  createdAt?: { seconds?: number }
}
const statuses = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'] as const

function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password)
    } catch {
      setError('The password is incorrect or the admin account is not set up yet.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: 'var(--black)' }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 16, padding: 36, boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'var(--orange-light)', marginBottom: 20 }}>
          <LockKeyhole color="var(--orange)" size={24} />
        </div>
        <div className="section-label" style={{ marginBottom: 10 }}>Private access</div>
        <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Admin dashboard</h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 24 }}>Sign in with the clinic administrator account to view appointments.</p>
        <div className="form-field" style={{ marginBottom: 18 }}>
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" value={ADMIN_EMAIL} readOnly />
        </div>
        <div className="form-field" style={{ marginBottom: 16 }}>
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" value={password} onChange={event => setPassword(event.target.value)} required autoFocus />
        </div>
        {error && <p role="alert" style={{ color: '#c53030', fontSize: '.85rem', marginBottom: 16 }}>{error}</p>}
        <button className="btn-primary" type="submit" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

function Dashboard({ user }: { user: User }) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadAppointments() {
    setLoading(true)
    setError('')
    try {
      const snapshot = await getDocs(query(collection(db, 'appointments'), orderBy('createdAt', 'desc')))
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Appointment))
    } catch {
      setError('Could not load appointments. Check your Firebase connection and rules.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAppointments() }, [])

  async function removeAppointment(id: string) {
    if (!window.confirm('Delete this appointment request?')) return
    try {
      await deleteDoc(doc(db, 'appointments', id))
      setAppointments(current => current.filter(item => item.id !== id))
    } catch {
      setError('Could not delete this appointment.')
    }
  }

  async function changeStatus(id: string, status: Appointment['status']) {
    if (!status) return
    try {
      await updateDoc(doc(db, 'appointments', id), { status })
      setAppointments(current => current.map(item => item.id === id ? { ...item, status } : item))
    } catch { setError('Could not update appointment status.') }
  }

  function exportCsv() {
    const rows = visibleAppointments.map(item => [item.name, item.phone, item.service || '', item.date, item.time || '', item.status || 'new', item.id])
    const csv = [['Patient', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Booking ID'], ...rows]
      .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'appointments.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const visibleAppointments = appointments.filter(item => {
    const term = search.toLowerCase().trim()
    const matchesSearch = !term || [item.name, item.phone, item.service, item.id].some(value => value?.toLowerCase().includes(term))
    return matchesSearch && (statusFilter === 'all' || (item.status || 'new') === statusFilter)
  })

  return (
    <main style={{ minHeight: '100vh', background: 'var(--off-white)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 8 }}>Private workspace</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 8 }}>Appointments</h1>
            <p style={{ color: 'var(--muted)' }}>Signed in as {user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-outline" onClick={loadAppointments} disabled={loading}><RefreshCw size={16} /> Refresh</button>
            <button className="btn-primary" onClick={() => signOut(auth)}><LogOut size={16} /> Sign out</button>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22 }}><CalendarDays color="var(--orange)" /><div style={{ fontSize: '2rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: 12 }}>{appointments.length}</div><div style={{ color: 'var(--muted)' }}>Total bookings</div></div>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22 }}><Users color="var(--orange)" /><div style={{ fontSize: '2rem', fontFamily: 'Manrope', fontWeight: 800, marginTop: 12 }}>{new Set(appointments.map(item => item.phone)).size}</div><div style={{ color: 'var(--muted)' }}>Unique patients</div></div>
        </div>

        <section style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}><h2 style={{ fontSize: '1.25rem' }}>Appointment requests</h2><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><label style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--border)', borderRadius: 6, padding: '0 10px' }}><Search size={15} color="var(--muted)" /><input aria-label="Search appointments" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" style={{ border: 0, outline: 0, padding: '9px 0', width: 150 }} /></label><select aria-label="Filter by status" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '9px 10px' }}><option value="all">All statuses</option>{statuses.map(status => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select><button className="btn-outline" onClick={exportCsv} disabled={!visibleAppointments.length} style={{ padding: '9px 14px', fontSize: '.85rem' }}>Export CSV</button></div></div>
          {error && <p role="alert" style={{ color: '#c53030', padding: 22 }}>{error}</p>}
          {loading ? <p style={{ padding: 22, color: 'var(--muted)' }}>Loading appointments…</p> : appointments.length === 0 ? <p style={{ padding: 22, color: 'var(--muted)' }}>No appointments yet.</p> : visibleAppointments.length === 0 ? <p style={{ padding: 22, color: 'var(--muted)' }}>No appointments match these filters.</p> : (
            <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}><thead><tr style={{ textAlign: 'left', background: 'var(--off-white)' }}>{['Patient', 'Phone', 'Service', 'Preferred date', 'Time', 'Status', 'Booking ID', ''].map(label => <th key={label} style={{ padding: '13px 18px', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--muted)' }}>{label}</th>)}</tr></thead><tbody>{visibleAppointments.map(item => <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}><td style={{ padding: '16px 18px', fontWeight: 700 }}>{item.name}</td><td style={{ padding: '16px 18px' }}><a href={`tel:${item.phone}`} style={{ color: 'inherit' }}>{item.phone}</a></td><td style={{ padding: '16px 18px', minWidth: 180 }}>{item.service || '—'}</td><td style={{ padding: '16px 18px' }}>{item.date}</td><td style={{ padding: '16px 18px' }}>{item.time || '—'}</td><td style={{ padding: '16px 18px' }}><select aria-label={`Status for ${item.name}`} value={item.status || 'new'} onChange={e => changeStatus(item.id, e.target.value as Appointment['status'])} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '7px 8px', textTransform: 'capitalize' }}>{statuses.map(status => <option key={status} value={status}>{status}</option>)}</select></td><td style={{ padding: '16px 18px', color: 'var(--muted)', fontSize: '.8rem' }}>{item.id.slice(0, 8)}</td><td style={{ padding: '16px 18px', textAlign: 'right' }}><button onClick={() => removeAppointment(item.id)} aria-label={`Delete appointment for ${item.name}`} style={{ border: 0, background: 'transparent', color: '#c53030', cursor: 'pointer', padding: 6 }}><Trash2 size={17} /></button></td></tr>)}</tbody></table></div>
          )}
        </section>
      </div>
    </main>
  )
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => onAuthStateChanged(auth, nextUser => {
    setUser(nextUser?.email?.toLowerCase() === ADMIN_EMAIL ? nextUser : null)
    setReady(true)
  }), [])

  if (!ready) return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>Loading…</main>
  return user ? <Dashboard user={user} /> : <Login />
}
