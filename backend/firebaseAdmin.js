// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Path to your Firebase service account key JSON file
const keyPath = path.join(__dirname, 'serviceAccountKey.json');
let serviceAccount = null;
try {
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Firebase service account key file not found at: ${keyPath}\nPlease download it from Firebase Console > Project Settings > Service Accounts.`);
  }
  serviceAccount = require(keyPath);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
