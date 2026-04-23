# TaskFlow - Project & Todo Management Application

A full-stack project and todo management application with authentication, built with the MERN stack (MongoDB, Express.js, React, Node.js) and Tailwind CSS.  
TaskFlow helps you organize your work into projects and manage todos with priorities, due dates, and completion tracking.

## Features

- 🔐 **Authentication** – User signup, login, and secure session handling using JWT stored in HTTP‑only cookies.
- 📁 **Project Management** – Create, edit, delete, and view projects with custom colors.
- ✅ **Todo Management** – Add, edit, delete, and mark todos as complete. Set priority (low/medium/high) and due date.
- 🎨 **Modern UI** – Responsive, clean interface built with Tailwind CSS.
- 🛡️ **Protected Routes** – Unauthorized users cannot access projects or todos.
- ⏳ **Loading & Empty States** – Visual feedback during async operations and helpful messages when no data exists.

## Tech Stack

### Frontend
- React 19 (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- cookie-parser
- cors

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/99-tejrajdewangan/project-todo-app

1. Backend Setup
cd backend
npm install
Create a .env file in the backend folder with the following variables:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project-todo-app
JWT_SECRET=your_super_secret_key_change_this_in_production
CLIENT_URL=http://localhost:5173
For MongoDB Atlas – use mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority

Start the backend server:

bash
npm run dev   # runs with nodemon
# or
npm start     # production
The server will run on http://localhost:5000.

2. Frontend Setup
Open a new terminal and navigate to the frontend folder:

bash
cd frontend
npm install
Create a .env file in the frontend folder:

env
VITE_API_URL=http://localhost:5000/api
Start the development server:

bash
npm run dev
The app will be available at http://localhost:5173.

4. Access the Application
Open http://localhost:5173 in your browser.

Sign up for a new account or log in with existing credentials.

Create projects, add todos, and manage your tasks.

Project Structure

project-todo-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── todoController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── todos.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Layout/
│   │   │   ├── Projects/
│   │   │   └── Todos/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   └── todoService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md


API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
POST	/api/auth/logout	Logout user
GET	/api/auth/me	Get current user

Projects
Method	Endpoint	Description
GET	/api/projects	Get all projects for user
GET	/api/projects/:id	Get single project + todos
POST	/api/projects	Create a new project
PUT	/api/projects/:id	Update project
DELETE	/api/projects/:id	Delete project & its todos

Todos
Method	Endpoint	Description
GET	/api/todos/project/:projectId	Get all todos for project
POST	/api/todos	Create a new todo
PUT	/api/todos/:id	Update todo
DELETE	/api/todos/:id	Delete todo
PUT	/api/todos/:id/toggle	Toggle completion status

Key Technical Decisions
JWT with HTTP-only Cookies: Enhanced security by storing tokens in HTTP-only cookies instead of localStorage

MongoDB Schema Design: Used referencing between collections for optimal query performance

Context API: Chosen over Redux for simpler state management needs

Tailwind CSS: Rapid UI development with utility-first approach

Vite: Faster development experience with hot module replacement

Protected Routes: Implemented route guards to prevent unauthorized access

Assumptions & Trade-offs
Assumption: Users will have a stable internet connection

Trade-off: Used simple color picker for project colors instead of predefined color palette

Assumption: Basic todo priorities (low, medium, high) are sufficient for most use cases

Trade-off: Implemented simple date picker instead of complex datetime picker for simplicity

Environment Variables
Backend .env
Variable	Description	Default
PORT	Server port	5000
MONGODB_URI	MongoDB connection string	mongodb://localhost:27017/taskflow
JWT_SECRET	Secret key for signing JWT tokens	(required)
CLIENT_URL	Frontend URL for CORS	http://localhost:5173
Frontend .env
Variable	Description	Default
VITE_API_URL	Backend API base URL	http://localhost:5000/api
Running in Production
Backend
Set NODE_ENV=production

Use a process manager like pm2:

bash
npm install -g pm2
pm start server.js --name project-todoa-app-backend
Frontend
Build the static files:

bash
npm run build
Serve the dist folder using a static server (e.g., Nginx, Vercel, Netlify).

