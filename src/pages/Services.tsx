import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X, Activity, Shield, Sparkles, Heart, ChevronRight, CheckCircle, Stethoscope, Layers } from 'lucide-react'

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

const services = [
  {
    icon: Activity,
    title: 'Transvaginal Sonography (TVS)',
    desc: 'High-frequency deep pelvic imaging offering unmatched resolution for early pregnancy, uterus, ovaries, and endometrium.',
    overview: 'Transvaginal Sonography (TVS) allows close-up acoustic visualization of pelvic reproductive organs with exceptional detail. Dr. Abedah Begum Fazlur performs TVS with gentle clinical expertise to evaluate early intrauterine pregnancies, ectopic pregnancies, ovarian cysts, PCOD/PCOS, uterine fibroids, and endometrial thickness.',
    includes: [
      'Early pregnancy confirmation & viability',
      'Follicular tracking & ovulation monitoring',
      'Uterine fibroid & adenomyosis evaluation',
      'Ovarian cyst & PCOS assessment',
      'Endometrial thickness measurement',
      'Investigation of abnormal uterine bleeding',
    ],
    benefits: [
      'Early pregnancy evaluation (5-10 weeks)',
      'Couples undergoing fertility evaluation',
      'Women with irregular menstrual cycles or PCOD',
      'Patients with chronic or acute pelvic pain',
    ],
  },
  {
    icon: Sparkles,
    title: 'Advanced Obstetrical Ultrasound',
    desc: 'Comprehensive pregnancy imaging including early scans, detailed 2nd trimester anomaly scans, 3D/4D views, and fetal wellbeing.',
    overview: 'From early viability to term delivery, advanced obstetrical ultrasound is vital for monitoring fetal growth, organ development, and maternal health. Dr. Abedah provides thorough anomaly scans, placental localization, amniotic fluid quantification, and umbilical Doppler studies.',
    includes: [
      'Dating & viability scans (1st trimester)',
      'Detailed Level-II anomaly scan (18-22 weeks)',
      'Fetal growth & biophysical profile (BPP)',
      'Placental localization & amniotic fluid index',
      'Umbilical & uterine artery Doppler studies',
      '3D / 4D fetal surface visualization',
    ],
    benefits: [
      'All expectant mothers at key gestational milestones',
      'High-risk pregnancies (hypertension, diabetes, twins)',
      'Mothers with previous pregnancy complications',
      'Detailed screening for fetal congenital anomalies',
    ],
  },
  {
    icon: Shield,
    title: 'Duplex & Vascular Doppler Study',
    desc: 'Non-invasive hemodynamic blood flow evaluations for peripheral arteries, deep veins, carotid vessels, and renal vasculature.',
    overview: 'Color Doppler and Duplex ultrasound evaluate the direction and velocity of blood flow across critical vessels. Dr. Abedah utilizes Doppler technology to detect arterial stenosis, deep vein thrombosis (DVT), varicose veins, carotid plaque vulnerability, and renal artery stenosis.',
    includes: [
      'Lower & upper limb arterial Doppler study',
      'Lower & upper limb venous Doppler (DVT & incompetence)',
      'Carotid & vertebral artery Doppler (stroke prevention)',
      'Renal artery Doppler (renovascular hypertension)',
      'Portal vein & hepatic vascular flow analysis',
      'Scrotal & testicular Doppler for varicocele/torsion',
    ],
    benefits: [
      'Patients with leg swelling, pain, or varicose veins',
      'Individuals with suspected arterial blockages or claudication',
      'Stroke/TIA patients needing carotid screening',
      'Patients with uncontrolled hypertension or kidney disease',
    ],
  },
  {
    icon: Layers,
    title: 'Musculoskeletal (MSK) Ultrasound',
    desc: 'High-precision dynamic evaluation of muscles, tendons, ligaments, nerves, and joints for pain, tears, or inflammation.',
    overview: 'MSK ultrasound provides real-time dynamic imaging of soft tissues and joint structures without radiation. Dr. Abedah evaluates shoulder rotator cuff tears, Achilles tendonitis, tennis/golfer elbow, carpal tunnel syndrome, joint effusions, and soft tissue masses.',
    includes: [
      'Shoulder joint & rotator cuff tendon assessment',
      'Knee joint, patellar tendon & ligament evaluation',
      'Ankle, Achilles tendon & plantar fascia imaging',
      'Elbow, wrist & hand tendon/nerve evaluation',
      'Soft tissue ganglion, cyst & lipoma mapping',
      'Real-time dynamic muscle & tendon movement assessment',
    ],
    benefits: [
      'Athletes and active individuals with sports injuries',
      'Patients with chronic shoulder, knee, or wrist pain',
      'Individuals with suspected tendon tears or bursitis',
      'Patients experiencing joint swelling or stiffness',
    ],
  },
  {
    icon: Heart,
    title: 'Whole Abdomen & Pelvic Ultrasound',
    desc: 'Thorough acoustic examination of abdominal organs including liver, gallbladder, kidneys, pancreas, spleen, and bladder.',
    overview: 'Abdominal ultrasound is the frontline diagnostic scan for internal abdominal and urinary system complaints. Dr. Abedah provides meticulous organ-by-organ evaluation to identify gallstones, fatty liver, kidney stones, pancreatitis, splenomegaly, and urinary retention.',
    includes: [
      'Liver parenchyma & fatty liver grading',
      'Gallbladder stones & cholecystitis screening',
      'Kidney, ureter & bladder (KUB) stone detection',
      'Pancreas, spleen & mesenteric lymph nodes',
      'Prostate gland volume & post-void residual urine',
      'Ascites & peritoneal fluid collection detection',
    ],
    benefits: [
      'Patients with abdominal pain, dyspepsia, or acidity',
      'Individuals with suspected kidney or gallbladder stones',
      'Patients monitoring fatty liver, hepatitis, or diabetes',
      'Elderly males with urinary frequency or prostate symptoms',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Medicine, Gynaecology & Diabetes Care',
    desc: 'Clinical consultation integrating general medical health, women\'s wellness, and BIRDEM-certified diabetic care.',
    overview: 'Backed by PGT training at Sylhet MAG Osmani Medical College & Hospital and CCD from BIRDEM, Dr. Abedah Begum Fazlur delivers comprehensive clinical consultations. She correlates ultrasound imaging findings with full clinical examination and personalized treatment plans.',
    includes: [
      'Comprehensive medical & physical examination',
      'Gynaecological complaints & menstrual irregularities',
      'BIRDEM-certified diabetes screening & management',
      'Hypertension & metabolic disorder counseling',
      'Holistic clinical correlation with ultrasound findings',
      'Preventive lifestyle & nutritional guidance',
    ],
    benefits: [
      'Patients seeking primary physician consultation in Sylhet',
      'Women needing compassionate gynaecological advice',
      'Diabetic patients seeking structured metabolic control',
      'Patients seeking seamless diagnosis and treatment planning',
    ],
  },
]

export default function Services() {
  const [modal, setModal] = useState<typeof services[0] | null>(null)

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--black)', paddingTop: 72, position: 'relative', overflow: 'hidden' }}>
        {/* Orange diagonal */}
        <div style={{
          position: 'absolute', right: 0, top: 0, height: '100%', width: '35%',
          background: 'var(--orange)',
          clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 0.12,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 32px', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Diagnostic Services</div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: 16 }}>
            Sonology &amp; Ultrasound Specialties
          </h1>
          <div style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 12 }}>
            Dr. Abedah's Sono Healthcare — Giving Your Disease A Name
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 620, lineHeight: 1.75 }}>
            Expert diagnostic ultrasound scans performed by Dr. Abedah Begum Fazlur, Consultant Sonologist (BMDC Reg: A-56758). High-resolution TVS, Obstetrics, MSK, Doppler &amp; Clinical Consultations in Sylhet.
          </p>
        </div>
        <div style={{ height: 40, background: 'var(--off-white)', clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 32px', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <FadeSection key={svc.title} delay={i * 60}>
                  <div className="service-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ width: 56, height: 56, background: 'var(--orange)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                      <Icon size={26} color="#fff" />
                    </div>
                    <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.15rem', marginBottom: 12, color: 'var(--black)' }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: 24, flex: 1 }}>{svc.desc}</p>
                    <button
                      onClick={() => setModal(svc)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        color: 'var(--orange)', background: 'none', border: 'none',
                        fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem',
                        cursor: 'pointer', padding: 0, transition: 'gap 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '6px' }}
                    >
                      View Details &amp; Scope <ChevronRight size={14} />
                    </button>
                  </div>
                </FadeSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--black)', padding: 'clamp(60px, 8vw, 100px) 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'var(--orange)', borderRadius: '50%', opacity: 0.05 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div className="section-label" style={{ marginBottom: 16 }}>Accurate Imaging · Prompt Care</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#fff', marginBottom: 16 }}>
              Have A Doctor's Prescription for An Ultrasound?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>
              Book your scan with Dr. Abedah Begum Fazlur at Dr. Abedah's Sono Healthcare, Rikabibazar, Sylhet.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/appointment" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
                Book Your Scan Online <ArrowRight size={16} />
              </Link>
              <a href="tel:+8801727414991" className="btn-outline-white" style={{ fontSize: '1rem', padding: '16px 36px' }}>
                Call: +880 1727 414 991
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── MODAL ── */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${modal.title} details`}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setModal(null)}
          />
          <div style={{
            position: 'relative', background: '#fff', borderRadius: 16, maxWidth: 680, width: '100%',
            maxHeight: '90vh', overflowY: 'auto', padding: '40px',
            boxShadow: '0 40px 120px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.3s ease',
          }}>
            <button
              onClick={() => setModal(null)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'var(--border)', border: 'none', borderRadius: '50%',
                width: 36, height: 36, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e0dcd5' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--border)' }}
            >
              <X size={16} />
            </button>

            {/* Icon + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, background: 'var(--orange)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <modal.icon size={24} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.35rem', color: 'var(--black)' }}>{modal.title}</h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--orange-dark)', fontWeight: 600 }}>Dr. Abedah's Sono Healthcare</div>
              </div>
            </div>

            <p style={{ lineHeight: 1.8, color: '#555', marginBottom: 24 }}>{modal.overview}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
              <div>
                <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', color: 'var(--black)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  What This Scan Covers
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {modal.includes.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>
                      <CheckCircle size={14} color="var(--orange)" style={{ marginTop: 3, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', color: 'var(--black)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Recommended For
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {modal.benefits.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>
                      <ArrowRight size={12} color="var(--orange)" style={{ marginTop: 4, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link to="/appointment" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setModal(null)}>
              Book This Scan / Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
