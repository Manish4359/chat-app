import { initializeApp } from "firebase/app";


import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getFirestore,getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtd2FISa19lYXLikuxn8rI1sAv83R77zs",
    authDomain: "chat-app-4e9aa.firebaseapp.com",
    projectId: "chat-app-4e9aa",
    storageBucket: "chat-app-4e9aa.appspot.com",
    messagingSenderId: "426512762820",
    appId: "1:426512762820:web:3b74f5985229eed8b7c691"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const auth = getAuth()

const provider = new GoogleAuthProvider();

export const signupUser = async ({ name, email, password, photoURL }) => {

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


    const contacts=await getData(user.uid);

    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        contacts
    }
}





export const signInWithGoogle = async () => {

    const user = await signInWithPopup(auth, provider)
        .then((result) => result.user)
        .catch((error) => {
            console.log(error)
        });

    if (!user) return

    const contacts=await getData(user.uid);


    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user?.photoURL,
        contacts:contacts
    }
}

export const signOutUser = () => {

    if (auth.currentUser) {
        auth.signOut(); 
    }
}

export const getData = async (uid) => {
    
    console.log(uid)
    try{
        
        const docRef = doc(db, "users",`${uid}`);
        const docSnap = await getDoc(docRef);

        console.log(docSnap.exists())

        return docSnap.data().contacts
    }catch(e){
        console.log(e)
    }
}


export const addData = async () => {

    // Initialize Cloud Firestore and get a reference to the service

    console.log(db)


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

