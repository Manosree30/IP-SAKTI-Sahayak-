# AyurGuard — Frontend

AyurGuard is the frontend interface for the **IP-SAKTI-Sahayak** project. It provides a multilingual, evidence-oriented user interface for Ayurveda intellectual property (IP), patentability, and regulatory compliance research.

> **Note:** The current frontend is a client-side prototype application. The complete Retrieval-Augmented Generation (RAG) system, retrieval indexing, reranking, automated citation verification, and LLM synthesis pipeline will be connected through backend APIs in subsequent project phases.

---

## 1. Frontend Overview

The AyurGuard frontend serves as the dedicated researcher and practitioner portal for Ayurvedic IP and regulatory workflows:

- **Research Interface:** Dedicated workflow for querying statutory and classical Ayurvedic literature.
- **Product-Level Analysis:** Multi-ingredient formulation intake form for commercial compliance evaluations.
- **Pipeline Visualization:** Visual progress monitor displaying each stage of the intended intelligence pipeline.
- **Intelligence Reports:** Structured dossier presentation covering executive verdicts, prior art citations, and statutory crosswalks.
- **Evidence & Citation Display:** In-depth evidence cards presenting verbatim statutory excerpts, authority tiers, and classical treatise references.
- **Evidence Audit Workspace:** Interactive verification review interface for inspecting, auditing, and updating evidence statuses and notes.
- **Authoritative Sources Directory:** Repository catalog providing details and official links for key statutory bodies and digital archives.
- **Prior Assessments / History:** Persistent ledger for searching, filtering, inspecting, and managing past research dossiers.
- **Authentication Flows:** Client-side prototype authentication screens (Login, Signup, and Password Reset).
- **Institutional Settings:** Customization panel for language selection, visual themes, response preferences, and user profiles.
- **Multilingual Support:** Trilingual user interface supporting English, Tamil (தமிழ்), and Hindi (हिन्दी).
- **Theme Support:** Theme engine providing Light, Dark, and System display modes.

*The frontend represents the presentation and client-state layer; it does not perform local neural embedding, vector search, or autonomous legal verification on its own.*

---

## 2. Technology Stack

The frontend is built using standard, modern web technologies:

- **React 19** (`react`, `react-dom`): Component-based user interface architecture.
- **TypeScript** (`typescript`): Static type checking for regulatory models, evidence structures, and component props.
- **Vite** (`vite`, `@vitejs/plugin-react`): Fast development server and production bundler.
- **Tailwind CSS v4** (`tailwindcss`, `@tailwindcss/vite`): Utility-first styling engine tailored for institutional editorial aesthetics.
- **Lucide React** (`lucide-react`): Consistent iconography for legal, regulatory, and audit actions.
- **Motion** (`motion`): Animation primitives for interface transitions.
- **Browser Web Storage API** (`localStorage`, `sessionStorage`): Client-side persistence for dossiers, active selections, user preferences, and prototype authentication state.

*No backend frameworks (FastAPI, Express), databases (PostgreSQL), vector stores (FAISS, Qdrant), or ML inference engines are bundled inside this frontend. All backend services will be integrated via REST APIs.*

---

## 3. Project Structure

```text
Frontend/
├── public/
│   └── assets/             # Static public assets
├── src/
│   ├── auth/               # Prototype authentication context, service, and types
│   ├── components/         # Application views, layout components, and reusable UI
│   │   └── auth/           # Login, Signup, and Password reset forms
│   ├── context/            # React Context providers (DossierContext)
│   ├── data/               # Prototype mock intelligence data and statutory sources
│   ├── i18n/               # Multilingual translation dictionaries (EN, TA, HI)
│   ├── services/           # Client-side storage persistence services
│   ├── App.tsx             # Root application orchestrator and screen router
│   ├── index.css           # Global typography, CSS variables, and design tokens
│   ├── main.tsx            # Application DOM entry point
│   └── types.ts            # TypeScript interfaces and domain types
├── .env.example            # Example environment configuration template
├── .gitignore              # Git ignore configuration
├── index.html              # HTML5 entry template with institutional font links
├── metadata.json           # Application metadata descriptor
├── package.json            # Dependencies and npm scripts
├── tsconfig.json           # TypeScript compiler configuration
├── vite.config.ts          # Vite build and plugin configuration
└── README.md               # Frontend project documentation
```

