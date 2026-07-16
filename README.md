# KilimoBora - Smart Agriculture Management Platform

KilimoBora is a multi-tenant monorepo built to empower Tanzanian farmers with market intelligence, crop recommendations, and direct connections to buyers and agricultural officers. It supports full English/Swahili localization out of the box.

## Architecture

- **Frontend**: React, Vite, TailwindCSS (in `apps/web`)
- **Backend**: NestJS, TypeORM (in `apps/api`)
- **Database**: PostgreSQL (Neon Serverless DB used in development)

## Prerequisites

Before running the project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher is recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A running instance of PostgreSQL (or a cloud DB like Neon, Supabase, or AWS RDS).

---

## Getting Started

### 1. Environment Setup

1. Rename the `.env.example` file in the root directory to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the newly created `.env` file and replace the `DATABASE_URL` with your own PostgreSQL connection string if you don't want to use the default one.
3. Ensure the `JWT_SECRET` is set securely for authentication.

### 2. Install Dependencies

Since this project uses npm workspaces, running install at the root level will install all dependencies for both the frontend and the backend.

```bash
npm install
```

### 3. Database Initialization & Seeding (CRITICAL)

The application relies on database data for its core functionalities such as Market Intelligence and FAO-backed Crop Recommendations. You **MUST** run the seed script before starting the app to populate this dynamic data.

```bash
cd apps/api
npm run seed
```

> **Note:** The seeding process inserts hundreds of dynamic marketplace listings to visualize accurate, real-time market trends on the dashboard. It also populates the FAO-backed crop database.

### 4. Running the Application

Once your dependencies are installed and your database is seeded, you can run the entire application concurrently from the root directory.

Go back to the root directory and start the dev server:

```bash
cd ../../  # Ensure you are at the project root
npm run dev
```

This single command utilizes Turborepo/Workspaces to start both servers:
- **Frontend (Web)** will be available at: [http://localhost:5173](http://localhost:5173)
- **Backend (API)** will be available at: [http://localhost:3000](http://localhost:3000)

---

## Important Considerations

1. **Localization (i18n):** The system fully supports English and Swahili. If you are extending the application, ensure you add translation strings inside `apps/web/src/lib/i18n.ts` rather than hardcoding text in the components.
2. **Migrations:** Currently, the TypeORM module is set to `synchronize: true` for development purposes. For production use, you MUST disable synchronize and use explicit TypeORM migration files.
3. **Map Nominatim Limits:** The frontend LocationPicker uses OpenStreetMap's Nominatim API for reverse geocoding. Note that this API is strictly rate-limited (1 request per second). Do not spam the map picker to avoid temporary IP bans.
4. **Market Intelligence Widgets:** If you skip Step 3 (Seeding), the Farmer Dashboard will show empty charts and state "No products in the market match your filters right now." Ensure seeding is executed.

---

## Next Steps for Production

Before deploying to a live environment (e.g., AWS, Vercel, Railway):
- Update `.env` variables for production (disable debug logs).
- Replace the development `JWT_SECRET` with a strong cryptographic key.
- Generate standard TypeORM migrations.
- Set up a cron job or external worker for the Market price aggregation service, as large datasets will eventually slow down synchronous HTTP calls.
