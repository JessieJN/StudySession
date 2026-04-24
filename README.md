# StudySession App

## Overview

“StudySession is a fullstack web application that helps students track their study sessions and discover when and how they study most effectively.

The app allows users to:

* Browse and manage courses
* Search and filter courses
* Add courses to their personal profile
* Track study-related data
* Create sessions with course, date, focuslevel, notes

---

## Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Database: MongoDB Atlas
* Other: Mongoose, dotenv

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/JessieJN/StudySession.git
cd studySession
```

### 2. Install dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd ../server
npm install
```

---

### 3. Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
```

---

### 4. Run the application

From the root folder:

```bash
npm run dev
```

This will start both the frontend and backend using concurrently.

---

## Features

* Full CRUD operations for courses
* Search and filtering functionality
* Add courses to a user profile
* Auto-refresh of course data using `useEffect` and `setInterval`
* Clean component-based frontend structure

---

## API Example

### GET /courses

Returns all courses.

### GET /courses/search?search=react&program=IT

Returns filtered courses based on search and program.

---


## Future Improvements

* Add update functionality for study sessions
* Add statistics and visualizations
* Improve UI/UX
