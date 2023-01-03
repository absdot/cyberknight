import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDELGCN4OdR2Dnbh5lL-H9huTciOKZAsqE",
    authDomain: "cyberknight-1035b.firebaseapp.com",
    projectId: "cyberknight-1035b",
    storageBucket: "cyberknight-1035b.appspot.com",
    messagingSenderId: "1085317798196",
    appId: "1:1085317798196:web:65da3db88b2831c686ad61",
    measurementId: "G-1SFE1PX0DC"
  };

// Initialize Firebase
// initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export default app;
