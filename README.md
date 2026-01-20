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













