# Askly Project Architecture

## Overview
Askly is a full-stack web application for mental wellness support, featuring an AI-powered chatbot, mood tracking, journaling, and mindfulness tools. The system is designed for scalability, security, and ease of use.

## High-Level Diagram
```
[User] <-> [React Frontend] <-> [Express Backend/API] <-> [Firebase (Auth, Firestore)]
                                              |
                                              +-> [OpenAI API / AI Service]
```

## Components
- **Frontend (React):**
  - UI components, pages, and context providers for state management
  - Handles authentication, chat, mood, journal, and mindfulness features
  - Communicates with backend via REST API

- **Backend (Node.js/Express):**
  - API endpoints for chat, user, mood, journal, and more
  - Middleware for authentication (Firebase token verification)
  - Integrates with OpenAI (or other AI) for chatbot responses
  - Uses Firebase Admin SDK for secure user management

- **Firebase:**
  - Authentication (email/password, Google, etc.)
  - Firestore for storing user data (moods, journals, etc.)
  - Service account for backend admin operations

- **AI Service (OpenAI, Gemini, etc.):**
  - Provides natural language responses for the chatbot

## Data Flow
1. User interacts with the React frontend
2. Frontend sends requests to backend API (with Firebase token if authenticated)
3. Backend verifies token, processes request, interacts with AI or database as needed
4. Backend returns response to frontend
5. Frontend updates UI accordingly

## Security
- All sensitive keys and credentials are stored in `.env` and `.gitignore`d
- Firebase Admin SDK is used only on the backend
- Protected routes require valid Firebase ID tokens

## Extensibility
- Add new features by creating new routes, controllers, and services in backend
- Add new UI pages/components in frontend
- Update docs in `docs/` as the project grows