### Major Directory Purposes

- **`src/components/`**: Houses all view controllers (`LandingPage`, `DashboardView`, `AskView`, `ProductAnalysisView`, `AnalysisProgressView`, `IntelligenceReportView`, `EvidenceAuditView`, `SourcesView`, `HistoryView`, `SettingsView`, `Navigation`, `Sidebar`, `EvidenceCard`).
- **`src/auth/`**: Manages client-side session state, demo accounts, and route guards (`ProtectedRoute`).
- **`src/context/`**: Contains `DossierContext`, providing centralized state management for active dossiers, evidence selection, and history mutations.
- **`src/data/`**: Provides prototype mock intelligence data, benchmark dossiers, and authoritative source metadata.
- **`src/i18n/`**: Houses dictionary definitions across English, Tamil, and Hindi for interface labels, tooltips, and badges.
- **`src/services/`**: Implements `storageService` with defensive `try/catch` wrappers around browser storage.

---

## 4. Application Screens

### Landing Page
The primary entry point introducing AyurGuard’s regulatory coverage, evidence-first design philosophy, trilingual support, and direct call-to-actions to access the research workspace.

### Authentication
- **Login:** Form for user credentials with a one-click "Fill Demo Account" helper (`researcher@example.com` / `AyurGuard2026!`).
- **Signup:** Account registration screen collecting researcher name, organization, role, and credentials.
- **Forgot Password:** Password recovery simulation workflow.

> **Security Notice:** Current authentication is purely a client-side prototype using browser storage. It does **not** provide production-grade security, cryptographic password hashing, or token refresh flows. Production deployment will connect these forms to FastAPI / JWT / OAuth services.

### Dashboard
The central workspace ledger providing an overview of active assessment cycles, key compliance risk indicators, active dossier summaries, and quick navigation shortcuts.

### Ask a Question
A technical inquiry view allowing users to enter custom legal, regulatory, or prior-art research questions, select target statutory domains, and configure source repository filters.

### Product Analysis
A structured intake instrument for multi-ingredient herbal formulations:
- Product / Brand Name
- Botanical & Classical Ingredients (with taxonomic names)
- Therapeutic Indication / Claimed Purpose
- Dosage Form
- Target Regulatory Jurisdictions (e.g., India MoAYUSH / IPO, US FDA DSHEA, EU EMA)

Includes a "Fill Demo Formulation" option for quick evaluation.

### Analysis Progress
A simulated 9-stage visual execution monitor depicting the steps of the future backend pipeline:
1. Understanding Query & Botanical Taxonomy
2. Detecting Legal Intent
3. Domain Routing
4. Knowledge Source Retrieval
5. Hybrid Retrieval (BM25 + Dense)
6. Evidence Reranking
7. Authority Tier Verification
8. Analysis Synthesis
9. Citation Verification

*Note: This view visualizes the intended pipeline flow using step-based timers and client logs; it does not execute live server-side inference.*

### Intelligence Report
A comprehensive report view organized across domain tabs (Patentability § 3(p)/3(e), AYUSH Rule 158B, Biodiversity Act Section 6, Clinical Prior Art). Displays executive statutory findings, risk levels, recommended strategic actions, and interactive evidence cards.

### Evidence Audit
A dedicated verification workbench enabling researchers to:
- Inspect verbatim legal and classical treatise extracts.
- Review source authority tiers (Statutory Acts vs. Pharmacopoeial Standards vs. Classical Treatises).
- Filter claims by status (`Verified`, `Requires Review`, `Flagged Discrepancy`).
- Record reviewer notes and update verification decisions.

### Sources
An authoritative corpus directory profiling key statutory bodies and classical repositories (CSIR-TKDL, Ministry of AYUSH, National Biodiversity Authority, PCIM&H, WIPO, and WHO TCIM) with status indicators and official external links.

### Prior Assessments / History
A filterable, searchable, and sortable archive of generated intelligence dossiers. Enables loading previous evaluations, filtering by risk level, inspecting audit trails, and removing records.

