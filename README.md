# Code README

This repository contains the code for a server application built using Node.js and Express.js. The application provides API routes for user authentication and management. It uses MongoDB for data storage and includes authentication middleware using Passport.js.

## Prerequisites

Before running the server, make sure you have the following installed:

- Node.js
- MongoDB

## Getting Started

To get started, follow the steps below:

1. Clone the repository:

   ```shell
   git clone https://github.com/example/repository.git
   ```

2. Install the dependencies:

   ```shell
   cd repository/server
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the `server` directory.
   - Define the following variables in the `.env` file:

     ```plaintext
     PORT=3000
     MONGO_DB_URL=mongodb://localhost:27017/database
     SESSION_SECRET=your_session_secret
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

     Replace `your_session_secret` and `your_jwt_secret` with your preferred session and JWT secrets, respectively. Modify the `MONGO_DB_URL` as per your MongoDB configuration.

     Set `NODE_ENV` to `production` if you want to disable console logging in the logging middleware.

4. Start the server:

   ```shell
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## Project Structure

The project structure is as follows:

```
server/
  |- src/
  |   |- app.js
  |   |- server.js
  |   |- services/
  |   |   |- auth.js
  |   |   |- mongo.js
  |   |- middlewares/
  |   |   |- logging.middlewares.js
  |   |- models/
  |   |   |- users/
  |   |   |   |- users.model.js
  |   |   |   |- users.mongo.js
  |   |- routes/
  |   |   |- api.js
  |   |   |- v1/
  |   |   |   |- apiV1.js
  |   |   |   |- auth/
  |   |   |   |   |- auth.routes.js
  |   |   |   |   |- auth.controller.js
  |- .env
  |- package.json
  |- README.md
```

- `app.js`: Configures the Express application, sets up middleware, and defines routes.
- `server.js`: Creates an HTTP server and starts the Express application.
- `services/`: Contains authentication and MongoDB connection configuration.
- `middlewares/`: Contains logging middleware for request logging.
- `models/`: Defines the MongoDB models for users.
- `routes/`: Defines the API routes for the application.
- `.env`: Contains environment variables used in the application.
- `package.json`: Contains project metadata and dependencies.

## Available API Endpoints

- `/api/v1/auth/register`: Registers a new user.
- `/api/v1/auth/login`: Logs in a user and returns a JWT token.
- `/api/v1/auth/logout`: Logs out the currently authenticated user.
- `/api/v1/auth/user`: Retrieves the currently authenticated user's information.
- `/api/v1/auth/user/:userId`: Retrieves a user's information by ID.
- `/api/v1/auth/user/disable/:userId`: Disables a user by ID.
- `/api/v1/auth/user/enable/:userId`: Enables a user by ID.
- `/api/v1/auth/user/:userId`: Updates a user's information by ID.
- `/api/v1/auth/user/:userId`: Deletes a user by ID.
- `/api/v1/auth/user/username/:username`: Retrieves a user's information by username.
- `/api/v1/auth/user/email/:email`: Retrieves a user's information by email.
- `/api/v1/auth/users`: Retrieves all users (admin access required).

Please refer to the code for detailed information about each API endpoint's functionality and required parameters.

## Authentication

The application uses local strategy authentication with Passport.js. It supports session-based authentication and JWT authentication. Session-based authentication is used for the `/api/v1/auth/login` and `/api/v1/auth/logout` routes, while JWT authentication is used for other routes.

## Logging

The application utilizes logging middleware to log requests to files. The log files are stored in the `logs` directory.

In development mode (`NODE_ENV=development`), request logs are also printed to the console. In production mode (`NODE_ENV=production`), console logging is disabled to improve performance.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).