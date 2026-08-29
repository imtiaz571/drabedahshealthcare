# FRONTEND DEVELOPMENT PROMPT — DR. ABIDA MEDICAL PORTFOLIO

Act as a **senior frontend developer and UI/UX engineer**.

Build a complete, production-quality **doctor portfolio + patient appointment booking website for Dr. Abida** using:

* HTML5
* CSS3
* Vanilla JavaScript
* Font Awesome or another lightweight icon library
* Google Fonts
* No React
* No Vue
* No Bootstrap
* No Tailwind CSS
* No backend

This is a **frontend-only project**. Use JavaScript to simulate appointment booking, form validation, navigation, and UI states.

---

# 🚨 CRITICAL REQUIREMENT

DO NOT create only a landing page.

Build the **ENTIRE MULTI-PAGE WEBSITE** with separate HTML pages.

Create these pages:

```text
/index.html
/about.html
/services.html
/appointment.html
/contact.html
```

The website must function as a complete frontend prototype.

All navigation links must work between the pages.

---

# PROJECT STRUCTURE

Create a clean structure like:

```text
dr-abida-website/
│
├── index.html
├── about.html
├── services.html
├── appointment.html
├── contact.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│
├── js/
│   ├── main.js
│   ├── appointment.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│
└── README.md
```

Use reusable CSS classes and JavaScript instead of duplicating code unnecessarily.

---

# DESIGN DIRECTION

The visual design should follow a **modern premium medical personal-brand aesthetic**.

The website should feel:

* Professional
* Trustworthy
* Warm
* Confident
* Modern
* Premium
* Approachable

Avoid the typical generic hospital website aesthetic.

Do NOT use the standard blue/green healthcare color scheme.

---

# COLOR PALETTE

Use:

### Primary Orange

```css
#FF5A1F
```

Use it for:

* Primary buttons
* CTA buttons
* Icons
* Highlights
* Active states
* Badges
* Decorative geometric shapes

### Black

```css
#111111
```

Use for:

* Headings
* Navigation
* Dark sections
* Footer
* Strong visual contrast

### Background

```css
#FAF9F6
```

Use warm off-white instead of pure white for major backgrounds.

Also use:

```css
#FFFFFF
```

for cards and clean content areas.

Use subtle neutral gray tones for borders, secondary text, and disabled states.

---

# TYPOGRAPHY

Use a modern sans-serif Google Font such as:

**Manrope**, **Inter**, or **Plus Jakarta Sans**.

Headings should be:

* Bold
* Large
* Confident
* Tight line-height

Body text should be:

* Clean
* Comfortable
* Highly readable

Create a consistent responsive typography scale.

---

# VISUAL LANGUAGE

The most important visual characteristic is the use of **diagonal geometric sections**.

Do NOT separate every section using straight horizontal boundaries.

Use CSS `clip-path`, pseudo-elements, transforms, or carefully positioned geometric elements to create:

* Diagonal orange panels
* Angled section transitions
* Asymmetrical layouts
* Overlapping cards
* Geometric backgrounds

The diagonal shapes should remain responsive and not cause horizontal scrolling.

---

# GLOBAL HEADER

Create the same header across every page.

Desktop:

```text
[Dr. Abida Logo]

Home
About
Services
Book Appointment
Contact

                    [Book Appointment]
```

Requirements:

* Sticky header
* Transparent/white appearance depending on section
* Active navigation state
* Smooth hover animation
* Orange CTA
* Mobile hamburger menu

On mobile:

```text
[Logo]                         [☰]
```

Opening the hamburger should display a full navigation menu.

---

# PAGE 1 — HOME

File:

```text
index.html
```

## Hero

Create a visually impressive hero using a **diagonal orange + white split layout**.

Left side:

```text
Dr. Abida
[Medical Specialty]

Compassionate healthcare backed by experience,
expertise, and personalized attention.

[Book an Appointment] [Explore Services]
```

Right side:

Professional doctor portrait.

Use a large diagonal orange background shape behind/around the image.

Do not use generic placeholder medical illustrations.

If an actual image is not provided, use a clearly labeled local placeholder image path such as:

```text
assets/images/dr-abida.jpg
```

Do not use random external image URLs.

---

## Trust Statistics

Create 3–4 statistics:

