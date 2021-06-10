import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyD0MOHEgm1iEe7aHeiwKzKYVCq3Mu3S4bg",
  authDomain: "dispositivos-moveis-n2.firebaseapp.com",
  projectId: "dispositivos-moveis-n2",
  storageBucket: "dispositivos-moveis-n2.appspot.com",
  messagingSenderId: "394351784793",
  appId: "1:394351784793:web:e4f57ad795319080f75248",
  measurementId: "G-VFM1H95Y4J"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore()

export default {
  firebase,
  db
}