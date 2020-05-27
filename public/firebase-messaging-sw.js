// service-worker側でfirebase messagingを利用できるように設定する
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js')

firebase.initializeApp({
  'messagingSenderId': process.env.VUE_APP_MESSAGING_SENDER_ID
})

const messaging = firebase.messaging()

// ユーザーがweb pageにいない場合のみ、setBackgroundMessageHandlerメソッドが発火する
// service worker側で受け取ったmessageを加工などの処理もできる
messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(notificationTitle,
    notificationOptions)
})
