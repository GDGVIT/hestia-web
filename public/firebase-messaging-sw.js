importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/init.js');


firebase.initializeApp({
    messagingSenderId: "465731117411",
    // apiKey: "",
    authDomain: "akina-notifs.firebaseapp.com",
    databaseURL: "https://akina-notifs.firebaseio.com",
    projectId: "akina-notifs",
    storageBucket: "akina-notifs.appspot.com",
    appId: "1:465731117411:web:9ba86105c189317daab356",
    measurementId: "G-9V2RVD5VSP"
});
const messaging = firebase.messaging();
