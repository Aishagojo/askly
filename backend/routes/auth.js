const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');

// Example: Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
