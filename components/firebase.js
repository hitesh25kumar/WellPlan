import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBxBcaBtqMbThBmX_LTbYXQogwKzNreM84",
    authDomain: "myplanningweb.firebaseapp.com",
    databaseURL: "https://myplanningweb.firebaseio.com",
    projectId: "myplanningweb",
    storageBucket: "myplanningweb.appspot.com",
    messagingSenderId: "208696639959",
    appId: "1:208696639959:web:67a2938280311154e8cb92"
  };
export const firebaseApp = firebase.initializeApp(firebaseConfig);