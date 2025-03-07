# educase-internship-assignment

This is a simple Node.js and Express-based API for managing school data, using MySQL as the database.

## Features

- **Add a School** (`POST /addSchool`)
- **List Nearby Schools** (`GET /listSchools?latitude=<>&longitude=<>`)
- **List All Schools** (`GET /listAllSchools`)

## Setup & Installation

### Installation Steps

1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure database & server settings:
   ```env
   PORT=8080
   DB_URI=<your-db-host>
   DB_USER=<your-db-user>
   DB_PASS=<your-db-password>
   DB_NAME=<your-db-name>
   DB_PORT=<your-db-port>
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Add a School

**Endpoint:** `POST /addSchool`

- **Request Body:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9012
  }
  ```
- **Response:** `201 Created` or error message

### 2. List Nearby Schools

**Endpoint:** `GET /listSchools?latitude=<>&longitude=<>`

- **Response:** List of nearby schools sorted by proximity

### 3. List All Schools

**Endpoint:** `GET /listAllSchools`

- **Response:** Full list of registered schools

## Technologies Used

- Node.js
- Express.js
- MySQL
