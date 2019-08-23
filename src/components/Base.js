import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';

/* Initialize Firebase */
console.log(process.env.REACT_APP_DATABASE_URL);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_ID
};
const app = firebase.initializeApp(firebaseConfig)
const Base = Rebase.createClass(app.database())
console.log(app);
export { Base }
