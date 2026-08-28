# ⚡ NEXUS SYNTHESIS — Cybernetic & Quantum Hardware Vault (Sprint 6)

> **Prodesk IT Engineering Directive: Sprint 6 (SPA Routing & Context Providers)**  
> **Repository:** [https://github.com/TimeLineOfficial/Sprint-6/](https://github.com/TimeLineOfficial/Sprint-6/)

---

## 🚀 Overview & Technical Architecture

**Nexus Synthesis** is a high-performance, ultra-modern Single Page Application (SPA) built to fulfill all **Phase 1, Phase 2, and Phase 3** requirements of the Prodesk IT Sprint 6 Directive.

The application serves as a next-generation E-Commerce marketplace for cybernetic implants, quantum wearables, holographic displays, autonomous drones, and haptic suits, handling a massive dataset of **5,000 products** with zero scroll lag or DOM node bloat.

---

## ✨ Sprint 6 Directive Phase Compliance Matrix

### 🟢 Phase 1: React Router Integration (P0)
- **`react-router-dom` v6 setup**: Fully client-side routed architecture with zero full-page reloads.
- **Dynamic Route Segments**: `/product/:id` dynamic parameter route parsing specific product details, technical specifications, and user reviews.
- **Dedicated Route Hierarchy**:
  - `/` — Home (Hero banner, Category grid, Featured products, Performance stats)
  - `/catalog` — 5,000 Product Catalog (Category/price filters, DOM Virtualization grid)
  - `/product/:id` — Dynamic Product Detail View
  - `/cart` — Global Cart View with coupon discounts & price calculations
  - `/checkout` — Multi-Step Shipping & Payment Flow
  - `/wishlist` — Saved Hardware Wishlist
  - `/order-success` — Real-Time Order Tracking & Confirmation
  - `*` — Custom 404 Cyberpunk Route Page

### 🟢 Phase 2: Context API for Global State (P0)
- **Zero Prop Drilling**: Global state stores abstracted into modular Context Providers:
  - `CartContext.jsx` — Cart items state, quantity updates, subtotal, tax, shipping, coupon discount calculations (`SPRINT6` / `NEXUS20`), LocalStorage persistence.
  - `WishlistContext.jsx` — Wishlist items toggle and count.
  - `FilterContext.jsx` — Catalog search queries, category filters, price range sliders, sorting order, and view mode toggles.
  - `ToastContext.jsx` — Global notification toasts.

### 🟢 Phase 3: DOM Virtualization & Custom Hooks (P0)
- **DOM Virtualization (Windowing)**: Implemented `useVirtualGrid` hook to window **5,000 generated products**. Instead of rendering 5,000 DOM nodes simultaneously (which crashes low-end mobile devices), the application renders **strictly ~10-12 active visible items** in the viewport, achieving **60 FPS performance** and a **99.7% DOM node memory reduction**.
- **Custom Hook Abstractions**:
  - `useCartOperations` — Encapsulates cart actions, calculations, formatting, and coupon mechanics.
  - `useProductFetcher` — Encapsulates 5,000-item dataset generation, search filtering, category filtering, price filtering, and sorting algorithms.
  - `useVirtualGrid` — Calculates column layout, total scroll canvas height, and visible viewport row bounds.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Framework**: React 18 (Vite 5)
- **Routing**: `react-router-dom` v6
- **Styling**: Tailwind CSS v3 (Glassmorphism, Neon glow animations, Dark Cyberpunk Theme)
- **Icons**: `lucide-react`
- **Animations & Effects**: `canvas-confetti`
- **State Management**: React Context API + Custom Hooks

---

## 📦 Local Installation & Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/TimeLineOfficial/Sprint-6.git
cd Sprint-6

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev

# 4. Build production distribution
npm run build
```

---

## 🎙️ Demo Video Script & Walkthrough Guide (For QA Recording)

When recording your **3-minute Technical QA Video with Voiceover**, follow this exact narrative structure:

### 📍 Timestamp 0:00 - 0:45: Introduction & Phase 1 (React Router)
- *"Hello evaluator! Today I am presenting Nexus Synthesis, our Sprint 6 E-Commerce Single Page Application built for the Prodesk IT Sprint 6 Directive."*
- Show navigation between `/`, `/catalog`, `/product/PROD-0001`, `/wishlist`, and `/cart`.
- Highlight dynamic URL parameters by clicking on a product card (`/product/PROD-0001`) and showing how specs, ratings, and gallery render dynamically based on the URL segment.

### 📍 Timestamp 0:45 - 1:30: Phase 2 (Context API & Global State)
- *"Moving to Phase 2, all state management is governed by React Context API without any prop drilling."*
- Click **Add to Cart** on multiple products across different routes.
- Open the **Cart Drawer** and navigate to `/cart`.
- Adjust quantities, remove items, apply promo code `SPRINT6` (30% discount), and highlight real-time subtotal, tax, and shipping calculations.
- Refresh the browser page to demonstrate **LocalStorage persistence**.

### 📍 Timestamp 1:30 - 2:30: Phase 3 (DOM Virtualization & Custom Hooks)
- *"For Phase 3, we implemented strict DOM Virtualization to window 5,000 products."*
- Navigate to `/catalog`. Point out the **DOM Virtualization Performance HUD Banner**.
- Scroll rapidly through the 5,000 items while showing that the active DOM rendered node count remains strictly at **~10-12 visible cards**, keeping frame rates at **60 FPS**.
- Mention custom hook abstractions: `useCartOperations`, `useProductFetcher`, and `useVirtualGrid`.

### 📍 Timestamp 2:30 - 3:00: Responsive Layout & Multi-Step Checkout
- Toggle device viewport preview (Mobile 375px, Tablet 768px, Desktop 1440px) to show fluid responsiveness and mobile drawer navigation.
- Complete the checkout process at `/checkout` and demonstrate the instant order confirmation screen at `/order-success`.
