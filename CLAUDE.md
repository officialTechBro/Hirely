# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hirely** — a role-based job portal with two user types: **job seekers** (browse, apply, save jobs) and **employers** (post jobs, manage applications, view analytics).

Monorepo with separate `client/` (React + Vite) and `backend/` (Node.js + Express + MongoDB) packages. Each has its own `package.json` and must be started independently.

## Development Commands

**Backend** (run from `backend/`):
```bash
npm run dev    # nodemon server.js — auto-reload on change
npm start      # node server.js — production
```

**Frontend** (run from `client/`):
```bash
npm run dev    # Vite dev server at localhost:5173
npm run build  # production build
npm run lint   # ESLint (eslint.config.js)
npm run preview # preview production build
```

**No test framework is configured** in either package.

## Environment Variables

Backend requires a `backend/.env` file:
```
MONGO_URI=<MongoDB Atlas connection string>
PORT=8000
JWT_SECRET=<secret>
```

## Architecture

### Backend (`backend/`)

Standard MVC layout:
- `server.js` — Express app entry; mounts all routes under `/api/*`, serves `uploads/` as static
- `config/db.js` — Mongoose connection
- `models/` — Mongoose schemas: `User`, `Job`, `Application`, `SavedJob`, `Analytics`
- `controllers/` — business logic (one file per resource)
- `routes/` — Express routers (one file per resource, mounted in `server.js`)
- `middlewares/auth.middleware.js` — `protect` middleware: validates Bearer JWT, attaches `req.user`
- `middlewares/upload.middleware.js` — Multer disk storage; accepts JPEG/PNG/JPG/PDF to `uploads/`

**Adding a new API feature**: create a controller → add a route file → mount it in `server.js` → update `client/src/utils/apiPath.js`.

### Frontend (`client/src/`)

- `main.jsx` — renders `<App>` into `#root`
- `App.jsx` — React Router setup + `<AuthProvider>` wrapper
- `context/AuthContext.jsx` — global auth state; stores JWT in localStorage, exposes `user`, `token`, login/logout helpers
- `routes/ProtectedRoute.jsx` — role-gated wrapper (currently guards employer-only pages)
- `utils/axiosInstance.js` — Axios instance with request interceptor (attaches `Authorization: Bearer <token>`) and 401 response interceptor (redirects home)
- `utils/apiPath.js` — **single source of truth** for all API endpoint strings; always update here when adding endpoints
- `pages/` — split by role: `Auth/`, `JobSeeker/`, `Employer/`, `LandingPage/`
- `components/` — shared UI grouped by type: `Cards/`, `Input/`, `Globals/` (Navbar/Footer), `Layouts/`
- `utils/data.js` — static lookup data (job categories, employment types)

**Adding a new page**: create component in the appropriate `pages/` subfolder → add route in `App.jsx` → wrap with `<ProtectedRoute>` if employer-only.

### Auth Flow

- Registration/login return a JWT (60-day expiry); stored in `localStorage`
- Every API request goes through `axiosInstance` which auto-attaches the token
- Backend `protect` middleware decodes the token and sets `req.user` before controllers run
- `User.role` is either `"jobseeker"` or `"employer"`; role determines which pages/routes are accessible

### File Uploads

- POST to `/api/auth/upload-image` returns a path; store path on the User document
- Files physically live in `backend/uploads/`; served at `http://localhost:8000/uploads/<filename>`
- Resume uploads (PDF) follow the same pattern via `/api/user/resume`
