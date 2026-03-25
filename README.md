# 💼 Hirely

> A full-stack job portal built with the MERN stack — connecting employers and job seekers with role-based access, application tracking, resume upload, and analytics dashboards.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT%20%2F%20OAuth2-000000?logo=jsonwebtokens)](https://jwt.io/)

---

## Overview

Hirely is a fully responsive job marketplace where employers can post roles and manage applications, while job seekers can build dynamic profiles, upload resumes, save searches, and track their applications — all secured with JWT/OAuth2 authentication.

---

## Features

- **👔 Employer Dashboard** — Post jobs, review applications, and view hiring analytics
- **👤 Job Seeker Profiles** — Dynamic profiles with resume upload and saved job searches
- **🔐 Authentication** — JWT and OAuth2 with role-based access control (Employer / Job Seeker)
- **📄 Application Tracking** — End-to-end application flow from apply to hired
- **📊 Analytics Dashboard** — Hiring metrics and application statistics for employers
- **🔍 Job Search & Filters** — Search, filter, and save job listings
- **📱 Fully Responsive** — Mobile-first design across all pages

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, OAuth2, role-based access |
| **File Upload** | Resume upload & storage |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/officialTechBro/Hirely.git
cd Hirely

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../client && npm install

# Set up environment variables
# Add MONGO_URI, JWT_SECRET to backend/.env

# Run backend
cd ../backend && npm run dev

# Run frontend (separate terminal)
cd ../client && npm start
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get token |
| GET | `/api/jobs` | Get all job listings |
| POST | `/api/jobs` | Create a job (Employer) |
| POST | `/api/jobs/:id/apply` | Apply to a job (Seeker) |
| GET | `/api/applications` | Get user's applications |

---

## Project Structure

```
backend/
├── controllers/   # Route handlers
├── models/        # Mongoose schemas
├── routes/        # API routes
├── middleware/     # Auth & validation
client/
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Application pages
│   ├── context/     # Auth & state management
│   └── utils/       # Helper functions
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Contact

**Taiwo Oladosu** — Full Stack Engineer

- LinkedIn: [linkedin.com/in/oladosu-taiwo](https://www.linkedin.com/in/oladosu-taiwo)
- GitHub: [@officialTechBro](https://github.com/officialTechBro)
- Email: taiwooladosu1@gmail.com
