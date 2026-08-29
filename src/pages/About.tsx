import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, BookOpen, Heart, Shield, CheckCircle, Activity, Sparkles } from 'lucide-react'

const DOCTOR_IMG = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=560&h=660&fit=crop&auto=format'

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

const timeline = [
  {
    year: 'MBBS',
    title: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
    institution: 'Shahjalal University of Science and Technology (SUST)',
    desc: 'Core medical graduation establishing extensive foundation in internal medicine, physiology, and pathology.',
  },
  {
    year: 'PGT',
    title: 'Post-Graduate Training (PGT)',
    institution: 'Sylhet MAG Osmani Medical College & Hospital (SOMCH)',
    desc: 'Intensive clinical post-graduate training with comprehensive exposure in Medicine and Gynaecology.',
  },
  {
    year: 'DMU',
    title: 'Diploma in Medical Ultrasound (DMU)',
    institution: 'Dhaka International University (DIU-Dhaka)',
    desc: 'Advanced specialized diagnostic sonography training covering abdominopelvic, obstetric, and superficial organ scans.',
  },
  {
    year: 'CMU',
    title: 'Certificate in Medical Ultrasound (CMU)',
    institution: 'Centre for Medical Ultrasound & Diagnostics (CMUD-Dhaka)',
    desc: 'Focused practical expertise in modern diagnostic ultrasound methodologies and high-resolution imaging.',
  },
  {
    year: 'CCD',
    title: 'Certificate Course on Diabetology (CCD)',
    institution: 'BIRDEM Academy, Dhaka',
    desc: 'Specialized clinical knowledge in comprehensive diabetes screening, management, and metabolic health.',
  },
  {
    year: 'BMDC',
    title: 'BMDC Full Registration (Reg No. A-56758)',
    institution: 'Bangladesh Medical & Dental Council',
    desc: 'Certified and licensed medical practitioner delivering evidence-based diagnostic healthcare.',
  },
]

const credentials = [
  { icon: Award, title: 'BMDC Registered Doctor', desc: 'Permanent registration A-56758 with Bangladesh Medical & Dental Council' },
  { icon: Sparkles, title: 'TVS Ultrasound Specialist', desc: 'Transvaginal Sonography for high-resolution early pregnancy & gynecological evaluation' },
  { icon: Shield, title: 'Advanced Obstetrical Sonology', desc: 'Detailed fetal anomaly scan, 3D/4D scans, and maternal-fetal wellbeing' },
  { icon: Activity, title: 'MSK & Duplex Doppler Study', desc: 'Precision musculoskeletal joint/soft tissue & vascular hemodynamics assessment' },
  { icon: BookOpen, title: 'Medicine & Gynaecology Trained', desc: 'PGT from Sylhet MAG Osmani Medical College & Hospital' },
  { icon: Heart, title: 'Diabetology Trained (BIRDEM)', desc: 'CCD (BIRDEM) certified for clinical diabetic and metabolic management' },
]

const experienceStats = [
  { value: '10+', label: 'Years Clinical Experience' },
  { value: '20,000+', label: 'Sonology Scans Performed' },
  { value: 'A-56758', label: 'BMDC Registration' },
  { value: '100%', label: 'Dedicated Diagnostic Focus' },
]

