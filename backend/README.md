# Askly Therapy Chatbot Backend

This is the backend for Askly, an AI-powered therapy chatbot for mental wellness support. It is built with Node.js, Express, and Firebase Admin SDK, and is designed to provide secure authentication, user management, and AI-powered chat features.

## Project Structure

```
backend/
├── controllers/           # Controller logic (e.g., firebaseAdmin.js)
├── middleware/            # Express middleware (e.g., authenticateToken.js)
├── models/                # Data models (e.g., user.js)
├── routes/                # API route definitions (e.g., auth.js)
├── services/              # Business logic/services (e.g., userService.js)
├── .env                   # Environment variables (not committed)
├── .gitignore             # Files/folders to ignore in git
├── package.json           # Project dependencies and scripts
├── server.js              # Main Express server file
```

## Key Files
- `controllers/firebaseAdmin.js`: Initializes Firebase Admin SDK for backend operations.
- `middleware/authenticateToken.js`: Middleware to protect routes using Firebase Auth tokens.
- `routes/auth.js`: Example route for user profile and authentication.
- `services/userService.js`: User-related business logic.
- `server.js`: Main server entry point, wires up routes and middleware.

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Add your Firebase service account key**
   - Download from Firebase Console and save as `serviceAccountKey.json` in the backend folder.
4. **Create a `.env` file** with your environment variables (e.g., OpenAI API key, Firebase project info).
5. **Start the server**
   ```bash
   npm start
   ```

## How It Works
- The backend uses Express for routing and middleware.
- Firebase Admin SDK is used for secure authentication and user management.
- Middleware protects sensitive routes by verifying Firebase ID tokens.
- The server can connect to OpenAI or other AI APIs for chatbot responses.
- All sensitive data and keys are kept out of version control using `.gitignore`.

## Development Steps
1. **Initialize Node.js project and install dependencies**
2. **Set up Express server (`server.js`)**
3. **Integrate Firebase Admin SDK for authentication**
4. **Create middleware for token verification**
5. **Organize code into controllers, routes, services, and models**
6. **Add API endpoints for authentication and user management**
7. **Connect to AI APIs for chatbot functionality**
8. **Test endpoints and secure with middleware**
9. **Document the project for easy onboarding**

## Security
- Do not commit `.env` or `serviceAccountKey.json` to version control.
- Use strong, unique API keys and secrets.
- Always verify user tokens on protected routes.

## Contributing
1. Fork the repo and create a new branch.
2. Make your changes and add tests if needed.
3. Submit a pull request with a clear description.

## License
This project is for educational and research purposes. For production use, review and update security, privacy, and compliance as needed.
