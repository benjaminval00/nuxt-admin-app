# SmartEvents – Student & Cultural Event Management Platform

A full-stack, responsive web application designed for student and cultural activity discovery, attendee registration, and staff administrative oversight. Built with Nuxt 3, Vue.js, TypeScript, Nuxt UI, and Prisma ORM backed by MySQL.

---

## 🚀 Overview

**SmartEvents** streamlines event scheduling, registrations, and backoffice administration across academic and cultural environments:

1. **Public Portal:**
   - **Event Catalog:** Public directory displaying event details, schedules, venue, custom images, admission pricing, and live attendee counts.
   - **Attendee Registration:** User enrollment form with input validation preventing duplicate registrations for the same activity.
   - **Registration Lookup:** Email-based query tool allowing attendees to verify all events they are currently enrolled in.
   - **Responsive Design:** Mobile-first layouts optimized for smartphones, tablets, and desktop displays.

2. **Administrative Backoffice (Staff Portal):**
   - **Role-Based Authentication:** Protected staff access with session handling, active profile status, and secure logout.
   - **Staff Access Management:** Complete administrative CRUD to list, add, and revoke staff accounts.
   - **Event Lifecycle Management:** Event creation and deletion, including local image uploads with fallback default assets.
   - **Attendee Auditing:** Real-time participant tracking per event and granular registration cancellation.

---

## 🛠 Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3 Composition API, Nitro server engine)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling:** [Nuxt UI](https://ui.nuxt.com/) & Tailwind CSS (responsive layouts, `FileUpload` component)
- **ORM & Data Persistence:** [Prisma ORM](https://www.prisma.io/) with [MySQL](https://www.mysql.com/)
- **Validation & Business Logic:** Form input validation and relational integrity constraints
- **Tooling:** Git, GitHub, Node.js

---

## 🏛 Database Schema & Architecture

The application implements a normalized relational database schema managing three core entities:
- **`Usuario` (Staff):** System credentials (`email`, `password`, `nombre`, `apellido`, `rol`) managing administrative privileges.
- **`Evento`:** Event metadata (`titulo`, `fecha`, `lugar`, `imagen`, `valor`).
- **`Inscrito`:** Enrollment records linking user details to event IDs (`FK eventoId`), enforcing unique participant constraints.

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (or pnpm / yarn)
- Local or remote MySQL instance

### 2. Clone & Install
```bash
git clone [https://github.com/benjaminvall00/nuxt-admin-app.git](https://github.com/benjaminvall00/nuxt-admin-app.git)
cd nuxt-admin-app
npm install
```

### 3. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Define your database connection string inside `.env`:
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/smartevents_db"
```

### 4. Database Setup (Prisma)

Generate the Prisma Client and synchronize database schema:

```bash
npx prisma generate
npx prisma db push
```

### 5. Launch Development Server

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

