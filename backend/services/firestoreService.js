// firestoreService.js
// Service to interact with Firebase Firestore for chat history

const admin = require('../firebaseAdmin');
const db = admin.firestore();

async function saveMessage(userId, message, sender) {
  const chatRef = db.collection('chats').doc(userId);
  await chatRef.set({
    history: admin.firestore.FieldValue.arrayUnion({
      sender,
      message,
      timestamp: new Date().toISOString(),
    })
  }, { merge: true });
}

async function getRecentMessages(userId, limit = 5) {
  const chatRef = db.collection('chats').doc(userId);
  const doc = await chatRef.get();
  if (!doc.exists) return [];
  const history = doc.data().history || [];
  return history.slice(-limit);
}

module.exports = { saveMessage, getRecentMessages };
