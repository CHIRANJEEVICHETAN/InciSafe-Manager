# InciSafe Manager

**InciSafe Manager** is a mobile application designed to streamline the reporting, management, and resolution of safety incidents within organizations. The app allows employees to quickly report incidents and notify the relevant teams for immediate action. Admins can monitor incidents in real-time, analyze trends, and manage users through a robust admin dashboard.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
InciSafe Manager simplifies incident reporting by digitizing the process and ensuring immediate action through real-time notifications. The application offers role-based access for users and admins, making it suitable for organizations of various sizes. It is built using **React Native** for the mobile front-end and **Node.js** with **Firebase** for the backend and database management.

## Features
- **Incident Reporting:** Allows users to report incidents with multimedia uploads (photos/videos) for further context.
- **Real-Time Notifications:** Sends notifications via Firebase Cloud Messaging when incidents are reported, updated, or resolved.
- **Role-Based Access:** Provides separate interfaces for employees and admins.
- **Admin Dashboard:** Allows admins to view incident trends, manage users, and resolve issues.
- **REST API Integration:** Fetches and stores dropdown items (e.g., incident types, departments) in real-time for efficient data handling.
- **Data Storage:** Stores incident reports, user data, and files using Firebase Firestore and Firebase Storage.
- **Secure Authentication:** Implements secure login with Firebase Authentication for users and admins.

## Technology Stack

### **Front-End:**
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Redux](https://redux.js.org/) (for state management)
- [Figma](https://www.figma.com/) (for UI/UX design)

### **Back-End:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore) (for NoSQL database)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (for user authentication)
- [Firebase Storage](https://firebase.google.com/docs/storage) (for storing multimedia files)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) (for notifications)
- [REST API](https://restfulapi.net/) (for API communication between the front-end and back-end)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase Account](https://firebase.google.com/) (for database and authentication setup)

### Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/inciSafeManager.git
   cd inciSafeManager
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   cd frontend
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project and enable Firestore, Firebase Authentication, and Firebase Cloud Messaging.
   - Add your `google-services.json` for Android and `GoogleService-Info.plist` for iOS to the project’s `android` and `ios` directories respectively.

4. **Create a `.env` File:**
   - Add your Firebase credentials to the `.env` file:
     ```bash
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

5. **Run the Project:**
   ```bash
   npm start
   ```

## Usage

- **For Users:**
   - Login using credentials or register a new account.
   - Report incidents with a detailed description and multimedia uploads.
   - Track the status of submitted incidents in real-time.

- **For Admins:**
   - Monitor all reported incidents.
   - Manage user roles and incident categories.
   - View and analyze incident trends using visual reports on the admin dashboard.

## API Endpoints

### Authentication:
- `POST /api/login`: Log in a user or admin.
- `POST /api/register`: Register a new user.
- `POST /api/reset-password`: Send a password reset link to a user.

### Incidents:
- `GET /api/incidents`: Retrieve all incidents.
- `POST /api/incidents`: Create a new incident report.
- `GET /api/incidents/:id`: Retrieve a specific incident.

### Admin:
- `GET /api/users`: Retrieve all users (admin access only).
- `PUT /api/users/:id`: Update user roles or details.
- `DELETE /api/users/:id`: Remove a user from the system.

## Folder Structure
```plaintext
inciSafeManager/
├── backend/                 # Node.js server and API
├── frontend/                # React Native app
├── .gitignore               # Git ignored files
├── package.json             # Node dependencies
├── README.md                # Project documentation
├── .env                     # Environment variables
└── firebase.json            # Firebase configuration
```

## Contributing
If you would like to contribute to this project, feel free to fork the repository and create a pull request. Please make sure to adhere to the project's coding standards.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### **Key Sections in the README:**
- **Project Overview:** Brief explanation of the project’s purpose.
- **Features:** A list of the core functionalities (incident reporting, notifications, admin dashboard, etc.).
- **Technology Stack:** The front-end, back-end, and Firebase services being used.
- **Setup and Usage:** Instructions for setting up the project and running it locally.
- **API Endpoints:** Examples of the API routes for interaction between the app and the backend.
- **Folder Structure:** A guide to the project structure for developers.

