# FindMyCollege

- Developed a full-stack college discovery platform that helps students explore and compare colleges through a centralized and user-friendly interface.
- Built backend APIs and database queries to power advanced filtering of 900+ college records based on course type, course, district, and college status.
- Implemented an admin dashboard with CRUD operations and deployed the application using Render and MongoDB Atlas.

## Live Link

<https://findmycollege-wau3.onrender.com>

## Features

- Search colleges by name, location and basic filters
- View college details (location, courses, contact info, etc.)
- RESTful API endpoints for colleges

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, Lucide Icons, React Router
- Backend: Node.js, Express.js
- Database: MongoDB (MongoDB Atlas), Mongoose ORM

## Getting Started (Local)

1. Clone the repository:

```bash
git clone https://github.com/PurushottamBarai/FindMyCollege.git
cd FindMyCollege
```

1. Run Backend Server:

- Navigate to the `server` directory:

  ```bash
  cd server
  ```

- Install dependencies:

  ```bash
  npm install
  ```

- Create a `.env` file in the `server` directory:

  ```env
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/findmycollege
  PORT=3000
  ADMIN_USERNAME=your_admin_username
  ADMIN_PASSWORD=your_admin_password
  ```

- Start the server:

  ```bash
  npm run dev
  ```

1. Run Frontend Client:

- Open a new terminal and navigate to the `client` directory:

  ```bash
  cd client

  ```

- Install dependencies:

  ```bash
  npm install

  ```

- Start the development server:

  ```bash

  npm run dev
  ```

- Open `http://localhost:5173` in your browser.
