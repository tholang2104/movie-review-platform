const admin = require('firebase-admin');

let db = null;

try {
  // Try to load service account key from file
  let serviceAccount;
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (fileError) {
    // If file doesn't exist, try environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } else {
      throw new Error('Service account key not found in file or environment variables');
    }
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://movie-review-platform-55a65.firebaseio.com'
  });

  db = admin.firestore();
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.warn('⚠️ Firebase initialization failed:', error.message);
  console.warn('⚠️ Running without Firebase. Database functionality will not work.');
  db = null;
}

module.exports = { admin, db };
