import Rebase from 're-base';
import * as firebase from 'firebase/app';
import database from 'firebase/database';

/* Initialize Firebase */
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL:"https://fantasy-draft-app-reactjs-v2.firebaseio.com",
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
};
const app = firebase.initializeApp(firebaseConfig);
const Base = Rebase.createClass(app.database());
export { Base }
