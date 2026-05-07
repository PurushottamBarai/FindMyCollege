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
