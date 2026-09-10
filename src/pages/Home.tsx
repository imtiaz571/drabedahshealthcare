import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Activity, Shield, Award,
  Star, MapPin, Phone, Mail, Clock, ChevronRight, Stethoscope, Sparkles, CheckCircle2
} from 'lucide-react'

const DOCTOR_IMG = 'https://source.unsplash.com/sJ_X9O0i104/560x680'
const ABOUT_IMG = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=560&h=500&fit=crop&auto=format'

const stats = [
  { value: '10+', label: 'Years Clinical Experience' },
  { value: '20,000+', label: 'Ultrasounds & Scans' },
  { value: 'BMDC', label: 'Reg. No. A-56758' },
  { value: '100%', label: 'Dedicated Diagnostic Care' },
]

const services = [
  {
    icon: Activity,
    title: 'Transvaginal Sonography (TVS)',
    desc: 'High-resolution deep pelvic visualization for early pregnancy confirmation, ovarian follicles, uterine health, and pelvic pain diagnosis.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Obstetrical Ultrasound',
    desc: 'Detailed fetal anomaly scans, 3D/4D scans, biophysical profiles, growth monitoring, and placental Doppler evaluation.',
  },
  {
    icon: Shield,
    title: 'Duplex & Vascular Doppler Study',
    desc: 'Precision vascular hemodynamics assessment including arterial, venous, carotid, and renal blood flow Doppler studies.',
  },
  {
    icon: Award,
    title: 'Musculoskeletal (MSK) Ultrasound',
    desc: 'Specialized dynamic evaluation of joints, tendons, muscles, ligaments, and soft tissue pathologies.',
  },
]

const features = [
  { icon: Stethoscope, title: 'Trained in Medicine & Gynaecology', desc: 'Combines deep clinical medical insight with advanced diagnostic ultrasound for holistic patient evaluations.' },
  { icon: Shield, title: 'Precision Ultrasound Diagnostics', desc: 'State-of-the-art sonography technology delivering clear imaging to give your disease an accurate name.' },
  { icon: Award, title: 'BMDC Registered Specialist', desc: 'BMDC Reg: A-56758 with qualifications from SUST, DIU, CMUD, BIRDEM, and Sylhet MAG Osmani Medical College.' },
  { icon: CheckCircle2, title: 'Patient-First Compassionate Care', desc: 'Detailed, empathetic consultations with clear report explanations and actionable next steps.' },
]

