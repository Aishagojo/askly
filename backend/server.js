// server.js
// Main backend server for Askly chatbot

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getChatbotResponse } = require('./services/openaiService');
const { saveMessage, getRecentMessages } = require('./services/firestoreService');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Chatbot API endpoint
app.post('/api/chat', async (req, res) => {
  const { message, userId } = req.body;
  if (!message || !userId) {
    return res.status(400).json({ error: 'Message and userId are required.' });
  }
  // Save user message
  await saveMessage(userId, message, 'user');
  // Get recent history
  const history = await getRecentMessages(userId, 5);
  // Prepare messages for OpenAI
  const openaiMessages = [
    { role: 'system', content: 'You are Askly, an empathetic therapy chatbot for mental wellness support.' },
    ...history.map(h => ({ role: h.sender === 'user' ? 'user' : 'assistant', content: h.message })),
    { role: 'user', content: message }
  ];
  const response = await getChatbotResponse(openaiMessages);
  // Save bot response
  await saveMessage(userId, response, 'assistant');
  res.json({ response });
});

// Journal API endpoints
const { saveJournalEntry, getJournalEntries } = require('./services/journalService');

app.post('/api/journal', async (req, res) => {
  const { entry, userId } = req.body;
  if (!entry || !userId) {
    return res.status(400).json({ error: 'Entry and userId are required.' });
  }
  await saveJournalEntry(userId, entry);
  res.json({ success: true });
});

app.get('/api/journal/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }
  const entries = await getJournalEntries(userId, 10);
  res.json({ entries });
});
// Health check
app.get('/', (req, res) => {
  res.send('Askly Therapy Chatbot Backend is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
