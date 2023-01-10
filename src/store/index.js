import { defineStore, getActivePinia } from "pinia";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import firebase from "@/firebase";

const auth = getAuth(firebase);
const db = getFirestore(firebase);
const provider = new GoogleAuthProvider();

const mainStore = defineStore("main", {
  state: () => ({
    authUser: {},
    chatrooms: [],
    chats: [],
  }),
  getters: {
    authenticated: (state) => !!state.authUser.uid,
  },
  actions: {
    checkUser() {
      onAuthStateChanged(auth, (userCredential) => {
        if (userCredential) {
          this.authUser = auth.currentUser;
        }
      });
    },
    googleSignIn() {
      return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            this.authUser = result.user;
            console.log(this.authUser, result.user)
            resolve(result.user);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error.message, error.customData)
            reject(error);
          });
      });
    },
    signIn(payload) {
      return new Promise((resolve, reject) => {
        const { email, password } = payload;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("CU", auth.currentUser, userCredential);
            this.authUser = auth.currentUser;
            resolve(this.authUser);
          })
          .catch((error) => {
            console.log(error, error.status, error.message);
            reject(error);
          });
      });
    },
    signUp(payload) {
      return new Promise((resolve, reject) => {
        const { email, password } = payload;
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            this.authUser = auth.currentUser;
            this.updateUser(payload);
            resolve(this.authUser);
          })
          .catch((error) => {
            console.log(error, error.status, error.message);
            reject(error);
          });
      });
    },
    updateUserProfile(payload) {
      return new Promise((resolve, reject) => {
        updateProfile(auth.currentUser, payload).then(() => {
          console.log("Profile updated");
          resolve(auth.authUser);
        });
      }).catch((error) => reject(error));
    },
    signUserOut() {
      return new Promise((resolve, reject) => {
        signOut(auth)
          .then(() => {
            this.authUser = {};
            resolve();
          })
          .catch((error) => reject(error));
      });
    },

    createRoom(payload) {},
    createMessage(payload) {},
    getChatrooms() {
      const colRef = collection(db, `chatrooms`);
      const q = query(colRef);
      onSnapshot(q, (querySnapshot) => {
        this.chatrooms = [];
        querySnapshot.forEach((doc) => {
          this.chatrooms.push({
            id: doc.id,
          });
        });
      });
    },
    getChats(room) {
      const colRef = collection(db, `chatrooms/${room}/chats`);
      const q = query(colRef, orderBy("time", "desc"));
      onSnapshot(q, (querySnapshot) => {
        this.chats = [];
        querySnapshot.forEach((doc) => {
          this.chats.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    },
    resetState() {
      const states = Object.keys(getActivePinia()?.state.value);
      states.map((state) => getActivePinia()._s.get(state).$reset());
      // this.logout();
    },
  },
  persist: true,
});

export { mainStore };