### Settings
System preference panel allowing users to configure:
- Interface language (English, Tamil, Hindi)
- Visual theme (Light, Dark, System)
- Response detail preferences (Concise, Balanced, Detailed)
- Regulatory jurisdiction priorities
- Researcher profile details (Name, Organization, Role)

---

## 5. Core AyurGuard UI Concepts

### Domain Categories
Statutory and regulatory findings are structured into five distinct domain categories:
- **Intellectual Property (IP):** Patentability evaluation under the Indian Patents Act 1970 (specifically § 3(p) for traditional knowledge and § 3(e) for mere admixtures) and international patent standards.
- **Traditional Knowledge:** Prior art references identified in classical Ayurvedic treatises (e.g., Charaka Samhita, Sushruta Samhita, Bhavaprakasha Nighantu) codified in CSIR-TKDL.
- **AYUSH Regulatory:** Manufacturing licenses, Schedule T Good Manufacturing Practices (GMP), and Rule 158B evidence requirements for Ayurvedic, Siddha, and Unani drugs.
- **Biodiversity:** Statutory compliance with the Biological Diversity Act 2002, Access and Benefit Sharing (ABS) mandates, and mandatory Section 6 NBA approval prior to IP filing.
- **International:** Global dietary supplement and traditional medicine frameworks (e.g., US FDA DSHEA, EMA HMPC monographs, WIPO treaties).

### Evidence Strength
Evidence items are classified by qualitative strength rather than arbitrary numeric confidence percentages:
- **Strong:** Direct statutory mandate, Supreme Court / IPAB precedent, or explicit classical treatise verse citation.
- **Moderate:** Indirect monograph reference, published pharmacopoeial standard, or related administrative guideline.
- **Insufficient:** Ambiguous anecdotal citation lacking statutory backing or explicit classical indication.

### Evidence and Citation Model
The UI is purpose-built around an "evidence-grounded" presentation model where every finding links directly to a verifiable document title, chapter/section, and source excerpt. 

*The current client prototype displays curated benchmark legal analyses; independent real-time verification requires connection to the live backend retrieval and RAG pipeline.*

---

## 6. Multilingual Interface

AyurGuard includes built-in internationalization (i18n) supporting three languages:
- **English (`en`)**
- **Tamil (`ta` — தமிழ்)**
- **Hindi (`hi` — हिन्दी)**

The translation architecture covers:
- Main navigation bars and mobile menus
- Sidebar navigation labels and section headers
- Workspace titles, subtitles, and button actions
- Form input labels, placeholders, and error messages
- Evidence status filters, authority badges, and audit buttons
- System settings and theme descriptors

*Scope Notice: While UI navigation, controls, tabs, and status badges are translated, long-form statutory passages, classical Sanskrit verse transliterations, and dynamic user query inputs remain in their original source languages.*

---

## 7. Theme Support

The application provides a theme engine supporting three visual modes:
- **Light:** Editorial research aesthetic with crisp off-white paper tones (`#FAF8F5`), deep forest green (`#173F35`), and brass accents (`#8C6D3B`).
- **Dark:** High-contrast low-light workspace mode (`#0B130F`) with softened jade and cream typography.
- **System:** Automatically synchronizes with the operating system or browser light/dark mode preference via standard media queries (`prefers-color-scheme`).

---

## 8. State and Persistence

The client prototype implements a decoupled, browser-local state architecture:
- **React Context (`DossierContext`):** Manages active dossier selection, live evidence status mutations, and active assessment lists in memory.
- **Storage Service (`storageService`):** Persists generated dossiers, modified evidence verification flags, and custom reviewer notes into `localStorage` across page reloads.
- **Authentication Context (`AuthContext`):** Persists session tokens and active user profile in `sessionStorage` (or `localStorage` when "Remember Me" is toggled).

*Production Transition:* This client persistence layer is designed to be replaced by authenticated REST / GraphQL endpoints connected to a persistent database (e.g., PostgreSQL) and backend session tokens.

---

## 9. Running the Frontend Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local Vite development server:
```bash
npm run dev
```

By default, Vite will start the server at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

### Type Checking & Linting

Run TypeScript validation without emitting files:
```bash
npm run lint
```

### Production Build

Create an optimized, minified production build:
```bash
npm run build
```

The output bundle will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```
