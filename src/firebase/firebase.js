import { ref, set, getDatabase, get, child, update, onValue } from "firebase/database";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
//import { doc, getFirestore,getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtd2FISa19lYXLikuxn8rI1sAv83R77zs",
    authDomain: "chat-app-4e9aa.firebaseapp.com",
    projectId: "chat-app-4e9aa",
    storageBucket: "chat-app-4e9aa.appspot.com",
    messagingSenderId: "426512762820",
    appId: "1:426512762820:web:3b74f5985229eed8b7c691",
    databaseURL: "https://chat-app-4e9aa-default-rtdb.firebaseio.com",
};


//const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
//const db = firebase.database();

const auth = getAuth()

const provider = new GoogleAuthProvider();

export const signupUser = async ({ name, username, email, password, photoURL }) => {

    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>
            userCredentials.user
        )
        .catch(err => console.log(err))

    if (!user) return


    await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
    })

    await addUserData(user.uid, username, name, email, photoURL)

    return {
        id: user.uid,
        username: username,
        name: user.name,
        photoURL: user.photoURL,
        email: user.email,
        contacts: user.contacts
    }
}

export const getAllUsers = async (getUsers) => {

    let data;
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


    getUsers(data)
}

const addUserData = async (userId, username, name, email, imageUrl) => {
    const db = getDatabase()

    await set(ref(db, `users/${userId}`), {
        id: userId,
        name: name,
        username: username,
        email: email,
        photo: imageUrl,
        contacts: null
    })
}

export const addMessage = async ({ id, message, receiverId, senderId }) => {

    const db = getDatabase();

    await set(ref(db, `messages/${id}`), {
        id,
        senderId,
        receiverId,
        message
    })

    await set(ref(db, `users/${senderId}/messages/${receiverId}/${id}`), true)
}
export const getMessage = async (senderId, receiverId ) => {
    const db = getDatabase();

    const messageRef = ref(db, `users/${senderId}/messages/${receiverId}`);
    onValue(messageRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}

export const addContacts = async (currentUserId, contactId) => {
    const db = getDatabase();

    const updates = {}
    updates[`users/${currentUserId}/contacts/${contactId}`] = true
    await update(ref(db), updates)
}

export const signinUser = async ({ email, password }) => {


    const user = await signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>
            userCredentials.user
        )
        .catch(err => console.log(err))

    console.log(user)
    if (!user) return


    const userData = await getUser(user.uid);

    return userData
}

const getUser = async userId => {
    const dbRef = ref(getDatabase());

    let data;
    await get(child(dbRef, `users/${userId}`)).then(snapshot => {
        if (snapshot.exists()) {
            data = snapshot.val();

        }
    }).catch(err => console.log(err))

    if (data.contacts)
        data.contacts = await getContacts(Object.keys(data.contacts))

    return data;
}
const getContacts = async ids => {
    let data = ids?.map(async id => {
        const dbRef = ref(getDatabase());

        const snapshot = await get(child(dbRef, `users/${id}`))
        if (snapshot.exists()) return snapshot.val();

    })
    console.log(data);

    data = await Promise.all(data).then(val => val)
    return data
}


export const signInWithGoogle = async () => {

    const user = await signInWithPopup(auth, provider)
        .then((result) => result.user)
        .catch((error) => {
            console.log(error)
        });

    if (!user) return

    const contacts = await getData(user.uid);


    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user?.photoURL,
        contacts: contacts
    }
}

export const signOutUser = () => {

    if (auth.currentUser) {
        auth.signOut();
    }
}

export const getData = async (uid) => {
    /*
    console.log(uid)
    try{
        
        const docRef = doc(db, "users",`${uid}`);
        const docSnap = await getDoc(docRef);

        console.log(docSnap.exists())

        return docSnap.data().contacts
    }catch(e){
        console.log(e)
    }
    */
}


export const addData = async () => {

    // Initialize Cloud Firestore and get a reference to the service

    // console.log(db)


    try {
        /*
      const docRef = await setDoc(doc(db, "users",auth.currentUser?.uid), {
        contacts:['gv7pYgWgXvOJ4cfWcIOfhGTWBgs1','FtPk1KssGbQ5ijG0EAKYwrekG7z1']
        
      });*/
        //console.log("Document written with ID: ", docRef);

        //  get data
        /*
        const q = query(collection(db, 'users'))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        */
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

