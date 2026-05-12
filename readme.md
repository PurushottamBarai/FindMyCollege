<<<<<<< HEAD
# FindMyCollege

**Live Demo:** [https://findmycollege-wau3.onrender.com](https://findmycollege-wau3.onrender.com)

FindMyCollege is a full-stack web application designed to help students discover and filter colleges based on various criteria. The platform provides a seamless experience for browsing educational institutions, with administrative features for managing college data.

## Features

- **College Directory**: Browse a comprehensive list of colleges and educational institutions.
- **Search and Filter**: Easily search for specific colleges or filter them based on course types, districts, and other criteria.
- **User Authentication**: Login and registration functionality for future user profile management.
- **Admin Dashboard**: Dedicated administrative interface to manage college entries, including full CRUD (Create, Read, Update, Delete) operations.
- **Data Scraping**: Integrated backend scripts to update and seed college data automatically.

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose (ODM)

## Project Structure

- Frontend assets and HTML pages are located in the `src/public` directory.
- The Express server (`server.js`) handles API routing and serves the static frontend files.
- Database models, routing logic, and scripts are modularized within the `src` folder.

## Setup and Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB database and add your connection string as `MONGO_URI` in an `.env` file.
4. Run the seed script to populate the database: `npm run seed`.
5. Start the server: `npm start`.
6. Access the application at `http://localhost:3000`.

## Deployment

This application is fully compatible with modern cloud hosting providers. It is currently deployed with the following architecture:
- **Database**: MongoDB Atlas (Cloud Database)
- **Application Hosting**: Render Web Services

Live Application: [https://findmycollege-wau3.onrender.com](https://findmycollege-wau3.onrender.com)
=======
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
```

4. Start the app
```bash
npm start
```
The application will be available at `http://localhost:3000`

## Project Structure
- `src/models/`: Contains Mongoose schemas (e.g., `College.js`) that define the structure of data stored in MongoDB.
- `src/routes/`: Contains all the Express API endpoints (colleges, admin, auth) to keep the backend modular.
- `src/scripts/`: Contains utility scripts (like `seedData.js`) used to initially populate your MongoDB Atlas database using data from `UG.json`.
- `src/config/`: Contains the database connection logic.
- `src/public/`: Contains the frontend HTML, CSS, and JS files served to the user.

## Contributing
Contributions are welcome. Open an issue or submit a pull request. If your change affects deployment or environment variables, please update this README.
>>>>>>> cf4589a (Remove duplicated files)
