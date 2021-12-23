import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDGuUZAybJaepXS3BOi7AYsQJDL7hAxvdw",
  authDomain: "instagram-react-native-8ea4b.firebaseapp.com",
  projectId: "instagram-react-native-8ea4b",
  storageBucket: "instagram-react-native-8ea4b.appspot.com",
  messagingSenderId: "415766576906",
  appId: "1:415766576906:web:787392b24f2475ce5244f3"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore()
export { firebase, db };