# Copilot Instructions for Hirely Job Portal App

## Overview
This is a full-stack job portal application with a React/Vite frontend and a Node.js/Express/MongoDB backend. The workspace is split into `client/` (frontend) and `backend/` (API server).

## Architecture
- **Frontend (`client/`)**: Built with React, Vite, and uses context for authentication. Pages are organized by user role (Employer, JobSeeker, LandingPage). Components are grouped by type (Cards, Inputs, Layouts).
- **Backend (`backend/`)**: Node.js/Express REST API. Models represent core entities (User, Job, Application, SavedJob, Analytics). Controllers handle business logic. Routes are split by resource. MongoDB is used for persistence.
- **Uploads**: User-uploaded files (e.g., profile images) are stored in `backend/uploads/`.

## Developer Workflows
- **Frontend**: Start with `npm run dev` in `client/` for Vite dev server. Hot module reload is enabled.
- **Backend**: Start with `npm start` in `backend/`. Server entry is `server.js`.
- **Linting**: ESLint is configured in `client/eslint.config.js`.
- **No explicit test setup detected.**

## Key Patterns & Conventions
- **API Communication**: Frontend uses `src/utils/axiosInstance.js` for API calls. Endpoints are defined in `src/utils/apiPath.js`.
- **Auth**: JWT-based authentication. Middleware in `backend/middlewares/auth.middleware.js` protects routes.
- **File Uploads**: Handled by `backend/middlewares/upload.middleware.js`.
- **Role Separation**: Employer and JobSeeker features are separated in both frontend and backend.
- **React Context**: Auth state managed in `src/context/AuthContext.jsx`.
- **Protected Routes**: Implemented in `src/routes/ProtectedRoute.jsx`.

## Integration Points
- **Frontend <-> Backend**: All API requests go through the Express server. Use the paths in `apiPath.js`.
- **External Libraries**: Vite, React, Axios, ESLint (frontend); Express, Mongoose, Multer (backend).

## Examples
- To add a new API endpoint: create a controller in `backend/controllers/`, add a route in `backend/routes/`, and update `apiPath.js` if needed.
- To add a new page: create a component in `client/src/pages/`, add to router if needed.

## References
- Frontend entry: `client/src/main.jsx`, `client/src/App.jsx`
- Backend entry: `backend/server.js`
- Auth context: `client/src/context/AuthContext.jsx`
- API paths: `client/src/utils/apiPath.js`
- Middleware: `backend/middlewares/`

---
For questions or unclear conventions, check the relevant controller, route, or context file for examples.
