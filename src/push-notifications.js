import * as firebase from 'firebase';

export const initializeFirebase = () => {
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
}
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token:', token);
   localStorage.setItem("notif-token",token)
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

