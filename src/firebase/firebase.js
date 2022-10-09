import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBtd2FISa19lYXLikuxn8rI1sAv83R77zs",
    authDomain: "chat-app-4e9aa.firebaseapp.com",
    projectId: "chat-app-4e9aa",
    storageBucket: "chat-app-4e9aa.appspot.com",
    messagingSenderId: "426512762820",
    appId: "1:426512762820:web:3b74f5985229eed8b7c691"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth()
export const signupUser = async ({ name, email, password, photoURL }) => {



    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>
            userCredentials.user
        )
        .catch(err => console.log(err))


    await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
    })


    return {
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email
    }
}

export const signinUser = async ({ email, password }) => {


    const user = await signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>

            userCredentials.user
        )
        .catch(err => console.log(err))

    console.log(user)
    if (!user) return

    return {
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email
    }
}

