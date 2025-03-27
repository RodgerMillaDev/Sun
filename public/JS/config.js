// const firebaseConfig = {
//     apiKey: "AIzaSyDUhptGJ-Pd84c-3GbWu7T0MNepnrcxL9k",
//     authDomain: "sunup-collections.firebaseapp.com",
//     projectId: "sunup-collections",
//     storageBucket: "sunup-collections.firebasestorage.app",
//     messagingSenderId: "399115570158",
//     appId: "1:399115570158:web:8073025b8598d5ab879cff",
//     measurementId: "G-BEV2JV12SC"
//   };


//   firebase.initializeApp(firebaseConfig)



// Initialize Firebase and store it globally
window.firebaseConfig = {
  apiKey: "AIzaSyDUhptGJ-Pd84c-3GbWu7T0MNepnrcxL9k",
  authDomain: "sunup-collections.firebaseapp.com",
  projectId: "sunup-collections",
  storageBucket: "sunup-collections.firebasestorage.app",
  messagingSenderId: "399115570158",
  appId: "1:399115570158:web:8073025b8598d5ab879cff",
  measurementId: "G-BEV2JV12SC"
};

// Initialize Firebase only once
if (!window.firebaseApp) {
  window.firebaseApp = firebase.initializeApp(window.firebaseConfig);
}

// Global references for Firestore & Auth
window.dbFirestore = firebase.firestore();
window.auth = firebase.auth();
