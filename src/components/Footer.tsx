import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Award } from 'lucide-react'

// Simple brand icon SVGs
const FbIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const GlobeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Dr. Abedah', path: '/about' },
  { label: 'Sonology & Services', path: '/services' },
  { label: 'Book Appointment', path: '/appointment' },
  { label: 'Contact Us', path: '/contact' },
]

const services = [
  'Transvaginal Sonography (TVS)',
  'Advanced Obstetrical Ultrasound',
  'MSK & Musculoskeletal Study',
  'Duplex & Vascular Doppler',
  'Abdominal & Pelvic Ultrasound',
  'Medicine & Gynaecology Consult',
]

const socials = [
  { icon: FbIcon, label: 'Facebook', href: 'https://facebook.com/drabedahshealthcare' },
  { icon: GlobeIcon, label: 'Website', href: 'https://www.drabedahshealthcare.com' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: '#fff', paddingTop: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, paddingBottom: 56 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, background: 'var(--orange)', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(255, 90, 31, 0.4)',
              }}>
                <span style={{ color: '#fff', fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.2rem' }}>A</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>Dr. Abedah's</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--orange)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>Sono Healthcare</div>
              </div>
            </Link>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,90,31,0.15)', border: '1px solid rgba(255,90,31,0.3)', padding: '4px 10px', borderRadius: 20, marginBottom: 14 }}>
              <Award size={12} color="var(--orange)" />
              <span style={{ fontSize: '0.75rem', color: '#ffb396', fontFamily: 'Manrope', fontWeight: 700 }}>BMDC Reg: A-56758</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginBottom: 12 }}>
              "Giving Your Disease A Name"
            </p>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              Specialised in TVS, Advanced Obstetrical Ultrasound, MSK &amp; Duplex Doppler study with clinical expertise in Medicine &amp; Gynaecology.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 38, height: 38,
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.75)',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'var(--orange)'
                    el.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.08)'
                    el.style.color = 'rgba(255,255,255,0.75)'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} style={{
                    color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem',
                    transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6,
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
                  >
                    <span style={{ color: 'var(--orange)', fontSize: 10 }}>▶</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>
              Diagnostic Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map(s => (
                <li key={s}>
                  <Link to="/services" style={{
                    color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Clinic Location */}
          <div>
            <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 20 }}>
              Clinic Info &amp; Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--orange)', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  43 East Stadium Market (Ground Floor), Rikabibazar, Sylhet
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Phone size={16} style={{ color: 'var(--orange)', marginTop: 2, flexShrink: 0 }} />
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  <div><a href="tel:+8801727414991" style={{ color: 'inherit', textDecoration: 'none' }}>+880 1727 414 991</a></div>
                  <div><a href="tel:+8809611656906" style={{ color: 'inherit', textDecoration: 'none' }}>+88 09611 656906</a></div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Mail size={16} style={{ color: 'var(--orange)', marginTop: 2, flexShrink: 0 }} />
                <a href="mailto:abedahb21@gmail.com" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  abedahb21@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Globe size={16} style={{ color: 'var(--orange)', marginTop: 2, flexShrink: 0 }} />
                <a href="https://www.drabedahshealthcare.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  www.drabedahshealthcare.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} Dr. Abedah's Sono Healthcare (drabedahshealthcare). All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
            Dr. Abedah Begum Fazlur · Consultant Sonology · Giving Your Disease A Name
          </p>
        </div>
      </div>
    </footer>
  )
}
