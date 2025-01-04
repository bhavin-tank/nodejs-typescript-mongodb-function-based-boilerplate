# StartKit-NodeJS

**Version:** 1.0.0  
**Author:** bhavin-tank  
**License:** ISC

## Description

StartKit-NodeJS is a versatile Node.js Starter Kit built with **TypeScript**, **Express**, and **Mongoose**.  
This project is designed to help developers kickstart server-side development with a pre-configured backend setup that supports:

- **Scalable architecture**
- **Environment configuration**
- **Authentication**
- **Input validation**
- **Security enhancements**

It provides predefined scripts and tools for rapid and efficient development, including building, formatting, and linting.

---

## Features

- **TypeScript** for type-safe development.
- **Express.js Framework**: Robust route handling and middleware support.
- **Mongoose ODM**: Simplified interaction with MongoDB.
- **Authentication and Authorization** using **bcrypt** and **jsonwebtoken**.
- **Input Validation**: Validate API inputs with **Joi**.
- **Configuration with dotenv**: Environment variables.
- **Security Enhancements** with **Helmet** and **Compression**.
- **Cross-Origin Resource Sharing** (CORS) support.
- Developer tools: **Nodemon** for live development, **Prettier**, **ESLint**, and **TypeScript linting**.
- **Custom scripts** for common tasks: building, starting, linting, and formatting.
- Scalable directory structure for modular development.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bhavin-tank/nodejs-typescript-mongodb-function-based-boilerplate.git
   cd nodejs-typescript-mongodb-function-based-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

    - Copy the `.env.example` file as `.env`.
    - Update the variables as per your setup.

---

## Usage

### Development Mode

To run the application in development mode with live-reloading:

```bash
npm run start:dev
```

### Production Mode

First, build the project:

```bash
npm run build
```

Then, start the application:

```bash
npm run start
```

---

## Scripts

Here are the scripts you can use in this starter kit:

- **`npm run build`**: Builds the TypeScript code into JavaScript.
- **`npm run start`**: Starts the built application in production.
- **`npm run start:dev`**: Runs the application in development mode with live reload using **nodemon**.
- **`npm run prettier`**: Checks code formatting.
- **`npm run prettier:fix`**: Fixes code formatting issues.
- **`npm run format`**: Combines steps to fix formatting using Prettier.
- **`npm run clean`**: Cleans the build output (`dist` folder).

---

## Directory Structure

```plaintext
src/
├── config/          # Configuration files (env, database, etc.)
├── controllers/     # Request handlers for routes
├── middlewares/     # Custom middleware
├── models/          # Mongoose models
├── routes/          # API route definitions
├── services/        # Business logic and reusable modules
├── utils/           # Helper functions/utilities
├── server.ts        # Entrypoint for the application
```

---

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [Mongoose](https://mongoosejs.com/) - ODM for MongoDB
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable support
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - Password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JWT for authentication
- [Joi](https://joi.dev/) - Input validation
- [Helmet](https://helmetjs.github.io/) - Security for HTTP headers
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger
- [Prettier](https://prettier.io/) - Code formatting
- [ESLint](https://eslint.org/) - Code linting

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the project and open a pull request.

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## Acknowledgments

This starter kit is inspired by industry-standard best practices for backend Node.js app development. Designed to save time and effort, especially for new projects.