# Features & User Flows

## Main Features
- **AI Chatbot:** 24/7 support, empathetic conversation, privacy-first
- **Mood Tracking:** Daily mood input, history, visual insights
- **Journaling:** Private, secure, guided prompts
- **Mindfulness Tools:** Breathing, meditation, grounding exercises
- **Resources:** Emergency contacts, curated mental health links

## User Flows
1. **Sign Up / Login**
   - User registers or logs in via Firebase Auth
   - Session is protected and private
2. **Chatbot Interaction**
   - User sends message to AI chatbot
   - Backend verifies token, gets AI response, returns to frontend
3. **Mood Tracking**
   - User selects mood, data saved to Firestore
   - User can view mood history and insights
4. **Journaling**
   - User writes journal entry, optionally guided by prompts
   - Data is private and only accessible to the user
5. **Mindfulness & Resources**
   - User accesses exercises and resource links

## Privacy
- All user data is protected by Firestore rules and backend authentication
- No sensitive data or API keys are exposed in the repository
