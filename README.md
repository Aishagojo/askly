

# Askly Therapy Chatbot

Askly is a modern web application that helps university students improve their mental wellness. The platform offers:
- An AI-powered chatbot for supportive, private conversations
- Mood tracking and visual insights
- Secure journaling with guided prompts
- Mindfulness and self-care tools
- Quick access to mental health resources

All user data is private and protected. Askly is designed for ease of use, security, and accessibility.

## Technology Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Authentication & Data:** Firebase Auth, Firestore
- **AI Chatbot:** OpenAI API

## Features
- Secure user authentication (Firebase)
- AI-powered chat for mental health support
- Mood tracking and history
- Private journaling
- Mindfulness and wellness tools
- Responsive, modern UI (Tailwind CSS)
- Protected routes and user sessions
- Privacy-first: user data is protected and not exposed

## Project Structure
```
askly-therepy-chatbot/
├── backend/        # Node.js/Express API, Firebase Admin, authentication
├── frontend/       # React app, UI, contexts, pages, services
├── docs/           # Project documentation (API, architecture, etc.)
├── package.json    # Project-level scripts and dependencies
```

## Getting Started
1. **Clone the repository**
2. **Install dependencies**
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend/client && npm install`
3. **Set up Firebase**
   - Add your Firebase config to `frontend/client/.env` (see `.env.example`)
   - Add your service account key to `backend/serviceAccountKey.json`
   - Set environment variables in `.env` files
4. **Run the servers**
   - Backend: `npm start` in `backend/`
   - Frontend: `npm start` in `frontend/client/`
5. **Access the app**
   - Visit `http://localhost:3000` for the frontend

## Architecture
- See `docs/architecture.md` for a high-level overview and data flow.
- Frontend communicates with backend via REST API, using Firebase Auth for secure sessions.
- Backend integrates with OpenAI (or Gemini) for chatbot responses and uses Firebase Admin SDK for secure user management.

## Security & Privacy
- All API keys and sensitive endpoints are hidden using environment variables and `.env` files (never committed to git).
- User data (moods, journals, chat) is private and protected by Firestore rules and backend authentication.
- See `docs/` for more on privacy and security.

## Documentation
- See the `docs/` folder for API docs, architecture, and more.
- Each subfolder (backend, frontend) has its own README for details.

## Project Summary
Askly was developed to address the mental health needs of university students by providing:
- 24/7 AI chat support
- Private, secure journaling
- Mood tracking and insights
- Mindfulness and self-care resources
- Easy access to emergency contacts and mental health resources

The project is designed for scalability, security, and ease of use, following the original proposal and best practices for privacy and user experience.

## Contributing
- Fork the repo, create a branch, and submit a pull request.
- Please add tests and update docs as needed.

## License
This project is for educational and research purposes. For production, review security and privacy requirements.
