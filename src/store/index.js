import { defineStore, getActivePinia } from "pinia";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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

const mainStore = defineStore("main", {
  state: () => ({
    authUser: {},
    chatrooms: [],
    chats: [],
  }),
  getters: {},
  actions: {
    login: () => {
      onAuthStateChanged(auth, (user) => {
        // Check for user status
        console.log(user);
        // if (user) {
        //   // User is logged in
        //   // Get the chatrooms
        //   getDocs(db, "chatrooms")
        //    .get()
        //    .then(snapshot => {
        //       const chatrooms = snapshot.docs.map(doc => {})
        //    })
        //   }
      });
      // return new Promise((resolve, reject) => {
      //   firebase
      //    .auth();
      // });
    },
    checkUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.authUser = user;
        }
      });
    },
    signIn() {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => (this.authUser = user))
        .catch((error) => console.log(error));
    },
    signUp(email, password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => (this.authUser = user))
        .catch((error) => console.log(error));
    },
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
