import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

// Code-split the secondary routes so the landing page ships a minimal bundle.
// Firebase (used by Appointment/Contact/Admin) now loads only when those
// routes are visited, instead of on every initial page load.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Appointment = lazy(() => import('./pages/Appointment'))
const Contact = lazy(() => import('./pages/Contact'))
const Admin = lazy(() => import('./pages/Admin'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])
  return null
}

function RouteFallback() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '3px solid var(--border)', borderTopColor: 'var(--orange)',
          animation: 'routeSpin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes routeSpin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  // Keep existing shared hash links working after switching to clean URLs.
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', window.location.hash.slice(1))
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<PublicSite />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

function PublicSite() {
  return <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
    <Footer />
  </div>
}
