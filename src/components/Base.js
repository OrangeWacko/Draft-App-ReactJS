import Rebase from 're-base';
import firebase from 'firebase';

/* Initialize Firebase */
const config = {
    apiKey: apikey.process.env.development.local.REACT_APP_API_KEY,
    authDomain: apikey.process.env.development.local.REACT_APP_DOMAIN,
    databaseURL: apikey.process.env.development.local.REACT_APP_DB_URL,
    projectId: apikey.process.env.development.local.REACT_APP_PROJECT_ID,
    storageBucket: apikey.process.env.development.local.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: apikey.process.env.development.local.REACT_APP_MESSAGE_SENDER_ID,
    appId: apikey.process.env.development.local.REACT_APP_ID
};
const app = firebase.initializeApp(config)
const Base = Rebase.createClass(app.database())
export { Base }
