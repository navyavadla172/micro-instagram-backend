# Micro Instagram Backend

A backend for a micro Instagram clone built using **Node.js**, **Express**, and **MySQL**. This project provides a RESTful API for managing users and posts.

## Table of Contents
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
  - [User Routes](#user-routes)
  - [Post Routes](#post-routes)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

## Installation

1. **Clone the repository**:
   ```bash
   git remote add origin https://github.com/navyavadla172/micro-instagram-backend.git
   
Navigate to the project directory:

bash
Copy code
cd micro-instagram-backend
Install dependencies:

bash
Copy code
npm install
Setup environment variables: Create a .env file in the root directory with the following environment variables:

bash
Copy code
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
Configure MySQL database: Make sure you have a MySQL instance running and create a database with the name specified in the .env file. If needed, run the SQL scripts to create the necessary tables (e.g., users and posts tables).

Environment Setup
MySQL Database:
Ensure that you have MySQL installed on your local machine or use a remote MySQL database.
You can install MySQL via MySQL official documentation.
Node.js:
This project uses Node.js. You can install it from Node.js official website.
Ensure you have npm installed as well, which comes with Node.js.
Running the Application
Start the server: Run the following command to start the server in development mode:

bash
Copy code
npm start
The backend server will start and listen on the configured port (default is 3000).

Test the API: You can test the API using tools like Postman or cURL by sending requests to the API endpoints listed below.

Running Tests
To ensure everything is working correctly, you can run the tests using Jest. The tests will verify the correctness of the API routes.

Run the tests:

bash
Copy code
npm test
This will run all the test cases in the src/__tests__ directory and display the results.

Test Results: The tests cover both user and post routes to ensure that:

Users can be created and retrieved.
Posts can be created, updated, and deleted.
API Documentation
User Routes
POST /api/users
Create a new user.

Request body:

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
GET /api/users
Get all users.

Response:

json
Copy code
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
]
Post Routes
POST /api/posts
Create a new post.

Request body:

json
Copy code
{
  "title": "My First Post",
  "description": "This is the description of my first post.",
  "images": ["image1.jpg", "image2.jpg"],
  "userId": 1
}
Response:

json
Copy code
{
  "id": 1,
  "title": "My First Post",
  "description": "This is the description of my first post.",
  "images": ["image1.jpg", "image2.jpg"],
  "userId": 1
}
PUT /api/posts/:id
Update an existing post.

Request body:

json
Copy code
{
  "title": "Updated Post Title",
  "description": "Updated description",
  "images": ["updated-image1.jpg"]
}
Response:

json
Copy code
{
  "id": 1,
  "title": "Updated Post Title",
  "description": "Updated description",
  "images": ["updated-image1.jpg"],
  "userId": 1
}
DELETE /api/posts/:id
Delete a post.

Response:

json
Copy code
{
  "message": "Post deleted successfully"
}
Deployment
Deploying to Vercel:

Create an account on Vercel.
Link your GitHub repository to Vercel and deploy the backend.
Environment Variables in Vercel:

In your Vercel dashboard, go to Settings -> Environment Variables.
Add the same environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) in the Vercel environment.
Accessing the API: Once deployed, you can access the API endpoints using the provided Vercel URL (e.g., https://your-project-name.vercel.app/api).

Technologies Used
Node.js: JavaScript runtime environment.
Express: Web framework for building RESTful APIs.
MySQL: Relational database used to store user and post data.
Jest: JavaScript testing framework used for unit testing.
Vercel: Cloud platform used for deployment.
Author
Navya Vadla
Backend Developer
GitHub
