# Add From Excel To MongDB

## Objective
The objective of this project is to create a Node.js application to add candidate records from Excel files to a MongoDB database. The application includes a web landing page with an Excel upload option and provides success or error messages to users.

## Frontend Deployment
The frontend of this project is hosted on Vercel and can be accessed using the following URL:
[https://assingment-neemtree-klimb.vercel.app/](https://assingment-neemtree-klimb.vercel.app/)

## Backend Deployment
The backend of this project is hosted on Render and can be accessed using the following URL:
[https://assingment-neemtree-klimb.onrender.com/](https://assingment-neemtree-klimb.onrender.com/)

## Features
1. Web landing page with an Excel upload option.
2. Supports uploading of Excel files (.xlsx, .xls) and CSV files.
3. Error handling for unsupported file formats.
4. Duplicate email validation to ensure unique records.
5. Displays success message upon successful file upload and data insertion.
6. Displays error message if an error occurs during the upload process.
7. Provides information on the total number of rows, rows added, rows skipped (duplicate), and rows not processed (model mismatch or missing required fields).
8. Logical separation of Model & Controller for backend implementation.
9. Uses `async.eachSeries` to process one candidate at a time after reading from Excel.
10. Validates email uniqueness against the MongoDB database.
11. Responsive design using styled components for frontend styling.
12. Adaptable for both frontend and backend implementation.

## Tech Stack
- **Frontend**:
  - React.js
  - Axios for HTTP requests
  - Styled-components for styling
  - react-icons for icons
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database
  - mongoose as ODM (Object Data Modeling) library
  - csvtojson for converting CSV to JSON
  - xlsx and xlsjs for reading Excel files
  - async for asynchronous operations handling

## Technical Design
- Frontend and Backend are logically separated with clear separation of concerns.
- Backend uses Express.js for handling API routes and requests.
- Backend controller uses `async.eachSeries` to process candidate data one at a time after reading from Excel.
- Duplicate email validation is implemented in the backend to ensure unique records.
- Frontend handles file selection, form submission, and displays success/error messages to the user.
- Uses FormData to send file data to the backend API endpoint.

## Setup Instructions
1. You can clone the repository for this project using the following command:

```
git clone https://github.com/suyashpurwar1/Assingment_Neemtree_Klimb.git
```

This will create a local copy of the repository on your machine.

2. Install dependencies for both frontend(client) and backend(server):
   ```bash
   npm install
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```
4. Run the backend:
   ```bash
   node server.js
   ```
5. Update the base URL in the frontend code (`AddCandidate.js`) to match the backend API server.
6. Update the MongoDB connection string and port in the backend `.env` file.

## Usage
1. Access the web landing page.
2. Choose an Excel file (.xlsx, .xls) or CSV file.
3. Click the "Submit" button to upload the file.
4. Upon successful upload and data insertion, a success message is displayed with the total number of rows, rows added, rows skipped (duplicate), and rows not processed (model mismatch or missing required fields).
5. If an error occurs during the upload process, an error message is displayed.

## Note
- Make sure to update the backend baseURL and PORT & MongoDB connection string according to your environment.
- Ensure that the MongoDB server is running and accessible.
- The frontend and backend must be running simultaneously for the application to work properly.