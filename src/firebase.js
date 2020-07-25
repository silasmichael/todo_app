import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBFHGEbs3m9rg06bKxUo9pqif7P-BfooLo",
    authDomain: "to-app-cp-1101c.firebaseapp.com",
    databaseURL: "https://to-app-cp-1101c.firebaseio.com",
    projectId: "to-app-cp-1101c",
    storageBucket: "to-app-cp-1101c.appspot.com",
    messagingSenderId: "1070286197376",
    appId: "1:1070286197376:web:0d8343de71e9d89b3a8c65",
    measurementId: "G-FTQJRQ7JBJ"
})

const db = firebaseApp.firestore();

export default db;