# User Management System (Node.js & MongoDB)

## Overview

This project is a **User Management System API** built with Node.js, Express, and MongoDB.
It allows an **Admin** to create users, send account activation tokens, and manage authentication securely.

## Features

* Admin creates users without passwords
* Token-based account activation
* Secure password setup
* JWT-based authentication
* Role-based user management
* MongoDB Atlas integration

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* dotenv
* Nodemon

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd usermanagement
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. MongoDB Atlas Configuration

* Ensure your **current IP address is whitelisted** in MongoDB Atlas.
* Otherwise, the server will not connect.

### 5. Run the Project

```bash
npm run dev
```

## Basic Flow

1. Admin creates a user
2. System generates an activation token
3. User sets password using token
4. Account becomes active
5. User logs in

## Testing

* All endpoints were tested using **Postman**
* Ensure the server is running before testing APIs

## Author

Jones Chikwezga

