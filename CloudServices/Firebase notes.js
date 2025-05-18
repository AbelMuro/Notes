/* 
        Firebase is a cloud service that provides back-end features as a service

        npm install firebase
*/





//=================================================== Initialize Firebase ===================================================
/* 
        You can initialize firebase by calliing the initializeApp functions
*/

import { initializeApp } from "firebase/app";               
import { getDatabase} from 'firebase/database';           
import { getAuth} from 'firebase/auth';
import { getStorage} from 'firebase/storage';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {                                    
    apiKey: "",                      //the 'key' that your app needs to access the firebase console
    authDomain: "",                 //the domain for the authentication that your app can use for signing in and logging out
    projectId: "",                   //identifies the project that this app will be using
    storageBucket: "",
    messagingSenderId: "",          //the ID that is used for enabling messaging in your app
    appId: "",                     //the ID that is used for identifying the app in the project. Projects can have multiple apps             
    measurementId: "",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication and exporting it
export const auth = getAuth(app);                                           //alot of the times, to use firebase, you will need to export these objects

// Initialize storage and exporting it
export const storage = getStorage(app, 'gs://link-sharing-app-f1fdc.appspot.com/');  //you must include the 'bucket' name for the storage you are trying to access

// Initialize firestore database and exporting it
export const db = getFirestore(app);











//=================================================== REALTIME DATABASE ===================================================
/*
    Realtime database is a NoSQL database that allows you to store data in real time.
    This realtime database is usefull for apps that require live updates. 

    This database organizes all of its data as a large JSON structure tree.

                {
                  "users": {
                    "userId_123": {
                      "name": "Alice",
                      "email": "alice@example.com",
                      "profilePicture": "https://example.com/alice.jpg",
                      }
                    }
                   },
                  "posts": {
                    "postId_456": {
                      "userId": "userId_123",
                      "content": "Hello world!",
                      "timestamp": 1715628961,
                      "likesCount": 2
                    }
                  }
                }
*/




//------------------------- Initializing realtime database
/* 
    You can initialize realtime database with the getDatabase() getter function
*/
import { initializeApp } from "firebase/app";     
import { getDatabase} from 'firebase/database';   


const firebaseConfig = {                                    
    databaseURL: "",                         //the url of the database for this project
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);





//------------------------- Storing nodes in database
/* 
        To store new data in the realtime database, you can use 
        the set() method to do just that. The first argument to set()
        accepts the reference to the DB or the returned value of the push()
        function.

        The push() method can be used to generate a unique ID for 
        a new document.
*/
import {ref, set, push} from 'firebase/database';
import {db} from './Firebase/Config.js';


async function createNewNode(newData){
    const referenceToDB = ref(db, 'users/user1');
    const newNodeWithUniqueID = push(referenceToDB);           
    
    await set(newNodeWithUniqueID, {
        name: newData.name,
        age: newData.age,
        birthday: newData.birthday
    });

    console.log('Data has been stored')
}
     



//------------------------- Updating nodes in database
/* 
    You can use the update() method to update an existing node in 
    the realtime database.
*/

import { ref, update } from "firebase/database";
import {db} from './Firebase/config.js'


async function UpdateNode() {
    const userRef = ref(db, 'users/user1');

    await update(userRef, {
      age: 25,
      city: "San Francisco"
    })

    console.log('Data updated in database')
}    




//------------------------- Getting a node from database
/*
    You can get a specific node from the database by 
    using the get() method
*/

import {ref, get } from "firebase/database";

async function getNode() {
     const usersRef = ref(db, "users/user1");
    
    const snapshot = await get(usersRef);
    
    if(snapshot.exists())
        snapshot.val();
}




//------------------------- Getting all nodes from database
/* 
        You can use the onValue() method to get all nodes
        in a specific property of the JSON structure tree
*/

import { ref, get } from "firebase/database";
import {db} from './Firebase/Config.js';


async function getAllNodes() {
    const userRef = ref(db, "users");
    
    const snapshot = await get(userRef);
        
    if(snapshot.exists())    
        snapshot.val();                //this should be an array of objects
}


     










//=================================================== AUTHENTICATION ===================================================
/* 
        You can implement authentication with firebase with different providers
*/




//------------------------- Register with email and password
/* 
        You can register an account with createUserWithEmailAndPassword()
        The method returns the following object


        userCredentials = {
                uid: Unique user ID
                email: Email of the user
                displayName: User's display name (if set)
                photoURL: Profile picture URL (if set)
                phoneNumber: User's phone number (if verified)
                providerId: The authentication provider (e.g., password, google.com)
                emailVerified
        }
        
*/

import { createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebase-config';

async function Register(email, password) {
  try{                                                                                              //keep in mind that createUserWithEmailAndPassword will automatically log you in
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);        //this will create a user and return an object with the user credentials
  }
  catch(error){
       console.log(error.message);
  }
}




//------------------------- Login with Email and password
/* 
        You can login with the method signInWithEmailAndPassword().
        The method returns the following object

        userCredentials = {
                uid: Unique user ID
                email: Email of the user
                displayName: User's display name (if set)
                photoURL: Profile picture URL (if set)
                phoneNumber: User's phone number (if verified)
                providerId: The authentication provider (e.g., password, google.com)
                emailVerified: Boolean
        }
*/

import { signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebase-config';


async function login(email, password) {
  try{
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);                //this will sign the user in if their email is already registered                                    
  }
  catch(error) {
        console.log(error.message) 
  }
}





//------------------------- Updating account information
/* 
        You can update your account information by using the updateProfile() method.
        You can pass an object as an argument that has the following properties with 
        updated values
        
        userCredentials = {
                uid: Unique user ID
                email: Email of the user
                displayName: User's display name (if set)
                photoURL: Profile picture URL (if set)
                phoneNumber: User's phone number (if verified)
                providerId: The authentication provider (e.g., password, google.com)
                emailVerified: Boolean
        } 
*/


import {auth} from './firebase-config';
import {updateProfile} from 'firebase/auth';

async function updateAccount() {
  try{                                                                                              //keep in mind that createUserWithEmailAndPassword will automatically log you in
        await updateProfile(auth.currentUser, {                                                           //you can use updateProfile to update any data about the user on the spot
            displayName: "new username"
        });                             
        console.log('acccount updated successfully');
  }
  catch(error){
       console.log(error.message);
  }
}







//------------------------- Login with Email link
/* 
        You can also register an account through an email link.
        The sendSignInLinkToEmail() will send a link to the users
        email and the user must click on the link to register

        You can also use thhe isSignInWithEmailLink() method
        to check if the current URL is a valid link that can be used 
        to sign in.
*/

import {auth} from './firebase-config';
import { sendSignInLinkToEmail} from 'firebase/auth';

async function registerWithEmailLink(email) {
    try{
        const actionCodeSettings = {
                url: 'The URL to which the user will be redirected after clicking the sign-in link. This should be a page in your application that handles email link sign-in.',
                handleCodeInApp: 'If true, the sign-in link is meant to be handled in the app instead of the default web flow.',
                iOS: {
                    bundleId: 'The iOS app’s bundle ID that should handle the sign-in.',    
                },
                android: {
                        packageName: 'The Android app’s package name.',
                        installApp: 'If true, the app should be installed if not already.',
                        minimumVersion: 'Specifies the minimum app version required to handle the sign-in.',
                },
                dynamicLinkDomain: 'Custom domain for Firebase Dynamic Links if used.'
        }

        if(!isSignInWithEmailLink(auth, window.location.href)) return
            
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)                    //this will send an email link that the user can use to login
    }
   catch(error){
       console.log(error.message)
   }  
}








