import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  // Support both the hash URL and a direct /admin URL when the host rewrites to index.html.
  if (window.location.pathname === '/admin') return <Admin />

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </HashRouter>
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