```text
X+
Years Experience

X,XXX+
Patients

XX
Certifications

XX
Medical Specialties
```

Use large typography and orange accents.

Do not invent real medical statistics. Keep them clearly configurable placeholders until real information is provided.

---

## About Preview

Create a split section:

Image | Introduction

Include:

* Short biography
* Education
* Experience
* Philosophy

CTA:

**Learn More About Dr. Abida**

---

## Featured Services

Display 4–6 services.

Each service should contain:

* Orange circular/hexagonal icon
* Service name
* Description
* Learn More link

CTA:

**View All Services**

---

## Why Choose Dr. Abida

Create 3–4 feature blocks:

* Patient-Centered Care
* Experienced Medical Guidance
* Personalized Treatment
* Evidence-Based Approach

Use orange icon badges.

---

## Testimonials Preview

Display 3 testimonial cards.

Each contains:

Orange quotation mark

Review text

Patient name

Optional service name

---

## Appointment CTA

Create a large black/orange geometric CTA section:

```text
Ready to Take the Next Step?

Schedule your consultation with Dr. Abida.

[Book an Appointment]
```

---

## Contact Preview

Show:

* Clinic address
* Phone
* Email
* Opening hours

Include a map placeholder.

---

## Footer

Include:

* Dr. Abida logo
* Short description
* Quick links
* Services
* Contact information
* Social icons
* Opening hours
* Copyright

---

# PAGE 2 — ABOUT

File:

```text
about.html
```

This must be a completely separate page.

## About Hero

Large:

```text
About Dr. Abida
```

Short introduction.

Use an asymmetrical image + orange diagonal composition.

---

## Biography

Create a detailed biography section.

Layout:

```text
[Doctor Image]       [Biography]
                     [Professional Story]
                     [Care Philosophy]
```

---

## Education & Training

Create a vertical timeline.

Example:

```text
2020
Medical Degree
University / Institution

2022
Residency / Advanced Training
Institution

2024
Professional Certification
Organization
```

Use configurable placeholder data.

---

## Credentials

Create credential cards with orange icon badges.

---

## Experience

Create a visually strong experience section with statistics and achievements.

---

## Philosophy

Create a large typography-focused quote section.

Example:

```text
"Healthcare begins with listening."
```

Then provide supporting text.

---

## CTA

```text
Ready to speak with Dr. Abida?

[Book an Appointment]
```

---

# PAGE 3 — SERVICES

File:

```text
services.html
```

## Hero

```text
Services & Specialties

Explore Dr. Abida's areas of medical expertise.
```

---

## Services Grid

Create a responsive grid of service cards.

Each card:

```text
[Orange Icon]

Service Name

Short description explaining the service.

Learn More →
```

Use at least 6 visually distinct cards.

Use realistic but clearly editable service content.

---

## Service Details

Implement a JavaScript interaction.

When clicking **Learn More**, open either:

* an expandable detail area, OR
* a modal

The detail should show:

* Service overview
* What the consultation includes
* Who may benefit
* Related information
* Book Appointment CTA

---

## CTA

End with:

```text
Not sure which service you need?

[Book a Consultation]
```

---

# PAGE 4 — APPOINTMENT

File:

```text
appointment.html
```

This is the most important functional frontend page.

Do NOT simply create a basic HTML form.

Create a polished **multi-step appointment booking interface**.

---

# STEP 1 — PATIENT INFORMATION

Fields:

```text
Full Name
Phone Number
Email Address
```

Validation:

* Required fields
* Valid email
* Valid phone
* Clear error messages

---

# STEP 2 — SELECT SERVICE

Display service cards.

User selects one.

Selected card should have:

* Orange border
* Orange background accent
* Check indicator

---

# STEP 3 — SELECT DATE

Create a calendar/date selection interface.

Allow the user to select a date.

Prevent selecting dates before today.

Use JavaScript.

---

# STEP 4 — SELECT TIME

Create a visual time-slot grid:

```text
09:00 AM
09:30 AM
10:00 AM
10:30 AM
11:00 AM
11:30 AM

02:00 PM
02:30 PM
03:00 PM
03:30 PM
04:00 PM
04:30 PM
```

Each slot must have states:

* Available
* Hover
* Selected
* Unavailable

Selected:

**Orange**

Unavailable:

**Light gray + disabled**

---

# STEP 5 — REASON FOR VISIT