//------------------------- Login with Google
/* 
        You can login with google by using the GoogleAuthProvider()
        method and the signInWithPopup() method. The signInWithPopup() will
        return the following object

        userCredentials = {
                uid: Unique user ID
                email: Email of the user
                displayName: User's display name (if set)
                photoURL: Profile picture URL (if set)
                phoneNumber: User's phone number (if verified)
                providerId: The authentication provider (e.g., password, google.com)
                emailVerified: Boolean
        }         
*/

async function LoginWithGoogle() {
    try{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            "login_hint": "user@example.com"
        });
        const userCredentials = await signInWithPopup(auth, provider)    
    }
    catch(error){
        console.log(error);
    }
}






//-------------------------































import { createUserWithEmailAndPassword, updateProfile, signOut, sendEmailVerification, sendSignInLinkToEmail, deleteUser} from 'firebase/auth';
import { GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from './firebase-config';








async function createUser(email, password) {
  try{                                                                                              //keep in mind that createUserWithEmailAndPassword will automatically log you in
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);        //this will create a user and return an object with the user credentials
        updateProfile(auth.currentUser, {                                                           //you can use updateProfile to update any data about the user on the spot
            displayName: "new username"
        });
        await sendEmailVerification(userCredentials.user)                                           //alot of the times, you should send an email verification to the user
        await signOut(auth);                                                                        //you can also sign out with this function
  }
  catch(error){
       console.log(error.message);
  }
}
















