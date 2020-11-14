import firebase from 'firebase/app'
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBTHKiugJ78PVxaxSIWC38xFtBrquS0sVY",
    authDomain: "drive-chart-df487.firebaseapp.com",
    databaseURL: "https://drive-chart-df487.firebaseio.com",
    projectId: "drive-chart-df487",
    storageBucket: "drive-chart-df487.appspot.com",
    messagingSenderId: "678582206392",
    appId: "1:678582206392:web:c138e67f2c1f3a07ea994d",
    measurementId: "G-13584P8W4L"
};

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export default app