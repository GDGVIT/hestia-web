importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
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

messaging.setBackgroundMessageHandler(function(payload) {
  // const title = 'Hello world!';
  // const options = {
  //   body : payload.data.status
  // }
  // return self.registration.showNotification(title,options);
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
    console.log('notification click');
});
