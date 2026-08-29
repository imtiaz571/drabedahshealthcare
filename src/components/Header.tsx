import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, marginRight: 'auto' }}>
            <div style={{
              width: 42, height: 42, background: 'var(--orange)', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 4px 14px rgba(255, 90, 31, 0.3)',
            }}>
              <span style={{ color: '#fff', fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.2rem' }}>A</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.05rem', color: 'var(--black)', lineHeight: 1.15 }}>
                Dr. Abedah's
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: 'var(--orange-dark)', fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Sono Healthcare
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} aria-label="Main navigation">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                style={{
                  fontFamily: 'Manrope',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: pathname === path ? 'var(--orange)' : 'var(--black)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 6,
                  transition: 'color 0.2s, background 0.2s',
                  background: pathname === path ? 'var(--orange-light)' : 'transparent',
                }}
                onMouseEnter={e => { if (pathname !== path) (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
                onMouseLeave={e => { if (pathname !== path) (e.currentTarget as HTMLElement).style.color = 'var(--black)' }}
              >
                {label}
              </Link>
            ))}
            <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 8px' }} />
            <a
              href="tel:+8801727414991"
              style={{
                fontFamily: 'Manrope',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--black)',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: 6,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(0,0,0,0.03)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--black)' }}
            >
              📞 01727-414991
            </a>
            <Link to="/appointment" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
              Book Appointment
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: 'var(--black)',
              marginLeft: 'auto',
            }}
            className="mobile-hamburger"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={28} />
        </button>
        {navLinks.map(({ label, path }) => (
          <Link key={path} to={path} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link to="/appointment" className="btn-primary" onClick={() => setMenuOpen(false)}>
          Book Appointment
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          header nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
