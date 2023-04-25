importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');
firebase.initializeApp({
  messagingSenderId:
    'BMxdP7lpXeC2-GTMXxuIPwiUtaANed4b7LBHpnwl7Q6cO38crez60rKtev6c3ln4wcqPKrOUE8e8eWkm19qRnLY'
});
const messaging = firebase.messaging();
