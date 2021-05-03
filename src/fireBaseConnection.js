import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'

 
var firebaseConfig = {
    apiKey: "AIzaSyAbyoXwb55VmkeYZGLqI-8KqN3aHvD1Gd0",
    authDomain: "site-imgd-react-d279f.firebaseapp.com",
    projectId: "site-imgd-react-d279f",
    storageBucket: "site-imgd-react-d279f.appspot.com",
    messagingSenderId: "872564974356",
    appId: "1:872564974356:web:c623219591d2f154715801",
    measurementId: "G-4G1EBQSZRB"
};
// Initialize Firebase
if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);


export default firebase;