async function LoginWithMicrosoft(){
    try {
        const provider = new OAuthProvider("microsoft.com");
        provider.setCustomParameters({
            prompt: "consent",                       //forces the user to select an account, even if they are already logged in
            tenant: "9376f0e7-1c43-470a-aaea-06f6e6e413da"          //this seems to be required for this to work
        })
       await signInWithPopup(auth, provider)    
    }
    catch(error){
        console.log(error);
    }
}

async function LoginWithFacebook(){
    try {
        const provider = new FacebookAuthProvider();
        await signInWithPopup(auth, provider)    
    }
    catch(error){
        console.log(error);
    }
}




function SignInWithPhoneNumber() {
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const handleSubmit = async () => {
        try{
            const confirmationResult = await signInWithPhoneNumber(auth, '+5106196086', window.recaptchaVerifier);
            setConfirm(confirmationResult);
        }
        catch(error){
            console.log(error);
        }
    }

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    const submitCode = async() => {
        try{
            const result = await confirm.confirm(code);
            //user is now logged in!
        }
        catch(error){
            if(error.code === 'auth/invalid-verification-code')
                //display an error message to the user
        }
        
    }

    useEffect(() => {
        auth.languageCode = 'en'; 
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {            // 'sign-in-button' is an ID of a button that calls 'signInWithPhoneNumber()'
            'size': 'invisible',
            'callback': (response) => {
                console.log(response);
            }
        });
    }, [])


    return(
        <form className={styles.form}>
            {confirm ? 
                <fieldset>
                    <h1>
                        We sent you a code, please enter the code
                    </h1>
                    <input value={code} onChange={handleCode} />
                    <button onClick={submitCode}>
                        Submit Code
                    </button>
                </fieldset> : 
                <fieldset>
                    <button id='sign-in-button' onClick={handleSubmit}>
                        Register
                    </button>            
                </fieldset>
            }
        </form>
    )
}




async function deleteAccount() {
    try{
        await deleteUser(auth.currentUser);
    }
    catch(error){
        if(error.code === 'auth/requires-recent-login')
            // find a way to let user log in again
    }
}


//this function will get called everytime there is a change in the auth state, as the name implies.
//for the most part, it is used to determine if the user logged in or signed out
//it can be used to check if a user can skip the login page if they are already signed in
onAuthStateChanged(auth, (currentUser) => {
     if(currentUser != null) {
        console.log("user is already logged in");
        navigate("/accountPage") 
    }
    else if(currentUser == null){
        console.log("no user is logged in");
        navigate("/loginPage")
    }
})



//this function can also be used to access meta data from the users account.
//if you access auth.currentUser directly and assign it to a variable.
//the variable will be null AFTER you refresh the page or re-render the component
onAuthStateChanged(auth, (currentUser) => {
     if(currentUser != null)
         setUser(currentUser.displayName);                
})


//------------------------------------------------------- AUTHENTICATION REACT HOOKS -----------------------------------------------------------------
import {useSignInWithGoogle, useSignInWithApple, useSignInWithMicrosoft, useSignInWithFacebook, useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';



//keep in mind, for microsoft and facebook, you will need to configure your developers account for each of these companies to use the 'log in' functionality
//make sure you use the redirect URI for the configuration 
function LoginPage() {
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);           //userGoogle is an object with all the credentials of the user
    const [signInWithApple, userApple, loadingApple, errorApple] = useSignInWithApple(auth);
    const [signInWithMicrosoft, userMicrosoft, loadingMicrosoft, errorMicrosoft] = useSignInWithMicrosoft(auth);
    const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] = useSignInWithFacebook(auth);
    
    const handleGoogle = async () => {
        try{
           await signInWithGoogle();                        //after this function is called, the userAuthState() will automatically redirect you to account page
        }
        catch(error){
            console.log(error);
        }
    }
    const handleApple = async () => {
        try{
            await signInWithApple();                        //to use apple log in, you have to buy a subscription that costs $100 a year, fuck that
        }
        catch(error){
            console.log(error);
        }
    }
    
    const handleMicrosoft = async () => {
        try{                                                //you MUST include the following parameters on the second argument for this to work
            await signInWithMicrosoft("", {prompt: "consent", tenant: "9376f0e7-1c43-470a-aaea-06f6e6e413da"});     //prompt will ask the user which microsoft account they want to use            
        }
        catch(error){
            console.log(error);
        }
    }
    
    const handleFacebook = async () => {
        try{
            await signInWithFacebook();
        }
        catch(error){
            console.log(error);
        }
        
    }

    return(
        <>
            <button onClick={handleGoogle}> "Sign In with Google" </button>   
            <button onClick={handleApple}> "Sign In with Apple" </button> 
            <button onClick={handleMicrosoft}> "Sign In with Microsoft" </button> 
            <button onClick={handleFacebook}> "Sign In with Facebook" </button> 
        <>
    )
}


