# Book Search Engine (GraphQL)

![GitHub repo size](https://img.shields.io/github/repo-size/RubenDguez/book-search-engine)
![GitHub contributors](https://img.shields.io/github/contributors/RubenDguez/book-search-engine)
![GitHub last commit](https://img.shields.io/github/last-commit/RubenDguez/book-search-engine)
![GitHub license](https://img.shields.io/github/license/RubenDguez/book-search-engine)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green)
![Apollo-GraphQL](https://img.shields.io/badge/API-GraphQL-orange)
![React](https://img.shields.io/badge/frontend-React-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-yellow)
![npm](https://img.shields.io/badge/npm-v10.8.3-blue)

## Description

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js), allowing users to search for books via the Google Books API, save them to their account, and manage saved books. This project refactors an existing RESTful API to use a GraphQL API powered by Apollo Server.

## User Story

As an avid reader, I want to search for new books to read so that I can keep a list of books to purchase.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [License](#license)
- [Questions](#questions)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/RubenDguez/book-search-engine.git
    ```

2. Navigate to the project directory:
    ```bash
    cd book-search-engine
    ```

3. Install dependencies for both the client and server:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your MongoDB Atlas URI and JWT secret key:
    ```
    MONGODB_URI=<your-mongo-uri>
    JWT_SECRET=<your-secret-key>
    ```

5. Start the development server:
    ```bash
    npm run start:dev
    ```

## Usage

- Use the search bar to search for books via the Google Books API.
- Users can log in or sign up to save their favorite books to their account.
- Saved books can be viewed and managed from the user's profile.

## Technologies

- **Frontend**:
  - React
  - Apollo Client
  - GraphQL

- **Backend**:
  - Node.js
  - Express.js
  - Apollo Server
  - MongoDB (MongoDB Atlas)

## Features

- Search for books using the Google Books API.
- Authentication and account creation using JWT.
- GraphQL API for handling book and user data.
- Save and manage books from user profiles.
- Responsive and interactive UI.

## Screenshots

![](resources/book-search.png)
![](resources/login-signup.png)
![](resources/saved-books.png)

## Deployment

The app is deployed using Render and MongoDB Atlas. Access the live application [here](https://book-search-engine-lepn.onrender.com/).

## License

This project is licensed under the MIT License.

## Questions

- If you have further questions, you can contact me at: argenis.dominguez@hotmail.com
- This is my GitHub profile: [RubenDguez](https://github.com/RubenDguez)
