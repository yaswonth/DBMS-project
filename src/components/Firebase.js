import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "",
  authDomain: "shyam-4ff74.firebaseapp.com",
  databaseURL: "https://shyam-4ff74.firebaseio.com",
  projectId: "shyam-4ff74",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;
