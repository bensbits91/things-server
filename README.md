# My Backend Service

This project is a backend service built with Node.js, Fastify, Mongoose, and Auth0 for authentication. It provides a simple API for user registration and login.

## Project Structure

```
my-backend-service
├── src
│   ├── controllers
│   │   └── authController.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   └── authRoutes.js
│   ├── services
│   │   └── authService.js
│   ├── utils
│   │   └── authUtils.js
│   └── index.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Installation

To set up the project, clone the repository and install the required packages:

```bash
npm install fastify mongoose dotenv @auth0/auth0-spa-js nodemon
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URI=your_mongodb_connection_string
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

## Usage

To start the server in development mode, use:

```bash
npx nodemon src/index.js
```

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.