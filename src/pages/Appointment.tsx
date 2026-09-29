import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, Shield, Activity, Sparkles, Heart, Layers, Stethoscope, Calendar, Clock, ArrowRight, Home } from 'lucide-react'

// ── types ──────────────────────────────────────────────
interface FormData {
  name: string; phone: string; email: string
  service: string
  date: Date | null
  time: string
  notes: string
}

type Errors = Partial<Record<keyof FormData, string>>

// ── services data ──────────────────────────────────────
const SERVICES = [
  { id: 'tvs', icon: Activity, label: 'Transvaginal Sonography (TVS)', duration: '25 min' },
  { id: 'obstetrics', icon: Sparkles, label: 'Advanced Obstetrical / Anomaly Scan', duration: '35 min' },
  { id: 'doppler', icon: Shield, label: 'Duplex & Vascular Doppler Study', duration: '35 min' },
  { id: 'msk', icon: Layers, label: 'Musculoskeletal (MSK) Ultrasound', duration: '30 min' },
  { id: 'abdomen', icon: Heart, label: 'Whole Abdomen & Pelvic Ultrasound', duration: '25 min' },
  { id: 'med_gynae', icon: Stethoscope, label: 'Medicine & Gynaecology Consult', duration: '30 min' },
  { id: 'diabetes', icon: Heart, label: 'Diabetic Health Consultation (BIRDEM)', duration: '30 min' },
]

