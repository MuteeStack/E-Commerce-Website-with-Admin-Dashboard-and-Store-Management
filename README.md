# Marketly — Modern E-Commerce & Store Management Platform

![Marketly](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

Marketly is a robust, full-stack e-commerce platform designed to empower store owners. Sellers can manage their products, track sales via a real-time dashboard, and customize their store branding, while customers enjoy a fast and responsive shopping experience.

---

## 🔗 Live Demo
Check out the live application here: **[https://marketly-five.vercel.app/](https://marketly-five.vercel.app/)**

---

## Features

- **Store Branding** – Customize your store name and logo to build your brand identity.
- **Product Management** – Full CRUD operations for products—add, edit, and delete items with ease.
- **Coupon System** – Create sophisticated discount strategies with store-wide or product-specific coupons.
- **Real-time Analytics** – Monitor store performance through an interactive dashboard featuring data visualizations with Recharts.
- **Order Tracking** – Keep tabs on customer orders and fulfillment status in real-time.
- **Dynamic Storefronts** – Each store has its own dedicated space with unique branding.
- **Authentication** – Secure user login and registration powered by Firebase Auth.
- **Database** – Firebase Realtime Database for instant state syncing.

---

## Tech Stack

- Framework: Next.js 15+ (App Router)
- Library: React 19
- Styling: Tailwind CSS 4
- State Management: Redux Toolkit
- Database & Auth: Firebase Realtime Database & Firebase Auth
- Icons & Charts: Lucide React & Recharts
- Notifications: React Hot Toast
- Hosting: Vercel

---

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- Firebase project (for Authentication and Realtime Database)

### Installations

**Clone the repository**
```bash
git clone https://github.com/yourusername/marketly.git
cd marketly
```

**Install Dependencies**
```bash
npm install
```

**Environment setup**

Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Development**

```bash
npm run dev
```

**Production Build**

```bash
npm run build
npm run start
```
Visit: http://localhost:3000

---

## Repository Structure

```text
/marketly
├── /app
│   ├── /admin           # Admin Dashboard pages
│   ├── /store           # Store Management pages
│   ├── /(public)        # Public user-facing pages
│   ├── globals.css      # Global styles
│   └── layout.jsx       # Main layout and providers
├── /components          # Reusable UI Components
├── /lib                 # Firebase config & utility functions
├── /store               # Redux slices (cart, products, user, etc.)
├── /assets              # Static images and icons
└── package.json         # Project dependencies and scripts
```

---

## Architecture Overview

**Frontend**
Built with Next.js App Router + Tailwind CSS. Connects to Firebase for all authentication and real-time database updates.

**Backend**
Serverless structure handled by Firebase Realtime Database and Rules. No explicit custom backend needed, significantly reducing infrastructure overhead while maintaining real-time responsiveness.

---

## Contributing
We welcome contributions from developers who want to improve Marketly!
Follow these steps to contribute effectively:

1. **Fork the Repository**
2. **Clone Your Fork**
   ```bash
   git clone https://github.com/yourusername/marketly.git
   ```
3. **Create a Feature Branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. **Follow Code Style**
5. **Use Clear Commit Messages**
   - `feat:` – new feature
   - `fix:` – bug fix
   - `docs:` – documentation update
   - `refactor:` – code restructuring
6. **Submit a Pull Request (PR)**

Code of Conduct:
- Be collaborative and responsive.
- Welcome feedback constructively.

---

## Deployment

| Component | Platform | Notes |
|-----------|----------|-------|
| Frontend | Vercel | Add Firebase env variables |
| Backend | Firebase | Deploy Firebase rules separately if updated |