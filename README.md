# 🚀 Deviathon 2.0 — The Ascension

An immersive, high-performance landing experience for **Deviathon 2.0**, a national-level hackathon focused on innovation, speed, and next-gen tech design.

> ⚡ Built with precision. Designed for impact. Engineered for performance.

---

## 🌌 Experience Overview

Deviathon 2.0 delivers a **“Midnight Chrome”** interface — a fusion of brutalist clarity and futuristic motion design.

This is not just a landing page.
It’s a **fully interactive experience** featuring:

* Real-time cursor physics
* GPU-accelerated animations
* 3D spatial environments
* Smooth, reactive UI systems

---

## 🛠️ Tech Stack

### ⚙️ Core

* **React 19 + TypeScript**
* **Vite (Blazing fast dev environment)**

### 🎨 UI & Styling

* **Tailwind CSS 4**
* Custom design system (glassmorphism + neon gradients)

### 🎬 Animations

* **GSAP** → high-performance motion & cursor engine
* **Framer Motion** → layout transitions & micro-interactions
* **Lenis** → buttery smooth scrolling

### 🌐 3D & Graphics

* **Three.js + React Three Fiber**
* Depth-based rendering & particle systems

---

## ✨ Key Features

### 🔱 Trishul Cursor Engine (Flagship Feature)

A custom-built, high-performance cursor system:

* ⚡ **120FPS rendering** using `gsap.quickSetter`
* 🔥 Velocity-based spark generation (canvas engine)
* 💫 Dynamic glow intensity tied to movement speed
* 🎯 Context-aware interactions (hover states, rotation, aura pulse)
* 🧠 Memory-optimized (no DOM leaks, controlled lifecycle)

---

### ⏳ Ascension Timeline

* Scroll-driven animated progression
* Dynamic vertical growth line
* Staggered reveal animations
* Fully responsive (mobile → ultra-wide)

---

### 📝 Smart Registration System

* Real-time validation (email + phone)
* Async submission flow
* Custom success/error UI (no default alerts)
* Glassmorphism UI with focus states

---

### 🌌 3D Background System

* Powered by Three.js
* Floating particles with depth illusion
* Subtle camera drift for immersion
* Cursor-reactive lighting

---

## 🎨 Design Language

* **Theme:** Midnight Chrome

* **Primary Colors:**

  * Iris Lavender → `#818CF8`
  * Aurora Mint → `#2DD4BF`
  * Deep Space Black → `#050505`

* **Style:**

  * Glassmorphism layers
  * Neon glow accents
  * Soft grain overlays
  * Motion-first UI

---

## 🚀 Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm / yarn

### Installation

```bash
git clone https://github.com/vanshsingla66/Deviathon-2.0
cd Deviathon-2.0
npm install
npm run dev
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Timeline.tsx
│   ├── Sponsors.tsx
│   ├── FAQ.tsx
│   ├── Register.tsx
│   ├── Scene3D.tsx        # Three.js engine
│   ├── TrishulCursor.tsx  # Custom cursor system
│   ├── Navbar.tsx
│   └── ScrollTop.tsx
├── App.tsx
└── main.tsx
```

---

## ⚡ Performance Highlights

* GPU-accelerated transforms (`translate3d`)
* requestAnimationFrame-based animations
* Controlled DOM node lifecycle
* Optimized particle rendering

---

## 🌍 Live Demo

👉 https://deviathon-2-0.onrender.com/

## 🚀 Deploying on Render

This project is set up as a Render static site.

1. Push the repository to GitHub.
2. In Render, create a new Static Site from the repo.
3. Render will read [render.yaml](render.yaml) at the project root.
4. Use the default build command `npm ci && npm run build` and publish directory `dist`.
5. If you want to use a manual setup instead of Blueprint, choose:
  - Build Command: `npm ci && npm run build`
  - Publish Directory: `dist`
  - Rewrite rule: `/* -> /index.html`

The app does not require a runtime server for deployment, so a static site is the simplest Render target.

---

## 🧠 What Makes This Special

This project focuses on **experience engineering**, not just UI:

* Motion is meaningful, not decorative
* Interactions feel physical and responsive
* Performance is prioritized alongside visuals

---

## 📜 License

This project is developed for **Deviathon 2.0**.
All rights reserved.

---

## 💡 Author

Built by **Vansh Singla && Devang Mittal**
Frontend Engineer • UI/UX Designer • Product Builder

---
