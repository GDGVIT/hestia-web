import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import Dapp from './desktop/Dapp'
import * as serviceWorker from './serviceWorker';
import { initializeFirebase, askForPermissioToReceiveNotifications } from './push-notifications';
import * as firebase from 'firebase'

const options = {
  // you can also just use 'bot,tom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '90px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
const deviceCheck=()=>{
    if( isMobile.any() ){
      return (<App />);
    }else{
      return (<Dapp />);

    }
};

ReactDOM.render(
  <BrowserRouter>
  <AlertProvider template={AlertTemplate} {...options}>
  {deviceCheck()}
  </AlertProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
initializeFirebase();
// serviceWorker();

if(!localStorage.getItem("notif-token")){
  askForPermissioToReceiveNotifications();
}
const messaging = firebase.messaging();
messaging.onMessage(function(payload){
  console.log('OnMessage :', payload)
})
// const messaging = firebase.messaging();
// messaging.requestPermission()
// .then(function() {
//   console.log('permitted')

//   return messaging.getToken();
// })
// .then(function(token){
//   console.log(token)
//   localStorage.setItem("notif-token",token)
// })
// .catch(function(err){
//   console.log(err)
// })
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
