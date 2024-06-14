import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBzhAfALvH4VS1_cMIV1E8bKh26AY9t6GM",
    authDomain: "auth-44912.firebaseapp.com",
    projectId: "auth-44912",
    storageBucket: "auth-44912.appspot.com",
    messagingSenderId: "237958181335",
    appId: "1:237958181335:web:5fb58e213dc36aec105b92"
  };
  export const FIREBASE_APP=initializeApp(firebaseConfig)
  export const FIREBASE_AUTH=getAuth(FIREBASE_APP)