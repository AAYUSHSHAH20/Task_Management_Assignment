## Task Management Assignment

This repo contains a simple task management app with:
- **Backend**: Node.js + Express + Prisma + PostgreSQL (JWT auth)
- **Frontend**: Next.js (App Router) + Axios + Tailwind (custom CSS in `globals.css`)

To start fresh, clone the project from GitHub:

```bash
git clone https://github.com/AAYUSHSHAH20/Task_Management_Assignment.git
cd Task_Management_Assignment
```

### Project structure

- `task-management-backend/`: API server + Prisma schema/migrations
- `task-management-frontend/`: Next.js UI

---

## Prerequisites

- Node.js (LTS recommended)
- PostgreSQL (running locally)

---

## Backend setup (PostgreSQL + Prisma)

### 1) Create the database

Using `psql`:

```sql
CREATE DATABASE task_management_db;
```

Or create the same DB in pgAdmin.

### 2) Create `task-management-backend/.env`

Example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_management_db?schema=public"

ACCESS_SECRET="your-long-random-access-secret"
REFRESH_SECRET="your-long-random-refresh-secret"

PORT=5000
```

### 3) Install, generate Prisma client, run migrations, start server

In PowerShell:

```powershell
cd "task-management-backend"
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs at `http://localhost:5000`.

---

## Frontend setup

```powershell
cd "task-management-frontend"
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

### Frontend → Backend URL

The frontend Axios client in `task-management-frontend/src/lib/axios.ts` calls:
- `http://localhost:5000`

So make sure the backend is running on port **5000**.

---

## API overview

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh` (used to refresh access token)

### Tasks (protected)

All task routes require a bearer token:

`Authorization: Bearer <accessToken>`

- `POST /tasks`
- `GET /tasks` (supports `search`, `status`, `page`, `limit`)
- `PATCH /tasks/:id`
- `PATCH /tasks/:id/toggle`
- `DELETE /tasks/:id`

---

## What was fixed/updated during development

### CORS issue (frontend credentials)

Backend CORS was updated to allow requests from `http://localhost:3000` with credentials enabled.

### Prisma `DATABASE_URL` missing at runtime

The backend was adjusted so `.env` is reliably loaded before Prisma is initialized (avoids:
“Environment variable not found: DATABASE_URL”).

### Dashboard task fetch shape

The backend returns an **array of tasks** from `GET /tasks`, so the dashboard fetch was updated accordingly.

### Dashboard styling

`TaskForm` and `TaskCard` were aligned to use the dashboard CSS classes defined in `task-management-frontend/src/app/globals.css` (instead of unstyled/utility-only layout).

---

## Troubleshooting

- **`net::ERR_CONNECTION_REFUSED`** (frontend calling backend):
  - Backend isn’t running on `http://localhost:5000`. Start it with `npm run dev` in `task-management-backend/`.
- **CORS blocked**:
  - Confirm frontend is on `http://localhost:3000` and backend CORS origin matches it.
- **Prisma can’t find `DATABASE_URL`**:
  - Confirm the `.env` file exists at `task-management-backend/.env` and restart the backend.

