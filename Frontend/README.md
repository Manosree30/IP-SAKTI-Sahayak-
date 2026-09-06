# AyurGuard
**AI-Powered IP & Regulatory Guidance for Ayurveda**

AyurGuard is a specialized decision-support web application designed for Ayurveda innovators, researchers, startups, and formulation developers. It structures and demystifies complex regulatory hurdles across patents, traditional knowledge (TKDL), AYUSH statutory requirements, biodiversity approvals, and international export considerations.

---

## ⚠️ Prototype Status & Guidance Disclaimer

> **Important Notice**: AyurGuard is an informational, evidence-grounded research workspace and decision-support prototype. It does **not** constitute formal legal advice, patent clearance, or regulatory approval. Formulation innovators should consult registered patent attorneys and AYUSH regulatory experts before filing IP claims or commencing commercial manufacture. All citations are curated excerpts from public statutes and classical compendia.

---

## 🏛️ Core Regulatory & IP Domains Covered

1. **Patent (IP India)**
   - Indian Patents Act 1970 — Section 3(p) [traditional knowledge exclusion] and Section 3(e) [mere admixture without demonstrated synergistic technical effect].
   - Comparative experimental synergy requirements and disclosure of biological resource origin (Section 10(4)(ii)(D)).

2. **Traditional Knowledge (TKDL)**
   - Traditional Knowledge Digital Library prior art verification.
   - Cross-referencing classical Samhitas (*Charaka Samhita*, *Sushruta Samhita*, *Ashtanga Hridaya*, *Bhavaprakasha*).

3. **AYUSH Regulatory Guidelines**
   - Drugs and Cosmetics Rules 1945 — Rule 158B licensing requirements.
   - Classical ASU formulations (Form 25D) vs. Proprietary Ayurvedic Medicines (Form 25E).
   - Schedule T Good Manufacturing Practices (GMP) and Ayurvedic Pharmacopoeia of India (API) quality standards.

4. **Biodiversity (NBA)**
   - Biological Diversity Act 2002 — Section 3 & Section 6 prior approval obligations (Form III).
   - State Biodiversity Board (SBB) intimation and Access and Benefit Sharing (ABS) compliance.

5. **International Regulations**
   - US FDA Dietary Supplement Health and Education Act (DSHEA 1994, 21 CFR Part 111 cGMP).
   - European Union Traditional Herbal Medicinal Products Directive (Directive 2004/24/EC).

---

## 🎨 Visual Identity & Design System

- **Warm Parchment & Cream Canvas**: `#F6EFE3` and `#FAF4EB` creating an authentic, scholarly Ayurvedic aesthetic.
- **Deep Wood Brown**: `#3A160F` and `#250F0A` for grounded structure, typography, and dark wooden navigation.
- **Deep Red & Herbal Accents**: `#8E241C` highlights, `#B8955A` Ayurvedic gold badges, and subtle botanical greens `#42662C`.
- **Iconography & Graphics**: Authentic wooden mortar and pestle illustrations, botanical elements, and clean Lucide icons.
- **Dark Mode Support**: Full contrast-compliant dark palette (`#1E0F0B`, `#2A140F`, `#FFFDF9` text).
- **Responsive Layout**: Fluid desktop-first precision with full mobile touch-target accessibility.

---

## ⚙️ Architecture & Technical Stack

- **Framework**: React 18+ with TypeScript and Vite
- **Styling**: Tailwind CSS utility classes
- **Animation & Transitions**: `motion/react` (Framer Motion)
- **State Management**: Centralized React Context (`AppContext`) with localStorage persistence for user sessions, custom formulations, and theme preferences
- **Evidence Corpus**: Grounded data models with strict tripartite evidence strength ratings: `Strong`, `Moderate`, and `Insufficient`

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
