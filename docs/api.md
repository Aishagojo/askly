# API Endpoints

## Authentication
- `POST /api/auth/login` — User login
- `POST /api/auth/signup` — User registration
- `GET /api/auth/profile` — Get user profile (protected)

## Chatbot
- `POST /api/chat` — Send message to AI chatbot (protected)

## Mood Tracking
- `GET /api/mood` — Get user mood history (protected)
- `POST /api/mood` — Add new mood entry (protected)

## Journaling
- `GET /api/journal` — Get user journal entries (protected)
- `POST /api/journal` — Add new journal entry (protected)

## Resources
- `GET /api/resources` — Get mental health resources

## Notes
- All protected endpoints require a valid Firebase Auth token in the request header
- API keys and sensitive data are never exposed to the frontend or in the repository
