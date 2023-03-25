import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC72POxAl4fLOv69Wu23qyhf8RL9YePJoE",
  authDomain: "test-react-native-2023.firebaseapp.com",
  projectId: "test-react-native-2023",
  storageBucket: "test-react-native-2023.appspot.com",
  messagingSenderId: "669447927264",
  appId: "1:669447927264:web:d67dd4022f9486ed57a785"
  };
//   // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

  export default firebase.initializeApp(firebaseConfig);