const MORNING_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM']
const AFTERNOON_SLOTS = ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM']
const UNAVAILABLE = ['10:30 AM', '04:00 PM', '05:30 PM']

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// ── Calendar component ─────────────────────────────────
function MiniCalendar({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(() => {
    const d = new Date(); d.setDate(1); return d
  })

  const prevMonth = () => setView(v => { const d = new Date(v); d.setMonth(d.getMonth() - 1); return d })
  const nextMonth = () => setView(v => { const d = new Date(v); d.setMonth(d.getMonth() + 1); return d })

  const firstDay = view.getDay()
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid var(--border)', padding: '20px', maxWidth: 340 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, color: 'var(--muted)', transition: 'background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--orange-light)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}
        >
          <ChevronLeft size={18} />
        </button>
        <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.95rem', color: 'var(--black)' }}>
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </div>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, color: 'var(--muted)', transition: 'background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--orange-light)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)', padding: '4px 0', fontFamily: 'Manrope' }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} />
          const date = new Date(view.getFullYear(), view.getMonth(), day)
          const isPast = date < today
          const isSelected = value ? value.toDateString() === date.toDateString() : false
          const isToday = date.toDateString() === today.toDateString()
          return (
            <button
              key={idx}
              disabled={isPast}
              onClick={() => onChange(date)}
              className={`calendar-day ${isPast ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday && !isSelected ? 'today' : ''}`}
              style={{
                fontSize: '0.875rem',
                fontFamily: 'Inter',
                border: 'none',
                cursor: isPast ? 'not-allowed' : 'pointer',
                background: isSelected ? 'var(--orange)' : 'none',
                color: isSelected ? '#fff' : undefined,
              }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step indicator ─────────────────────────────────────
const STEPS = ['Info', 'Service', 'Date & Time', 'Review']

function StepBar({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 48, flexWrap: 'nowrap', overflowX: 'auto', padding: '4px 0' }}>
      {STEPS.map((label, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div className={`step-dot ${done ? 'done' : active ? 'active' : 'pending'}`}>
                {done ? <Check size={14} /> : idx}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: active || done ? 'var(--orange)' : 'var(--muted)', whiteSpace: 'nowrap', fontFamily: 'Manrope' }}>
                {label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${done ? 'done' : ''}`} style={{ width: 40, marginBottom: 22 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Validate helpers ───────────────────────────────────
function validateStep(step: number, data: FormData): Errors {
  const errs: Errors = {}
  if (step === 1) {
    if (!data.name.trim()) errs.name = 'Full name is required'
    if (!data.phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^[+\d\s\-()]{7,}$/.test(data.phone)) errs.phone = 'Enter a valid phone number'
    if (!data.email.trim()) errs.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email address'
  }
  if (step === 2 && !data.service) errs.service = 'Please select a diagnostic or consultation service'
  if (step === 3 && !data.date) errs.date = 'Please select a preferred date'
  if (step === 3 && !data.time) errs.time = 'Please select an appointment time slot'
  return errs
}

// ── Main component ─────────────────────────────────────
export default function Appointment() {
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [data, setData] = useState<FormData>({
    name: '', phone: '', email: '',
    service: '',
    date: null,
    time: '',
    notes: '',
  })

  const update = useCallback(<K extends keyof FormData>(key: K, val: FormData[K]) => {
    setData(d => ({ ...d, [key]: val }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }, [])

  const next = () => {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep(s => s + 1)
  }

  const back = () => { setErrors({}); setStep(s => s - 1) }
  const confirm = () => setConfirmed(true)
  const reset = () => { setStep(1); setConfirmed(false); setData({ name: '', phone: '', email: '', service: '', date: null, time: '', notes: '' }) }

  const selectedService = SERVICES.find(s => s.id === data.service)

  if (confirmed) {
    return (
      <div style={{ background: 'var(--off-white)', minHeight: '100vh', paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', padding: '60px 32px', textAlign: 'center' }}>
          <div className="success-icon" style={{ width: 80, height: 80, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <Check size={36} color="#fff" strokeWidth={3} />
          </div>
          <div className="success-content">
            <div className="section-label" style={{ marginBottom: 12 }}>Booking Request Submitted</div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: 16 }}>Appointment Request Received</h1>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 40 }}>
              Thank you, {data.name.split(' ')[0]}. Your appointment request has been submitted to Dr. Abedah&#39;s Sono Healthcare. Our clinic team will confirm your slot at <strong>{data.phone}</strong> and <strong>{data.email}</strong>.
            </p>
            <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid var(--border)', padding: '28px', textAlign: 'left', marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1rem', marginBottom: 20, color: 'var(--black)' }}>Appointment Summary</h3>
              {[
                ['Patient', data.name],
                ['Service', selectedService?.label || ''],
                ['Doctor', 'Dr. Abedah Begum Fazlur (BMDC: A-56758)'],
                ['Date', data.date ? data.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''],
                ['Time Slot', data.time],
                ['Phone', data.phone],
                ['Email', data.email],
                ['Clinic Location', '43 East Stadium Market (Ground Floor), Rikabibazar, Sylhet'],
                ['Clinic Hotline', '+880 1727 414 991, +88 09611 656906'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', gap: 16, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 90 }}>{label}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text)', flex: 1, lineHeight: 1.5 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Home size={16} /> Back to Home
              </Link>
              <button onClick={reset} className="btn-primary">
                Book Another Appointment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh', paddingTop: 72 }}>
      <div style={{ background: 'var(--black)', padding: 'clamp(40px, 6vw, 72px) 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)', width: 300, height: 300, background: 'var(--orange)', borderRadius: '50%', opacity: 0.07 }} />
        <div className="section-label" style={{ marginBottom: 12 }}>Dr. Abedah&#39;s Sono Healthcare</div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: 12 }}>Book an Appointment</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>
          Schedule your diagnostic ultrasound or clinical consultation with Dr. Abedah Begum Fazlur (Consultant Sonologist, BMDC Reg: A-56758).
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 32px' }}>
        <StepBar current={step} />

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>Patient Information</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Please provide the patient&#39;s contact information to begin.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {([
                { key: 'name', label: 'Patient Full Name', type: 'text', placeholder: 'e.g. Shamima Akther' },
                { key: 'phone', label: 'Phone Number (WhatsApp preferred)', type: 'tel', placeholder: '+880 17XX XXXXXX' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'yourname@example.com' },
              ] as const).map(({ key, label, type, placeholder }) => (
                <div key={key} className="form-field">
                  <label htmlFor={key}>{label}</label>
                  <input
                    id={key}
                    type={type}
                    placeholder={placeholder}
                    value={data[key]}
                    onChange={e => update(key, e.target.value)}
                    className={errors[key] ? 'error' : ''}
                  />
                  {errors[key] && <div className="error-msg">{errors[key]}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>Select Scan or Consultation</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Choose the diagnostic imaging service or clinical consultation you require.</p>
            {errors.service && <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginBottom: 16 }}>{errors.service}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {SERVICES.map(({ id, icon: Icon, label, duration }) => {
                const selected = data.service === id
                return (
                  <button
                    key={id}
                    onClick={() => update('service', id)}
                    style={{
                      background: selected ? 'var(--orange-light)' : '#fff',
                      border: `2px solid ${selected ? 'var(--orange)' : 'var(--border)'}`,
                      borderRadius: 12, padding: '20px 16px',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s', position: 'relative',
                    }}
                  >
                    {selected && (
                      <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={11} color="#fff" />
                      </div>
                    )}
                    <div style={{ width: 40, height: 40, background: selected ? 'var(--orange)' : 'var(--orange-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                      <Icon size={18} color={selected ? '#fff' : 'var(--orange)'} />
                    </div>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', color: 'var(--black)', marginBottom: 4, lineHeight: 1.3 }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Approx. {duration}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>Select Date &amp; Time</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Choose your preferred appointment day and time slot at Dr. Abedah&#39;s Sono Healthcare.</p>

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={15} color="var(--orange)" /> Appointment Date
              </div>
              {errors.date && <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginBottom: 12 }}>{errors.date}</div>}
              <MiniCalendar value={data.date} onChange={d => update('date', d)} />
              {data.date && (
                <div style={{ marginTop: 12, padding: '12px 16px', background: 'var(--orange-light)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={16} color="var(--orange)" />
                  <span style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '0.875rem', color: 'var(--orange-dark)' }}>
                    {data.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={15} color="var(--orange)" /> Appointment Time
              </div>
              {errors.time && <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginBottom: 12 }}>{errors.time}</div>}
              <div style={{ marginBottom: 8, fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Morning Shift</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10, marginBottom: 20 }}>
                {MORNING_SLOTS.map(slot => (
                  <button
                    key={slot}
                    disabled={UNAVAILABLE.includes(slot)}
                    onClick={() => update('time', slot)}
                    className={`time-slot ${UNAVAILABLE.includes(slot) ? 'unavailable' : ''} ${data.time === slot ? 'selected' : ''}`}
                    style={{ border: 'none', cursor: UNAVAILABLE.includes(slot) ? 'not-allowed' : 'pointer' }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div style={{ marginBottom: 8, fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Afternoon / Evening Shift</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10 }}>
                {AFTERNOON_SLOTS.map(slot => (
                  <button
                    key={slot}
                    disabled={UNAVAILABLE.includes(slot)}
                    onClick={() => update('time', slot)}
                    className={`time-slot ${UNAVAILABLE.includes(slot) ? 'unavailable' : ''} ${data.time === slot ? 'selected' : ''}`}
                    style={{ border: 'none', cursor: UNAVAILABLE.includes(slot) ? 'not-allowed' : 'pointer' }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {data.time && (
                <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--orange-light)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Clock size={16} color="var(--orange)" />
                  <span style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '0.875rem', color: 'var(--orange-dark)' }}>
                    Selected Time Slot: {data.time}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>Review Appointment Details</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Please double check all information before confirming your appointment request.</p>
            <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ background: 'var(--orange)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope', fontWeight: 800, color: '#fff', fontSize: '1.2rem' }}>A</div>
                <div>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>Dr. Abedah&#39;s Sono Healthcare</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)' }}>Dr. Abedah Begum Fazlur · Consultant Sonologist (BMDC: A-56758)</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>43 East Stadium Market (Ground Floor), Rikabibazar, Sylhet</div>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                {[
                  ['Patient Name', data.name],
                  ['Service Requested', selectedService?.label || ''],
                  ['Preferred Date', data.date ? data.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''],
                  ['Preferred Time', data.time],
                  ['Contact Phone', data.phone],
                  ['Email Address', data.email],
                  ...(data.notes ? [['Notes', data.notes]] : []),
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 120, paddingTop: 1 }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text)', flex: 1, lineHeight: 1.5 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 16, lineHeight: 1.6 }}>
              Note: You will receive a direct confirmation call or SMS from Dr. Abedah&#39;s Sono Healthcare staff to confirm the time slot and provide scan preparation instructions (e.g., full bladder for pelvic scans / fasting for whole abdomen).
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, gap: 16 }}>
          {step > 1 ? (
            <button onClick={back} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronLeft size={16} /> Back
            </button>
          ) : <div />}
          {step < 4 ? (
            <button onClick={next} className="btn-primary">
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={confirm} className="btn-primary" style={{ padding: '14px 32px' }}>
              Confirm Appointment Request <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
