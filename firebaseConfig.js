const firebaseConfig = {
  apiKey: "AIzaSyD7sAr_KDy1ek6xa_-moboyCnPgq44HOCY",
  authDomain: "reactapp1122.firebaseapp.com",
  databaseURL: "https://reactapp1122.firebaseio.com",
  projectId: "reactapp1122",
  storageBucket: "reactapp1122.appspot.com",
  messagingSenderId: "707202388277",
  appId: "1:707202388277:web:17516996ce4c8aec"
};

firebase.initializeApp(firebaseConfig);

// initializes a global _db variable
const _db = firebase.database().ref().child('mobileSite');
const _storage = firebase.storage().ref().child('mobileSite');