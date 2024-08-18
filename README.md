# BookSelfs Website

This is a BookSelfs Website built using Node.js, React, and MySQL. The website allows users to manage a list of books, including adding, updating, and deleting book records.

## Table of Contents

- Features
- Technologies Used
- Setup Instructions
  - Prerequisites
  - Backend Setup
  - Frontend Setup
  - Running the Application
  - Database Setup
- Contributing
- License

## Features

- Add new books
- Update existing books
- Delete books
- View a list of all books

## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: React
- **Database**: MySQL

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/navinAce/BookSelfs.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the database**:
    - Create a MySQL database named `book_database`.
    - Update the database connection settings in your `db.js` or `.env` file.

4. **Set up `package.json` and run the backend server**:
    ```bash
    npm init
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
    npm run dev
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend server**:
    ```bash
    npm run dev
    ```

### Running the Application

- The backend server will be running at `http://localhost:8000`.
- The frontend server will be running at `http://localhost:5173`.

Open your browser and navigate to `http://localhost:5173` to use the application.

## Database Setup

Since the database files are not included in the repository, you need to set up the MySQL database manually:

1. **Create the database**:
    ```sql
    CREATE SCHEMA bookdatabase;
    USE bookdatabase;
    ```

2. **Create the necessary tables**:
    ```sql
    CREATE TABLE books (
        id INT AUTO_INCREMENT,
        bookName VARCHAR(50) NOT NULL,
        authorName VARCHAR(50) NOT NULL,
        price VARCHAR(50) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
    DESC books;
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
