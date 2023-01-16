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
  setDoc,
  addDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  FieldValue,
} from "firebase/firestore";

import firebase from "@/firebase";

const auth = getAuth(firebase);
const db = getFirestore(firebase);
const provider = new GoogleAuthProvider();
const firebaseMessages = "messages"

const mainStore = defineStore("main", {
  state: () => ({
    authUser: {},
    activeUser: {},
    users: [],
    chatrooms: [],
    messages: [],
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
            // create user record
            this.createUser(result.user);

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
            console.log(error.message, error.customData);
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
            // create user record
            this.createUser(auth.currentUser);
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
    async createUser(user) {
      const docData = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        phoneNumber: user.phoneNumber,
        createdAt: new Date(),
      };
      await setDoc(doc(db, "users", user.uid), docData);
    },
    getUsers() {
      const colRef = collection(db, `users`);
      const q = query(colRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        this.users = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .reverse();
      });
    },
    async createRoom(room) {
      await setDoc(doc(db, "chatrooms", room), docData);
    },
    async createMessage1(payload) {
      const docId = [this.authUser.uid, payload.uid].sort();
      const docData = {
        uid: this.authUser.uid,
        displayName: this.authUser.displayName,
        photoURL: this.authUser.photoURL,
        text,
        // createdAt: new Date(),
        createdAt: dayjs().toDate(),
      };
      await addDoc(collection(db, firebaseMessages, ), docData);
    },
    async createMessage(text) {
      const docData = {
        uid: this.authUser.uid,
        displayName: this.authUser.displayName,
        photoURL: this.authUser.photoURL,
        text,
        // createdAt: new Date(),
        createdAt: dayjs().toDate(),
      };
      await addDoc(collection(db, firebaseMessages), docData);
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
    getMessages() {
      // const colRef = collection(db, `chatrooms/${room}/messages`);
      const colRef = collection(db, firebaseMessages);
      const q = query(colRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        console.log('querySnapshot', querySnapshot.docs);
        this.messages = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .reverse();
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