const testimonials = [
  {
    text: "Dr. Abedah's ultrasound report was so detailed and accurate that my surgeon was able to diagnose my issue immediately. Her gentle and reassuring approach made me feel so comfortable.",
    name: 'Shamima Akther',
    service: 'Transvaginal Sonography (TVS)',
  },
  {
    text: "We had our detailed anomaly pregnancy scan with Dr. Abedah Fazlur. She explained every detail with extreme patience and care. The best sonologist in Sylhet!",
    name: 'Rehana & Farhan Chowdhury',
    service: 'Advanced Obstetrical Ultrasound',
  },
  {
    text: "Her duplex Doppler and musculoskeletal study gave us the exact clarity we needed. Highly knowledgeable, certified, and deeply professional.",
    name: 'Md. Tariqul Islam',
    service: 'Duplex & MSK Doppler Study',
  },
]

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}ms`
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        obs.disconnect()
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="fade-up">{children}</div>
}

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', background: 'var(--off-white)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: 72 }}>
        {/* Orange diagonal panel */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '52%',
          background: 'var(--orange)',
          clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
          zIndex: 0,
        }} />
        {/* Decorative dots */}
        <div style={{ position: 'absolute', top: 140, left: 60, opacity: 0.06, zIndex: 0 }}>
          {Array.from({ length: 6 }).map((_, r) => (
            <div key={r} style={{ display: 'flex', gap: 18, marginBottom: 18 }}>
              {Array.from({ length: 6 }).map((_, c) => (
                <div key={c} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--black)' }} />
              ))}
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Left: text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--orange-light)', border: '1px solid rgba(255,90,31,0.2)', padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)' }}></span>
              <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.8rem', color: 'var(--orange-dark)', letterSpacing: '0.04em' }}>
                BMDC REG NO: A-56758 · CONSULTANT SONOLOGIST
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', marginBottom: 8, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Dr. Abedah Begum Fazlur
            </h1>

            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--orange-dark)', marginBottom: 12 }}>
              MBBS (SUST) · DMU (DIU) · CMU (CMUD) · CCD (BIRDEM) · PGT (SOMCH)
            </div>

            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--black)', marginBottom: 16 }}>
              Dr. Abedah's Sono Healthcare — <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>"Giving Your Disease A Name"</span>
            </div>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#444', maxWidth: 520, marginBottom: 32 }}>
              Specialised in Transvaginal Sonography (TVS), Advanced Obstetrical Ultrasound, MSK &amp; Duplex Doppler Study. Trained in Medicine &amp; Gynaecology to provide comprehensive, high-precision diagnostics.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/appointment" className="btn-primary">
                Book Appointment <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline">
                Diagnostic Services
              </Link>
            </div>

            {/* Trust badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 36 }}>
              <div style={{ display: 'flex', gap: -4 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} fill="var(--orange)" color="var(--orange)" />
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                Trusted by <strong style={{ color: 'var(--black)' }}>thousands of patients</strong> in Sylhet &amp; beyond
              </span>
            </div>
          </div>

          {/* Right: doctor image */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* White circle behind image */}
            <div style={{
              width: 420, height: 500,
              borderRadius: '60% 40% 50% 50% / 50% 50% 60% 40%',
              background: 'rgba(255,255,255,0.15)',
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
            <img
              src={DOCTOR_IMG}
              alt="Dr. Abedah Begum Fazlur, Consultant Sonologist"
              style={{
                width: 380, height: 480,
                objectFit: 'cover',
                borderRadius: '48% 52% 40% 60% / 50% 40% 60% 50%',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
              }}
            />
            {/* Floating card */}
            <div style={{
              position: 'absolute', bottom: 30, left: -20, zIndex: 2,
              background: '#fff', borderRadius: 12, padding: '14px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 44, height: 44, background: 'var(--orange-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={22} color="var(--orange)" />
              </div>
              <div>
                <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '0.95rem', color: 'var(--black)' }}>Consultant Sonologist</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--orange-dark)', fontWeight: 600 }}>TVS, MSK &amp; Duplex Doppler</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 60L1440 0V60H0Z" fill="var(--off-white)" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--black)', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, textAlign: 'center' }}>
          {stats.map(({ value, label }) => (
            <FadeSection key={label}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--orange)', letterSpacing: '-0.02em' }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.04em' }}>{label}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <FadeSection>
            <div style={{ position: 'relative' }}>
              {/* Orange accent block */}
              <div style={{ position: 'absolute', top: -20, left: -20, width: '60%', height: '60%', background: 'var(--orange-light)', borderRadius: 12, zIndex: 0 }} />
              <img
                src={ABOUT_IMG}
                alt="Dr. Abedah performing ultrasound consultation"
                style={{ width: '100%', height: 460, objectFit: 'cover', borderRadius: 12, position: 'relative', zIndex: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
              />
            </div>
          </FadeSection>
          <FadeSection delay={150}>
            <div>
              <div className="section-label" style={{ marginBottom: 16 }}>About Dr. Abedah Begum Fazlur</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: 20 }}>
                Giving Your Disease A Name Through Precision Imaging
              </h2>
              <p style={{ lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
                <strong>Dr. Abedah Begum Fazlur</strong> is a dedicated Consultant Sonologist practicing at <em>Dr. Abedah's Sono Healthcare</em> in Sylhet. With post-graduate training (PGT) at Sylhet MAG Osmani Medical College &amp; Hospital and medical ultrasound credentials (DMU, CMU), she brings rigorous clinical excellence to every patient.
              </p>
              <p style={{ lineHeight: 1.8, color: '#555', marginBottom: 28 }}>
                Trained in Medicine and Gynaecology, she specializes in advanced Transvaginal Sonography (TVS), detailed Obstetrical ultrasound, Musculoskeletal (MSK) evaluation, and vascular Duplex study, providing clear diagnostic answers for targeted recovery.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginBottom: 32 }}>
                {[
                  { label: 'Degrees', value: 'MBBS (SUST), DMU, CMU' },
                  { label: 'Specialization', value: 'TVS, Obstetrical, MSK, Duplex' },
                  { label: 'Diabetes Care', value: 'CCD (BIRDEM)' },
                  { label: 'Training', value: 'PGT (SOMCH)' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: '#fff', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>{label}</div>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.9rem', color: 'var(--black)', marginTop: 2 }}>{value}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Learn More About Dr. Abedah <ChevronRight size={16} />
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 32px',
        background: 'var(--black)',
        clipPath: 'polygon(0 4%, 100% 0, 100% 96%, 0 100%)',
        marginTop: -40,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Diagnostic Excellence</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#fff', marginBottom: 16 }}>Specialized Sonology &amp; Ultrasound</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 580, margin: '0 auto' }}>
                Accurate, high-resolution ultrasound imaging tailored to women's health, pregnancy, vascular, and musculoskeletal needs.
              </p>
            </div>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {services.map(({ icon: Icon, title, desc }, i) => (
              <FadeSection key={title} delay={i * 80}>
                <div
                  className="service-card"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  <div style={{ width: 48, height: 48, background: 'var(--orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', marginBottom: 20 }}>{desc}</p>
                  <Link to="/services" style={{ color: 'var(--orange)', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Manrope' }}>
                    View Details <ChevronRight size={14} />
                  </Link>
                </div>
              </FadeSection>
            ))}
          </div>
          <FadeSection delay={200}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/services" className="btn-outline-white">
                View All Diagnostic Services <ArrowRight size={16} />
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Why Choose Us</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>Clinical Precision &amp; Genuine Care</h2>
            </div>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {features.map(({ icon: Icon, title, desc }, i) => (
              <FadeSection key={title} delay={i * 80}>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div style={{ flexShrink: 0, width: 52, height: 52, background: 'var(--orange-light)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color="var(--orange)" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--muted)' }}>{desc}</p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Patient Experiences</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>Trusted By Patients Across Sylhet</h2>
            </div>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map(({ text, name, service }, i) => (
              <FadeSection key={name} delay={i * 80}>
                <div className="testimonial-card">
                  <div style={{ display: 'flex', gap: 4, marginBottom: 20, marginTop: 12 }}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="var(--orange)" color="var(--orange)" />)}
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#555', marginBottom: 24, fontStyle: 'italic' }}>"{text}"</p>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.9rem', color: 'var(--black)' }}>{name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--orange)', fontWeight: 600, marginTop: 2 }}>{service}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT CTA ── */}
      <section style={{
        padding: 'clamp(80px, 10vw, 120px) 32px',
        background: 'var(--black)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative orange shape */}
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'var(--orange)',
          opacity: 0.1,
        }} />
        <div style={{
          position: 'absolute', left: -40, bottom: -80,
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'var(--orange)',
          opacity: 0.07,
        }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div className="section-label" style={{ marginBottom: 16 }}>Giving Your Disease A Name</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#fff', marginBottom: 20 }}>
              Need An Accurate Ultrasound &amp; Consultation?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: 40, lineHeight: 1.7 }}>
              Schedule your appointment at Dr. Abedah's Sono Healthcare today. High-precision imaging and compassionate clinical care are just one click away.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/appointment" className="btn-primary">
                Book an Appointment <ArrowRight size={16} />
              </Link>
              <a href="tel:+8801727414991" className="btn-outline-white">
                Call: +880 1727 414 991
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CONTACT PREVIEW ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <FadeSection>
            <div>
              <div className="section-label" style={{ marginBottom: 16 }}>Find Us</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 24 }}>Visit Dr. Abedah's Sono Healthcare</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: MapPin, label: 'Clinic Address', value: '43 East Stadium Market (Ground Floor), Rikabibazar Sylhet' },
                  { icon: Phone, label: 'Phone Numbers', value: '+880 1727 414 991, +88 09611 656906' },
                  { icon: Mail, label: 'Email', value: 'abedahb21@gmail.com' },
                  { icon: Clock, label: 'Official Website', value: 'www.drabedahshealthcare.com' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, background: 'var(--orange-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color="var(--orange)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: 'Manrope', fontWeight: 600, color: 'var(--black)', fontSize: '0.9375rem' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <Link to="/contact" className="btn-primary">
                  Contact Clinic <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </FadeSection>
          <FadeSection delay={150}>
            <div className="map-placeholder" style={{ height: 380 }}>
              <MapPin size={40} style={{ opacity: 0.4 }} />
              <p style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '1rem', opacity: 0.7 }}>43 East Stadium Market (Ground Floor)</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Rikabibazar, Sylhet, Bangladesh</p>
              <a
                href="https://maps.google.com/?q=Rikabibazar+Stadium+Market+Sylhet"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--orange)', color: '#fff',
                  padding: '10px 20px', borderRadius: 6,
                  fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem',
                  textDecoration: 'none', marginTop: 12,
                }}
              >
                Open in Google Maps <ArrowRight size={14} />
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
