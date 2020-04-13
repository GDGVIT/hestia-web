import * as firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => { firebase.initializeApp({
    messagingSenderId: "465731117411",
    apiKey: "AIzaSyAgFUv_wlxwmPrJYPI-G1B3MG2EEd1lMfE",
    authDomain: "akina-notifs.firebaseapp.com",
    databaseURL: "https://akina-notifs.firebaseio.com",
    projectId: "akina-notifs",
    storageBucket: "akina-notifs.appspot.com",
    appId: "1:465731117411:web:9ba86105c189317daab356",
    measurementId: "G-9V2RVD5VSP"
  });

  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BBlwmNPEo6A3oQu-YS2nuZdVfsf2KyCP4OAhk7z32Ut98J9glaNMjzw4Z_8CrJc5QvIyNXsR8LTAT_nE-kIvGGo"
  );
  // const messaging = firebase.messaging();
  messaging.onMessage(function(payload){
  console.log('OnMessage :', payload)
})
}

// export { messaging };


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
  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  const messaging = firebase.messaging();
  messaging.onMessage(function(payload){
  console.log('OnMessage :', payload)
})
}

