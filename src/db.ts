import admin from "firebase-admin";

let db: admin.firestore.Firestore;

export const getDb = () => {
  if (!db) {
    // Initialize Firebase Admin SDK
    if (!admin.apps.length) {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // If GOOGLE_APPLICATION_CREDENTIALS is set, admin SDK will auto-load it
        admin.initializeApp();
      } else {
        // Otherwise, use SERVICE_ACCOUNT_JSON
        const serviceAccountJson = process.env.SERVICE_ACCOUNT_JSON;
        if (!serviceAccountJson) {
          throw new Error(
            "SERVICE_ACCOUNT_JSON environment variable is not set"
          );
        }
        const serviceAccount = JSON.parse(serviceAccountJson);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      }
    }
    db = admin.firestore();
  }
  return db;
};
