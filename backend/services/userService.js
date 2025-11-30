const admin = require('../firebaseAdmin');

exports.getUserById = async (uid) => {
  return admin.auth().getUser(uid);
};

// Add more user-related service logic as needed
