// journalService.js
// Service to interact with Firebase Firestore for user journals

const admin = require('../firebaseAdmin');
const db = admin.firestore();

async function saveJournalEntry(userId, entry) {
  const journalRef = db.collection('journals').doc(userId);
  await journalRef.set({
    entries: admin.firestore.FieldValue.arrayUnion({
      entry,
      timestamp: new Date().toISOString(),
    })
  }, { merge: true });
}

async function getJournalEntries(userId, limit = 10) {
  const journalRef = db.collection('journals').doc(userId);
  const doc = await journalRef.get();
  if (!doc.exists) return [];
  const entries = doc.data().entries || [];
  return entries.slice(-limit);
}

module.exports = { saveJournalEntry, getJournalEntries };
