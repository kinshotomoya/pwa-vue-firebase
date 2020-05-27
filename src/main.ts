import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'vue-pwa-sample-13d03.firebaseapp.com',
  databaseURL: 'https://vue-pwa-sample-13d03.firebaseio.com',
  projectId: 'vue-pwa-sample-13d03',
  storageBucket: 'vue-pwa-sample-13d03.appspot.com',
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: '1:1073972820603:web:1bf43d409911f468bd40de'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_WEB_PUSH_KEY)

messaging.requestPermission().then(() => {
  console.log('Notification permission granted.')

  // トークン取得
  // このtokenがfirebaseからmessageを送る際に、どのサーバーに送るのか目印になる
  messaging.getToken().then((token) => {
    console.log(token)
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err)
})

// ユーザーがweb pageを開いていたら、このonMessage()にメッセージが飛んでくる
// アプリがフォアグラウンドにある（ユーザーがウェブアプリを現在閲覧している）場合は、そのページでデータと通知ペイロードを直接受信できます。
messaging.onMessage((payload) => {
  console.log('Message received. ', payload)
})
