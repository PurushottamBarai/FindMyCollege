# Product Requirements Document (PRD)

## FindMyCollege

### 1. Product Overview

**Product Name:** FindMyCollege  
**Version:** 1.0.0  
**Product Type:** Backend API & Database for College Search & Comparison

FindMyCollege is a dynamic web application designed to help students discover and compare colleges across Maharashtra based on location, courses, type of course, and status of college. The system supports search, filtering, detailed data retrieval, user registration/login, and administrative management of college directory listings.

### 2. Target Users

- **System Administrators (Admin):** Manage college data listings (create, update, delete, search) and oversee directory accuracy.
- **Students / General Users (Users):** Browse active college directories, apply search filters, and view information on courses, status, intake, and locations.

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** General users can register using email and a secure password.
- **User Login:** General users log in securely using credentials.
- **Admin Authentication:** Secure credential validation against environment variables (`ADMIN_USERNAME` and `ADMIN_PASSWORD`) to authenticate admin access.
- **Role-Based Access Control:** Secure request headers (such as `x-admin-auth`) limit college modification capability to administrators.

#### 3.2 College Directory Management

- **College List & Filter Board:** Retrieve a paginated list of colleges matching criteria like district, course type, course name, or a general search term.
- **Dynamic Filter Suggestions:** Extract distinct lists of districts, course names, and course types to feed front-end drop-downs.
- **Admin Operations:** Create new college entries, update existing details, or delete listings.

#### 3.3 Database Seeding & Integrity

- **Auto-Seeder Script:** Script to read college data from `UG.json` and cleanly populate or rebuild the MongoDB database.

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Authentication Routes** (`/api/auth/`)

- `POST /register` - User registration
- `POST /login` - User login

**Admin Auth Routes** (`/api/admin/auth/`)

- `POST /login` - Admin authentication with credentials

**Admin Management Routes** (`/api/admin/`)

- `POST /colleges` - Create a new college listing (secured, Admin only)
- `PUT /colleges/:id` - Update details of a specific college (secured, Admin only)
- `DELETE /colleges/:id` - Delete a specific college listing (secured, Admin only)
- `GET /colleges/search` - Search through colleges with regex matching (secured, Admin only)

**College Directory Routes** (`/api/colleges/`)

- `GET /` - Paginated and filtered list of colleges
- `GET /filters` - List of unique districts, course types, and course names for dropdowns

#### 4.2 Permission Matrix

| Feature                        | Admin | User | Guest |
| ------------------------------ | ----- | ---- | ----- |
| Browse/Filter Colleges         | ✓     | ✓    | ✓     |
| Retrieve Dropdown Filters      | ✓     | ✓    | ✓     |
| Register / Login               | ✗     | ✓    | ✓     |
| Admin Login                    | ✓     | ✗    | ✗     |
| Create/Update/Delete Colleges  | ✓     | ✗    | ✗     |
| Run Seeder Scripts             | ✓     | ✗    | ✗     |

#### 4.3 Data Models

**User Schema (`users.model.js`):**

- `email` - Unique string representation of user email
- `password` - Secure password string
- `username` - Lowercase email representation
- `role` - `user` (default role for registered accounts)

**College Schema (`college.model.js`):**

- `Sr. No.` - Intake listing number
- `College Code` - Unique DTE college code identifier (Required, Unique)
- `College Name` - Legal name of college (Required)
- `Course Name` - Offered academic major/degree program
- `Course Type` - Level of study (e.g. Under Graduate)
- `Status` - Institutional recognition status
- `Total Intake` - Student admission capacity
- `District` - Geographic location of the college

### 5. Security Features

- Simple role-based request header checks via `requireAdmin` middleware.
- Input criteria validation checks (e.g., regex checks on email and password criteria during registration).
- Global express error handling middleware.
- Database connection pooling configured safely.

### 6. Success Criteria

- Clean, modular MVC architecture (Routes, Models, Middlewares, DB configurations).
- Functional search, pagination, and multi-filter operations.
- Operational admin panel CRUD endpoints.
- Error-free seeder implementation matching MongoDB Mongoose schemas.
