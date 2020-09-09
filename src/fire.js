import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E",
  authDomain: "movies-27cd5.firebaseapp.com",
  databaseURL: "https://movies-27cd5.firebaseio.com",
  projectId: "movies-27cd5",
  storageBucket: "movies-27cd5.appspot.com",
  messagingSenderId: "931598252128",
  appId: "1:931598252128:web:fd1393ae30bdae3d26eb05",
  measurementId: "G-212W78LS28"
};

firebase.initializeApp(firebaseConfig);
export const providerG = new firebase.auth.GoogleAuthProvider();
export const providerT = new firebase.auth.TwitterAuthProvider();
export const providerF = new firebase.auth.FacebookAuthProvider();
const storage = firebase.storage();
export { storage, firebase as default };