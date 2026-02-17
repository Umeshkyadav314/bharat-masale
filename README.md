# Bharat Masale & Elaichi

Premium Indian spices website built with Next.js App Router, Tailwind, shadcn-style components, NextAuth, and Prisma + MongoDB.

## Features

- **Landing page**: Fullscreen HD autoplay muted video with dark overlay; "Explore" redirects to `/home`
- **Main site**: Navbar (Home, About, Prices, Products, Login), hero video, premium masala imagery, light/dark theme toggle, footer with address and branding
- **Auth**: NextAuth with Google OAuth and Email/Password (with Confirm Password on register), MongoDB via Prisma

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env` and set:

   - `DATABASE_URL` – MongoDB connection string (e.g. MongoDB Atlas)
   - `NEXTAUTH_URL` – e.g. `http://localhost:3000`
   - `NEXTAUTH_SECRET` – random secret (e.g. `openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` – for Google sign-in (optional)
   - `ADMIN_EMAILS` – comma-separated emails that can access `/admin` (e.g. `admin@example.com`)

3. **Prisma**

   ```bash
   npx prisma generate
   ```

   Ensure your MongoDB database is reachable. Prisma with MongoDB does not use migrations; the schema is used for the client.

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Root path is the landing page; `/home` is the main website.

## Routes

- `/` – Landing (video, inquiry form; logged-in users redirect to /home)
- `/home` – Main home with hero and product highlights
- `/home/about` – About
- `/home/prices` – Prices
- `/home/products` – Products
- `/login` – Sign in (Google + Email/Password)
- `/register` – Register (Email + Password + Confirm Password)
- `/admin` – Admin dashboard (inquiries list; only users in `ADMIN_EMAILS`)

## Tech stack

- Next.js 15 (App Router)
- Tailwind CSS
- NextAuth (Google + Credentials)
- Prisma + MongoDB
- TypeScript
