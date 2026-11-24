import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseConfig = ["apiKey", "authDomain", "projectId", "appId"] as const;
const missingFirebaseConfig = requiredFirebaseConfig.filter((key) => !firebaseConfig[key]);

if (missingFirebaseConfig.length > 0) {
  throw new Error(
    `Firebase configuration is missing: ${missingFirebaseConfig.join(", ")}. ` +
      "Set the NEXT_PUBLIC_FIREBASE_* variables and redeploy the frontend."
  );
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
