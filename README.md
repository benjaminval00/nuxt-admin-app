# SmartEvents – Student & Cultural Event Management Platform

A full-stack web application designed to manage student and cultural activities, built with Nuxt 3, Vue.js, TypeScript, and Prisma ORM backed by MySQL.

---

## 🚀 Overview

**SmartEvents** streamlines event discovery, registration, and administrative oversight within an academic community. The platform provides a dual-interface experience:

1. **Public Portal:**
   - **Catalog & Discovery:** Dynamic listing of upcoming cultural and student activities displaying venue, schedules, current capacity, and pricing.
   - **User Registrations ("Inscripciones"):** Direct event sign-up with real-time participant tracking and a dedicated view for users to check their enrolled activities.

2. **Administrative Backoffice ("Admin"):**
   - **Authentication:** Protected login gateway for authorized administrators.
   - **Event Management (CRUD):** Complete lifecycle control (Create, Read, Update, Delete) over events, venues, and registration records.

---

## 🛠 Tech Stack

- **Frontend & Routing:** [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM & Data Persistence:** [Prisma ORM](https://www.prisma.io/) with [MySQL](https://www.mysql.com/)
- **Server Layer:** Nuxt Server Engine (Nitro) handling internal API endpoints
- **Styling:** Custom CSS / Scoped Styles (responsive card-based UI)
- **Version Control:** Git & GitHub

---

## ✨ Key Architectural Highlights

- **Server-Side API Endpoints (`server/`):** Implements secure server routes for authentication validation and CRUD database operations.
- **Relational Data Modeling (`prisma/`):** Structured database schema modeling relationships between events, categories/venues, and user registrations.
- **Type Safety:** Shared TypeScript interfaces connecting data payloads between frontend components and backend handlers.
- **State & Navigation:** Reactive client-side navigation between event exploration, active user registrations, and administrative views.

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (or pnpm / yarn)
- Running MySQL database instance

### 2. Clone & Install

```bash
git clone [https://github.com/benjaminvall00/nuxt-admin-app.git](https://github.com/benjaminvall00/nuxt-admin-app.git)
cd nuxt-admin-app
npm install
