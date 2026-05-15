# 🛒 Marketly - Modern E-Commerce & Store Management Platform

[![Deploy with Vercel](https://vercel.com/button)](https://marketly-five.vercel.app)


**Marketly** is a robust, full-stack e-commerce platform designed to empower store owners. Built with **Next.js**, **Tailwind CSS**, and **Firebase**, it provides a seamless experience for both sellers and customers. Sellers can manage their products, track sales via a real-time dashboard, and customize their store branding, while customers enjoy a fast and responsive shopping experience.

---

## 🔗 Live Demo
Check out the live application here: **[marketly-five.vercel.app](https://marketly-five.vercel.app)**

---

## ✨ Key Features

### 🏪 For Store Owners (Admin Dashboard)
- **Store Branding**: Customize your store name and logo to build your brand identity.
- **Product Management**: Full CRUD operations for products—add, edit, and delete items with ease.
- **Coupon System**: Create sophisticated discount strategies with store-wide or product-specific coupons.
- **Real-time Analytics**: Monitor store performance through an interactive dashboard featuring data visualizations with Recharts.
- **Order Tracking**: Keep tabs on customer orders and fulfillment status in real-time.

### 🛍️ For Customers
- **Dynamic Storefronts**: Each store has its own dedicated space with unique branding.
- **Fast Shopping Experience**: Optimized performance thanks to Next.js and Tailwind CSS.
- **Secure Authentication**: Robust user login and registration powered by Firebase Auth.
- **Real-time Updates**: Instant feedback on cart changes and order status via Firebase Realtime Database.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Backend/Database**: [Firebase Realtime Database](https://firebase.google.com/docs/database)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- A Firebase project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/marketly.git
   cd marketly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
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

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components.
- `/lib`: Firebase configuration and utility functions.
- `/assets`: Static assets like images and logos.
- `/redux`: Global state management logic.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.