function AuthStateChangeHook() {
    const [user] = useAuthState(auth);
    
    return(
        {user ? <AccountPage/> : <LoginPage/>}
    )

}












//------------------------------------------------------ FIREBASE STORAGE-----------------------------------------------------------------------------
//REMEMEBER, YOU MUST SET THE RULES OF THE STORAGE TO ALLOW PEOPLE TO ACCESS YOUR STORAGE.
//https://console.firebase.google.com/u/0/project/insta-messaging-app/storage/insta-messaging-app.appspot.com/rules

import {ref as refSB, uploadBytes, listAll} from "firebase/storage";                     //some modules have the same function names, such as ref
import {storage} from './firebase-config';




//the functions below are all asynchronous
async function uploadImagesToStorage(file) {
     const reference = refSB(storage, "/AbelsImages/" + file.name);                   //its a good idea to store the images in a folder like this
     await uploadBytes(reference, file);                                        //file can be the Javascript File that comes from the <input type="file">     
}                                                                                     //or it can be a blob object

async function downloadImagesFromStorage(fileName){
    const reference = refSB(storage, "/AbelsImages/" + fileName);
    let url = await getDownloadURL(reference);
    //you can then select an img element and assign the url to the src attribute
}


async function TraversingThroughTheFilesInAFolder() {
    const imagesRef = ref(storage, 'myImages');
    const results = await listAll(imagesRef);
    results.items.forEach((ref) => {
            ref.name;
            ref;                        //ref is a file reference, you will need to use getDownloadURL() to get the url for the file
    })
}

async function deleteFile() {
    const imageRef = ref(storage, 'myImages/funny-cat.jpg');
    await deleteObject(imageRef);
}


//-------------------------------------------------------- FIREBASE STORAGE REACT HOOKS -----------------------------------------------------------
import { useDownloadURL, useUploadFile } from 'react-firebase-hooks/storage';
import {ref as refSB} from 'firebase/storage';
import {storage} from './firebase-config';


function Download(props) {
    const ref = refSB(storage, "/DavidsImages/" + props.fileName);
    const [downloadUrl, loading, error] = useDownloadURL(ref);                      
                                                                                    
    if(loading)
        return(<>still loading</>)
    
    else{
          const url = downloadUrl();
          return(<img src={url} />)
     }
}


//not sure about this one yet
function Upload() {
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    
    const handleClick = async (e) => {
        const file = e.target.files;
        const ref = refSB(storage, "/folderName/" + file.name);
        await uploadFile(ref, file,  );
    }
    
    return(
        <input type="file" onClick={handleClick}/>
    
    )
    
}




















//-------------------------------------------------------- FIRESTORE --------------------------------------------------------------------------------
import {collection, addDoc, setDoc, doc, updateDoc, increment, decrement, arrayUnion, deleteDoc, onSnapshot} from 'firebase/firestore'

//in Firestore, data is organized in documents, which are then organized into collections
//keep in mind that doc() and collection() can also create nested collections or doc
const docRef = doc(db, 'richard/info/data/time/person/whatever')        //even though time doesnt exist, it will be created with all the nested doc


//this is also legal
const collectionRef = collection(db, "users");            //selects a collection
const docRef = doc(collectionRef, "Abel")                 //selects a document within the collection


//this is how you create nested collections
const nestedDocumentRef = doc(db, "users", "richard/info/data")   //richard is a document within the users collection, info is a nested collection and data is a document within the nested collection
const nestedCollectionRef = collection(db, "users/richard/info") //users is a collection, richard is a document, info is a nested collection within richard


//different ways of using doc()
const docRef = doc(collectionRef, "Abel");                       //passing a collection ref as the first argument and passing the name of the document as the second argument
const nestedDocumentRef = doc(db, "users", "richard/info/data"); //first argument receives the firestore object, second argument takes the name of collection, and the third is the name of the document
const anotherDocRef = doc(db, "users/abel");                     //users is the collection, abel is the document
anotherDocRef.exists();                                          //self explainatory

//different ways of using collection()
const collectionRef = collection(db, "users");            //selects a collection
const nestedCollectionRef = collection(db, "users/richard/info") //selects a nested collection