Fields:

```text
Reason for Visit
Additional Notes
```

---

# STEP 6 — REVIEW

Show a summary card:

```text
Patient:
Service:
Date:
Time:
Phone:
Email:
Reason:
```

Button:

**Confirm Appointment**

---

# CONFIRMATION STATE

After clicking Confirm Appointment:

Do NOT submit to a real server.

Instead use JavaScript to display:

```text
✓

Appointment Request Submitted

Thank you. Your appointment request has been received.

Appointment Details

Dr. Abida
Service
Date
Time
Clinic

[Back to Home]
[Book Another Appointment]
```

Use a polished success animation.

---

# PAGE 5 — CONTACT

File:

```text
contact.html
```

## Hero

```text
Let's Connect
```

Short supporting text.

---

## Contact Information

Create a vertical business-card-style list.

Each row:

```text
[Orange Circle Icon]

Phone
+880 XXX XXX XXXX
```

Include:

* Phone
* Email
* Address
* Website
* Social media

---

## Map

Create a large map container.

If no API key is available, use a styled map placeholder instead of attempting to embed a broken map.

---

## Opening Hours

Create a clean schedule.

---

## Contact Form

Fields:

```text
Full Name
Email
Phone
Subject
Message
```

Button:

**Send Message**

Implement frontend validation with JavaScript.

After successful validation, display a success message.

---

# RESPONSIVE DESIGN

The website MUST be fully responsive.

Design for:

### Desktop

1440px

### Laptop

1024–1280px

### Tablet

768–1023px

### Mobile

375–767px

Pay special attention to:

* Hero diagonal layout
* Navigation
* Service cards
* Appointment calendar
* Time-slot grid
* Forms
* Testimonials
* Contact information
* Footer

No horizontal scrolling.

---

# MICRO-INTERACTIONS

Add subtle professional animations.

Examples:

* Button hover transitions
* Service card hover
* Icon movement
* Fade-in sections on scroll
* Navigation transitions
* Appointment step transitions
* Selected time-slot animation
* Success-state animation

Keep animations subtle.

Do not make the website feel like a gaming interface.

---

# ACCESSIBILITY

Use:

* Semantic HTML5
* Proper heading hierarchy
* `<label>` elements for forms
* Accessible buttons
* Keyboard navigation
* Visible focus states
* ARIA attributes where necessary
* Sufficient color contrast
* Responsive touch targets

---

# CODE QUALITY

Write clean, maintainable code.

Requirements:

* Semantic HTML
* CSS variables for colors and spacing
* Reusable components/classes
* Minimal duplication
* No inline CSS unless absolutely necessary
* No unnecessary libraries
* Well-commented JavaScript
* Mobile-first responsive CSS where practical

Use CSS variables such as:

```css
:root {
  --orange: #FF5A1F;
  --black: #111111;
  --white: #FFFFFF;
  --off-white: #FAF9F6;
  --text: #222222;
  --muted: #777777;
}
```

---

# FINAL QUALITY CHECK

Before considering the project complete, verify:

### Pages

* [ ] Home works
* [ ] About works
* [ ] Services works
* [ ] Appointment works
* [ ] Contact works

### Navigation

* [ ] Every navigation link works
* [ ] Appointment CTA works from every page
* [ ] Logo returns to Home
* [ ] Mobile menu works

### Appointment

* [ ] Patient form validation works
* [ ] Service selection works
* [ ] Date selection works
* [ ] Time-slot selection works
* [ ] Review screen works
* [ ] Confirmation screen works
* [ ] No real backend required

### Responsive

* [ ] Desktop
* [ ] Tablet
* [ ] Mobile
* [ ] No horizontal overflow

### Design

* [ ] Orange/black/white visual identity
* [ ] Diagonal geometric compositions
* [ ] Consistent typography
* [ ] Consistent icon system
* [ ] Consistent buttons
* [ ] Consistent spacing
* [ ] Professional medical aesthetic

---

# MOST IMPORTANT

Do not stop after creating `index.html`.

The expected result is a **complete multi-page frontend prototype**:

```text
HOME
  ↓
ABOUT
  ↓
SERVICES
  ↓
BOOK APPOINTMENT
  ↓
APPOINTMENT CONFIRMATION
  ↓
CONTACT
```

Build all pages and all frontend interactions before considering the task complete.
