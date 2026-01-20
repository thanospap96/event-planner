## Event Planner
This project was created for the certification of the Coding Factory program at the Athens University of Economics and Business (AUEB).

### Technologies
- **Backend:** Node.js, TypeScript, Express, MongoDB (Mongoose)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS

---

## Build & Deploy (Local)

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local) or MongoDB Atlas

---

## Backend (API)

### Environment variables
Create `backend/.env` based on `backend/.env.example`: 
PORT=5000, 
MONGO_URI=YOUR_MONGO_URI_HERE, 
JWT_SECRET=YOUR_JWT_SECRET_HERE.

### Install & Run
Backend install: `cd backend` then `npm install`.
Development: `npm run dev`. 
Production: `npm run build` then `npm start`. 

Backend runs on: `http://localhost:5000`.

---

## Frontend (React)

### Environment variables
Create `frontend/.env` based on `frontend/.env.example`: 
VITE_API_URL=http://localhost:5000/api.

### Install & Run
Frontend install: `cd frontend` then `npm install`. 
Development: `npm run dev`. 
Production: `npm run build` then `npm run preview`.

Frontend dev usually runs on: `http://localhost:5173`. 
Preview usually runs on: `http://localhost:4173`.

---

## API Documentation (Swagger)
Swagger UI is available for testing the API endpoints. Start the backend and open: `http://localhost:5000/api-docs`.

### Admin-only CRUD endpoints
Some user-management endpoints (admin CRUD) are not exposed in the UI. To test them via Swagger: 
(1) Log in as an admin user (`/api/auth/login`), 
(2) Copy the returned JWT token, 
(3) Click **Authorize** in Swagger and paste `Bearer <your_token>`,
(4) Test the admin endpoints (e.g. user list/search/delete).














[//]: # (## Event Planner)

[//]: # ()
[//]: # (This project was created for the certification of the Coding Factory program at the Athens University of Economics and Business &#40;AUEB&#41;.)

[//]: # ()
[//]: # (### Technologies)

[//]: # (- **Backend:** Node.js, TypeScript, Express, MongoDB &#40;Mongoose&#41;)

[//]: # (- **Frontend:** React, TypeScript, Vite, Tailwind CSS)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## Build & Deploy &#40;Local&#41;)

[//]: # ()
[//]: # (### Prerequisites)

[//]: # (- Node.js &#40;v18+ recommended&#41;)

[//]: # (- npm)

[//]: # (- MongoDB &#40;local&#41; or MongoDB Atlas)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## Backend &#40;API&#41;)

[//]: # ()
[//]: # (### Environment variables)

[//]: # (Create `backend/.env` based on `backend/.env.example`:)

[//]: # ()
[//]: # (PORT=5000)

[//]: # (MONGO_URI=)

[//]: # (JWT_SECRET=)

[//]: # ()
[//]: # ()
[//]: # (### Install & Run)

[//]: # (```bash```)

[//]: # (cd backend)

[//]: # (npm install)

[//]: # ()
[//]: # ()
[//]: # (### ###Development)

[//]: # ()
[//]: # (npm run dev)

[//]: # ()
[//]: # (Production &#40;build & start&#41;)

[//]: # ()
[//]: # (npm run build)

[//]: # (npm start)

[//]: # ()
[//]: # ()
[//]: # (Backend runs on: http://localhost:5000)

[//]: # ()
[//]: # ()
[//]: # (### ###Frontend &#40;React&#41;)

[//]: # ()
[//]: # (Environment variables)

[//]: # ()
[//]: # (Create frontend/.env based on frontend/.env.example:)

[//]: # ()
[//]: # (VITE_API_URL=http://localhost:5000/api)

[//]: # ()
[//]: # (Install & Run)

[//]: # (```bash```)

[//]: # (cd frontend)

[//]: # (npm install)

[//]: # ()
[//]: # ()
[//]: # (Development)

[//]: # ()
[//]: # (npm run dev)

[//]: # ()
[//]: # ()
[//]: # (Production build &#40;preview&#41;)

[//]: # ()
[//]: # (npm run build)

[//]: # (npm run preview)

[//]: # ()
[//]: # ()
[//]: # (Frontend:)

[//]: # ()
[//]: # (Dev usually runs on: http://localhost:5173)

[//]: # ()
[//]: # (Preview usually runs on: http://localhost:4173)

[//]: # ()
[//]: # (API Documentation &#40;Swagger&#41;)

[//]: # ()
[//]: # (Swagger UI is available for testing the API endpoints.)

[//]: # ()
[//]: # (Start the backend)

[//]: # ()
[//]: # (Open: http://localhost:5000/api-docs)

[//]: # ()
[//]: # (Admin-only CRUD endpoints)

[//]: # ()
[//]: # (Some user-management endpoints &#40;admin CRUD&#41; are not exposed in the UI.)

[//]: # (To test them via Swagger:)

[//]: # ()
[//]: # (Log in as an admin user &#40;/api/auth/login&#41;)

[//]: # ()
[//]: # (Copy the returned JWT token)

[//]: # ()
[//]: # (Click Authorize in Swagger and paste:)

[//]: # (Bearer <your_token>)

[//]: # ()
[//]: # (Test the admin endpoints &#40;e.g. user list/search/delete&#41;.)