//accessing data from a doc()
const docRef = doc(collectionRef, "Abel");
const docData = await getDoc(docRef);
docData.data();                                                   //this should return an object with all the properties of the document
docData.id;                                                       //self-explanatory, returns the id of the document
docData.exists();


//you can use query(), orderBy() and where() to organize a collection
const q = query(collectionRef, orderBy('datePosted', 'desc'));
const [comments, loading] = useCollectionData(q);

const q = query(collectionRef, where('population', '!=', 1000))
const [country, loading] = useCollectionData(q);






//addDoc() should only be used with collection()
async function addNewDocument () {
        try{
            const myCollection = collection(db, "users")                   //collection() will create or select a collection called 'users',
            const docRef = await addDoc(myCollection, {                      //this will always add a new document to the collection
                first: "abel",                                               //if a document exists with the same data, then nothing will happen
                last: "muro",
            });
            console.log(docRef.id);                                         //addDoc will always generate a unique ID for every document in the collection                                  
        }                                                                   //you cannot customize the name of the document with addDoc
        catch(error){
            console.log("error");
        }
}




//setDoc() should only be used with doc()
async function setNewOrReplaceDocument() {
     try{
        const newDocument = doc(db, "cities", "LA");                       //doc() will create or select a collection called 'cities' and a document called 'LA'
        await setDoc(newDocument, {                                        //setDoc() will replace an existing document in the collection
                name: "carlos",                                            //if the document doesnt exist, then a new one will be created
                age: 56
            }, {merge : false})                                            //the second argument tells firebase to merge the new data with the existing data in the document
        }                                                                  // assuming that the document already exists
     }
    catch(error){
        console.log(error); 
    }
}

async function updateDocument() {
    try{
        const documentRef = doc(db, 'posts/post');
        await updateDoc(documentRef, {                                      //updateDoc will automatically update the fields specified in the second argument
            title: 'new title',                                              //if the field doesnt exist in the document, then it will be created
            age: increment(1),                                              //if the field is a number, you can increment the original number with increment or decrement
            friends: arrayUnion('john'),                                    //arrayUnion allows you to add elements to an array in the document
        })
    }
    catch(error){
        console.log(error);
    }
        
}

async function deleteDocument() {
    try{
        const docRef = doc(db, 'posts/post');
        await deleteDoc(docRef);                                                //as the name implies, the document will be deleted from the collection
    }
    catch(error){
          console.log(error);
    }

}



async function getDocument() {
     try{
         const docRef = doc(db, "cities", "LA");                            //creating a reference to a document
         const snapshot = await getDoc(docRef);                             //getDoc() will return a 'snapshot' of all the data in the document
         if(snapshot.exists())                                              //determining if the document actually exists
             console.log(snapshot.data())                                   //displaying the data
         else
             console.log("document doesnt exist");  
        }
     catch(error){
         console.log(error);
     }
    
}

async function getAllDocumentsFromCollection() {
    try{
        const collectionRef = collection(db, "cities");
        let query = await getDocs(collectionRef);                           //getDocs() will return an iterable object that you can use to iterate through a collection
        query.forEach((document) => {
            document.id;                                                    //gets the name/identifier of the document
            document.data();
            doc(db, "cities", document.id);                                 //if you want to update every document in the collection, you must use doc()
        })
    }

}


async function detectingChangesInADocument() {
    const docRef = doc(db, `MyAccount/userInfo`);
    const unsubscribe = onSnapshot(docRef,  (doc) => {                    //everytime there is a change in the document. onSnapshot() will be called
        doc.data();
        doc.id;
    })
}




//-----------------------------------------------------------FIRESTORE HOOKS-------------------------------------------------------------------------------
import React from 'react';
import {firestoreDB } from './firebase-config';
import {collection, doc} from 'firebase/firestore';
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore';        



function ReactHooks () {
    const collectionRef = collection(db, "cities")                                  // collection() returns a reference to a collection
    const documentRef = doc(collectionRef, "LA")                                    // doc() returns a reference to a document from a collection
    
    const [value, loading, error] = useCollectionData(collectionRef);
    //value                                                                         //this is an array that contains all the documents in the collection
    //value[0].name
    
    const [val, load, error] = useDocumentData(documentRef)
    //val                                                                          // this is an object that represents the document
    //val.name                                                                  
    
    return loading ? (<>...is loading<>) : (<> Done loading</>)
}










































//to set up firebase hosting...

//npm install -g firebase-tools
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//firebase login
//firebase init hosting

//it will then ask you a bunch of questions about the project

//starting emulators
//firebase setup:emulators:firestore            ensure that this is first installed
//firebase emulators:start --only auth


















