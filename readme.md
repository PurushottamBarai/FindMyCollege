# FindMyCollege

FindMyCollege is a lightweight web application that helps students discover and compare colleges across Maharashtra based on location, courses, type of course and status of college. 

Built with Node.js, Express, and MongoDB, it provides search, filter, and detailed college pages, and is deployed on Render and the databases is hosted on MongoDB Atlas 
## Live Link:
 https://findmycollege-wau3.onrender.com

## Features
- Search colleges by name, location and basic filters
- View college details (location, courses, contact info, etc.)
- RESTful API endpoints for colleges

## Tech Stack
- HTML, CSS, JavaScript
- Node.js, Express.js, MongoDB Atlas

## Getting Started (Local)

1. Clone the repository
```bash
git clone https://github.com/PurushottamBarai/FindMyCollege.git
cd FindMyCollege
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables
Create a `.env` file in the root directory and add your MongoDB Atlas connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/findmycollege
PORT=3000
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

4. Start the app
```bash
npm start
```
The application will be available at `http://localhost:3000`

## Project Structure
- `src/index.js`: The application entry point that initializes the database connection and starts the HTTP server.
- `src/app.js`: Configures the Express application, registers middlewares, and mounts routes.
- `src/models/`: Contains Mongoose schemas (e.g., `college.model.js`) that define the structure of data stored in MongoDB.
- `src/routes/`: Contains all the Express API endpoints (e.g., `college.route.js`, `auth.route.js`) to keep the backend modular.
- `src/controllers/`: Contains controller functions that handle incoming HTTP requests and responses.
- `src/db/`: Contains database connection and configuration logic (including `seeder.js`).
- `src/middlewares/`: Contains Express middlewares (e.g., `auth.middleware.js`, `error.middleware.js`).
- `public/`: Contains the frontend HTML, CSS, and JS files served to the user.
