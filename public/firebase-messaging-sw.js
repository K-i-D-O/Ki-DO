//FCM 푸시알림 서비스워커 
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDu99rnAd7Uxki-XY73SDOi_fzldXNapFs',
  authDomain: 'kido-fa909.firebaseapp.com',
  projectId: 'kido-fa909',
  storageBucket: 'kido-fa909.appspot.com',
  messagingSenderId: '943123957599',
  appId: '1:943123957599:web:222646f10a5d53e0ef98ea',
  measurementId: 'G-Y8S3SLT043',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    data: { url: payload.data.url }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    console.log('[firebase-messaging-sw.js] Notification click Received.');
  
    event.notification.close();
  
    // Handle the notification click
    if (event.notification.data && event.notification.data.url) {
      clients.openWindow(event.notification.data.url);
    } else {
      clients.openWindow('/');
    }
  });