export default function About() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--black)', position: 'relative', overflow: 'hidden', paddingTop: 72 }}>
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%',
          background: 'var(--orange)', opacity: 0.08,
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 32px', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Profile &amp; Credentials</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: 16, maxWidth: 800 }}>
            Dr. Abedah Begum Fazlur
          </h1>
          <div style={{ color: 'var(--orange)', fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.1rem', marginBottom: 12 }}>
            Consultant Sonologist · Dr. Abedah's Sono Healthcare
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 620, lineHeight: 1.75 }}>
            Trained in Medicine &amp; Gynaecology, specialized in TVS, Advanced Obstetrical Ultrasound, MSK &amp; Duplex Doppler Study. Devoted to "Giving Your Disease A Name" through diagnostic precision in Sylhet.
          </p>
        </div>
        <div style={{ height: 40, background: 'var(--off-white)', clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── BIOGRAPHY ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <FadeSection>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: -24, right: -24,
                width: 200, height: 200,
                background: 'var(--orange)',
                borderRadius: 12,
                zIndex: 0,
                opacity: 0.15,
              }} />
              <img
                src={DOCTOR_IMG}
                alt="Dr. Abedah Begum Fazlur"
                style={{ width: '100%', height: 560, objectFit: 'cover', borderRadius: 12, position: 'relative', zIndex: 1, boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }}
              />
              {/* Floating quote badge */}
              <div style={{
                position: 'absolute', top: 32, right: -20, zIndex: 2,
                background: 'var(--orange)', borderRadius: 12, padding: '16px 20px',
                maxWidth: 220, boxShadow: '0 8px 32px rgba(255,90,31,0.3)',
              }}>
                <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.85rem', color: '#fff', lineHeight: 1.4 }}>
                  "Giving Your Disease A Name is the first step to healing."
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={150}>
            <div>
              <div className="section-label" style={{ marginBottom: 16 }}>Clinical Background</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: 24 }}>
                Diagnostic Accuracy Driven By Knowledge &amp; Empathy
              </h2>
              <p style={{ lineHeight: 1.85, color: '#555', marginBottom: 16 }}>
                <strong>Dr. Abedah Begum Fazlur</strong> completed her medical graduation (MBBS) at the prestigious <strong>Shahjalal University of Science and Technology (SUST)</strong>. She subsequently underwent rigorous clinical Post-Graduate Training (PGT) at <strong>Sylhet MAG Osmani Medical College &amp; Hospital (SOMCH)</strong> in Medicine and Gynaecology.
              </p>
              <p style={{ lineHeight: 1.85, color: '#555', marginBottom: 16 }}>
                Passionate about diagnostic imaging, Dr. Abedah achieved specialized diplomas and certifications in medical sonography including <strong>DMU (DIU-Dhaka)</strong> and <strong>CMU (CMUD-Dhaka)</strong>. She also earned her <strong>CCD</strong> from <strong>BIRDEM</strong> for comprehensive diabetes management.
              </p>
              <p style={{ lineHeight: 1.85, color: '#555', marginBottom: 28 }}>
                As Consultant Sonologist at <strong>Dr. Abedah's Sono Healthcare</strong> in Rikabibazar, Sylhet, she specializes in Transvaginal Sonography (TVS), detailed Obstetrical ultrasound, Musculoskeletal (MSK) evaluation, and vascular Duplex study. Her clinical background enables her to provide deep clinical correlation rather than merely technical imaging.
              </p>
              <div style={{ padding: '20px 24px', background: 'var(--orange-light)', borderLeft: '4px solid var(--orange)', borderRadius: '0 8px 8px 0', marginBottom: 32 }}>
                <p style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.95rem', color: 'var(--orange-dark)', lineHeight: 1.6, margin: 0 }}>
                  Clinic Slogan: "Giving Your Disease A Name" — Without an accurate diagnosis, treatment is merely guesswork. We provide definitive clarity so patients and doctors can take the right path forward.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/appointment" className="btn-primary">
                  Book Diagnostic Scan <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Clinic Information
                </Link>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── EXPERIENCE STATS ── */}
      <section style={{ background: 'var(--orange)', padding: '60px 32px', clipPath: 'polygon(0 4%, 100% 0, 100% 96%, 0 100%)', marginTop: -20, marginBottom: -20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
          {experienceStats.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#fff' }}>{value}</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginTop: 4, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION TIMELINE ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 32px', background: '#fff' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Academic &amp; Clinical Journey</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Degrees &amp; Qualifications</h2>
            </div>
          </FadeSection>
          {timeline.map(({ year, title, institution, desc }, i) => (
            <FadeSection key={title} delay={i * 70}>
              <div className="timeline-item">
                <div className="timeline-dot" style={{ fontSize: 10 }}>{year}</div>
                <div style={{ padding: '4px 0 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.05rem', color: 'var(--black)' }}>{title}</span>
                    <span style={{ fontSize: '0.75rem', background: 'var(--orange-light)', color: 'var(--orange-dark)', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>{year}</span>
                  </div>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.9rem', color: 'var(--orange)', marginBottom: 6 }}>{institution}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Specialization &amp; Expertise</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Clinical Competencies</h2>
            </div>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {credentials.map(({ icon: Icon, title, desc }, i) => (
              <FadeSection key={title} delay={i * 60}>
                <div style={{
                  background: '#fff', borderRadius: 12, padding: '24px', border: '1.5px solid var(--border)',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = '' }}
                >
                  <div style={{ width: 44, height: 44, background: 'var(--orange-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color="var(--orange)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.95rem', color: 'var(--black)', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ── */}
      <section style={{ background: 'var(--black)', padding: 'clamp(80px, 10vw, 120px) 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'var(--orange)', borderRadius: '50%', opacity: 0.05 }} />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <FadeSection>
            <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--orange)', lineHeight: 0.8, marginBottom: 24, opacity: 0.3 }}>"</div>
            <blockquote style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#fff', lineHeight: 1.4, margin: '0 0 24px', fontStyle: 'italic' }}>
              Giving Your Disease A Name.
            </blockquote>
            <div style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
              — Dr. Abedah Begum Fazlur, Consultant Sonology
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--orange)', marginTop: 6, fontWeight: 600 }}>
              Dr. Abedah's Sono Healthcare · Rikabibazar, Sylhet
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 640, margin: '32px auto 0' }}>
              High-resolution ultrasound imaging eliminates uncertainty, allowing physicians to choose the exact medication, therapy, or surgical plan required.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 32px', background: 'var(--off-white)', textAlign: 'center' }}>
        <FadeSection>
          <div className="section-label" style={{ marginBottom: 16 }}>Schedule Your Consultation</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: 20 }}>
            Need An Ultrasound Scan in Sylhet?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
            Book your appointment with Dr. Abedah Begum Fazlur at Dr. Abedah's Sono Healthcare today.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/appointment" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
              Book an Appointment <ArrowRight size={16} />
            </Link>
            <a href="tel:+8801727414991" className="btn-outline" style={{ fontSize: '1rem', padding: '16px 36px' }}>
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
          .timeline-item { padding-left: 40px; }
        }
      `}</style>
    </div>
  )
}
