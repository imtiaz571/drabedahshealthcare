import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Globe, ArrowRight, Send, CheckCircle, Award } from 'lucide-react'

const FbIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const GlobeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="fade-up">{children}</div>
}

interface ContactForm {
  name: string; email: string; phone: string; subject: string; message: string
}
type Errs = Partial<Record<keyof ContactForm, string>>

const contactInfo = [
  { icon: Phone, label: 'Clinic Hotlines', value: '+880 1727 414 991', sub: '+88 09611 656906 (Call / WhatsApp)' },
  { icon: Mail, label: 'Direct Email', value: 'abedahb21@gmail.com', sub: 'For inquiries and report questions' },
  { icon: MapPin, label: 'Clinic Address', value: '43 East Stadium Market (Ground Floor)', sub: 'Rikabibazar, Sylhet, Bangladesh' },
  { icon: Globe, label: 'Official Website', value: 'www.drabedahshealthcare.com', sub: 'Online booking & information' },
]

const hours = [
  { day: 'Saturday – Thursday', time: '9:00 AM – 8:00 PM', open: true },
  { day: 'Friday', time: '3:00 PM – 8:00 PM (By Appointment)', open: true },
  { day: 'Emergency Scan Calls', time: '24/7 Hotline Available', open: true },
]

const socials = [
  { icon: FbIcon, label: 'Facebook Page', href: 'https://facebook.com/drabedahshealthcare', display: 'facebook/drabedahshealthcare' },
  { icon: GlobeIcon, label: 'Website', href: 'https://www.drabedahshealthcare.com', display: 'www.drabedahshealthcare.com' },
]

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errs>({})
  const [sent, setSent] = useState(false)

  const update = (key: keyof ContactForm, val: string) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  const validate = (): Errs => {
    const e: Errs = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSent(true)
  }

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--black)', paddingTop: 72, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: '-5%', bottom: '-20%',
          width: 400, height: 400, background: 'var(--orange)', borderRadius: '50%', opacity: 0.08,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 32px', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Get In Touch</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: 16 }}>
            Contact Dr. Abedah's Sono Healthcare
          </h1>
          <div style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 12 }}>
            Giving Your Disease A Name · Rikabibazar, Sylhet
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 580, lineHeight: 1.75 }}>
            Need an ultrasound scan, second opinion on imaging, or a clinical consultation? Contact our clinic directly or send us a message below.
          </p>
        </div>
        <div style={{ height: 40, background: 'var(--off-white)', clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── CONTACT INFO + MAP ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <FadeSection>
            <div>
              <div className="section-label" style={{ marginBottom: 16 }}>Clinic Information</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 24 }}>Reach Us in Sylhet</h2>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 8, marginBottom: 28 }}>
                <Award size={16} color="var(--orange)" />
                <span style={{ fontSize: '0.85rem', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--black)' }}>
                  Dr. Abedah Begum Fazlur · BMDC Reg: A-56758
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 52, height: 52, background: 'var(--orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.95rem', color: 'var(--black)' }}>{value}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ marginTop: 36 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Online Channels</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {socials.map(({ icon: Icon, label, href, display }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: '#fff', border: '1px solid var(--border)',
                        padding: '10px 16px', borderRadius: 8,
                        color: 'var(--black)', textDecoration: 'none',
                        transition: 'all 0.2s', maxWidth: 360,
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'var(--orange)'
                        el.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'var(--border)'
                        el.style.transform = ''
                      }}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                        <Icon />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>{label}</div>
                        <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem' }}>{display}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={100}>
            <div className="map-placeholder" style={{ height: 360, marginBottom: 24 }}>
              <iframe title="Dr. Abedah's Sono Healthcare location" src="https://www.google.com/maps?q=Dr.+Abedah%27s+Sono+Healthcare,+43+East+Stadium+Market,+Rikabibazar,+Sylhet,+Bangladesh&output=embed" style={{ width: '100%', height: '100%', border: 0, borderRadius: 12 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>

            {/* Opening hours */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid var(--border)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Clock size={18} color="var(--orange)" />
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1rem', color: 'var(--black)' }}>Clinic Working Hours</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {hours.map(({ day, time, open }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{day}</span>
                    <span style={{
                      fontFamily: 'Manrope', fontWeight: 700,
                      color: open ? 'var(--black)' : '#e05252',
                      background: open ? 'var(--orange-light)' : '#fff5f5',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}>{time}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--orange-light)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--orange-dark)', fontWeight: 600 }}>
                For emergency scans or doctor referral coordination, call: <strong>+880 1727 414 991</strong>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Send a Message</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Inquiry &amp; Support</h2>
              <p style={{ color: 'var(--muted)', marginTop: 8 }}>Have a question about scan preparation, fees, or appointment scheduling?</p>
            </div>
          </FadeSection>

          {sent ? (
            <FadeSection>
              <div style={{ textAlign: 'center', padding: '60px 40px', background: 'var(--off-white)', borderRadius: 16, border: '1.5px solid var(--border)' }}>
                <div style={{ width: 64, height: 64, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={28} color="#fff" />
                </div>
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.4rem', marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
                  Thank you, {form.name.split(' ')[0]}. Your message has been sent to Dr. Abedah's Sono Healthcare team. We will get back to you at <strong>{form.email}</strong> or <strong>{form.phone}</strong> shortly.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} className="btn-primary">
                  Send Another Message
                </button>
              </div>
            </FadeSection>
          ) : (
            <FadeSection delay={100}>
              <form onSubmit={submit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  {([
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Shamima Akther' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'shamima@example.com' },
                    { key: 'phone', label: 'Phone (WhatsApp)', type: 'tel', placeholder: '+880 17XX XXXXXX' },
                    { key: 'subject', label: 'Subject / Scan Type', type: 'text', placeholder: 'TVS / Anomaly Scan / Consult Inquiry' },
                  ] as { key: keyof ContactForm; label: string; type: string; placeholder: string }[]).map(({ key, label, type, placeholder }) => (
                    <div key={key} className="form-field">
                      <label htmlFor={key}>{label}</label>
                      <input
                        id={key}
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={e => update(key, e.target.value)}
                        className={errors[key] ? 'error' : ''}
                      />
                      {errors[key] && <div className="error-msg">{errors[key]}</div>}
                    </div>
                  ))}
                </div>
                <div className="form-field" style={{ marginBottom: 28 }}>
                  <label htmlFor="message">Message / Details</label>
                  <textarea
                    id="message"
                    placeholder="Write your inquiry, doctor prescription details, or preferred appointment timing..."
                    rows={5}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    className={errors.message ? 'error' : ''}
                    style={{ resize: 'vertical' }}
                  />
                  {errors.message && <div className="error-msg">{errors.message}</div>}
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            </FadeSection>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: 'var(--orange)', padding: 'clamp(60px, 8vw, 80px) 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: '#fff', borderRadius: '50%', opacity: 0.08 }} />
        <FadeSection>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', marginBottom: 16 }}>
            Ready to Book Your Diagnostic Scan?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 32, fontSize: '1.05rem', maxWidth: 600, margin: '0 auto 32px' }}>
            "Giving Your Disease A Name" with high-precision sonology and compassionate care in Rikabibazar, Sylhet.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn-outline-white">
              Book an Appointment Online <ArrowRight size={16} />
            </Link>
            <a href="tel:+8801727414991" className="btn-outline-white" style={{ background: '#fff', color: 'var(--orange)' }}>
              Call: +880 1727 414 991
            </a>
          </div>
        </FadeSection>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          form > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
