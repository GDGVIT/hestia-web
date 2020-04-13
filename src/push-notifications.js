import * as firebase from 'firebase/app';
import 'firebase/messaging';

export const initializeFirebase = () => { firebase.initializeApp({
  apiKey: "AIzaSyD_7Jeq5rg6eFmEPvOgeMdrOvJ_GQY8qUE",
  authDomain: "akina-6b5c9.firebaseapp.com",
  databaseURL: "https://akina-6b5c9.firebaseio.com",
  projectId: "akina-6b5c9",
  storageBucket: "akina-6b5c9.appspot.com",
  messagingSenderId: "258042889226",
  appId: "1:258042889226:web:05e81fe909946336584bf3",
  measurementId: "G-XJP07W8KRT"
  });

  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BND5DyoQuJz2lScg0BbW1SIOKO4LnPL4t85arUKPoUhFByQkmVj2CcPCsLx3cmQEm4ONzxATvyBrzyhTRHyQH6I"
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
   localStorage.setItem("registration_id", "258042889226");
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

