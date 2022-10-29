import { initializeApp } from "firebase/app";               //you need this for your app to use firebase
import { getDatabase} from 'firebase/database';             //accessing one of the getter functions for the database module
import { getAuth} from 'firebase/auth';
import { getStorage} from 'firebase/storage';
import { getFirestore} from 'firebase/firestore';

//the configuration object that you need to initialize firebase
//keep in mind that every project has their own configuration object
//and every project can have multiple apps accessing the same project
const firebaseConfig = {                                    
    apiKey: "AIzaSyBxvSMl1zmBK4DeqgACqrPAD8tEGjh3b0U",                      //the 'key' that your app needs to access the firebase console
    authDomain: "employee-management-app-ee938.firebaseapp.com",            //the domain for the authentication that your app can use for signing in and logging out
    databaseURL: "https://employee-management-app-ee938-default-rtdb.firebaseio.com", //the url of the database for this project
    projectId: "employee-management-app-ee938",                             //identifies the project that this app will be using
    storageBucket: "employee-management-app-ee938.appspot.com",
    messagingSenderId: "807475484166",                                      //the ID that is used for enabling messaging in your app
    appId: "1:807475484166:web:8f1f6620482b52ecf99587",                     //the ID that is used for identifying the app in the project. Projects can have multiple apps             
    measurementId: "G-Y2VBPMPYRZ",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database and exporting it
export const db = getDatabase(app);                                         //alot of the times, to use firebase, you will need to export these objects

// Initialize authentication and exporting it
export const auth = getAuth(app);                                           //alot of the times, to use firebase, you will need to export these objects

// Initialize storage and exporting it
export const storage = getStorage(app);

// Initialize firestore database and exporting it
export const db = getFirestore(app);


















//======================================================== everything below should be in a separate module ===================================================

//-------------------------------------------------------------- REACT HOOKS -----------------------------------------------------------------------------------
//react hooks follow the same logic as using plain firebase with no hooks, you still have to import the modules for firestore, realtime database, auth, etc...
//and use those modules on the hooks. These hooks were designed just to display data





















//--------------------------------------------------------------- REALTIME DATABASE ----------------------------------------------------------------------------------
import {ref, set, onValue, push} from 'firebase/database';
import {db} from './firebase-config';
import {useRef} from 'react';

let nodeRef = useRef();                                    //its a good idea to use a useRef to reference a node in the database

//in realtime, data is stored in JSON

function traverseThroughDatabase(findName) {
     const referenceToDB = ref(db);                     //creating a reference to the entire database

     onValue(referenceToDB, (snapshot) => {             //creating a 'snapshot' of the entire database
          const data = snapshot.val();                  //parsing the snapshot into valid JS
          for(let node in data){
              if(data[node].name == findName)          //alot of the times, the database will be parsed into objects, so you can access the properties within that object
                  console.log("Found Name");
                  nodeRef.current = node;                  //storing a reference to the node in the database for future use
          }
     }) 
}



function updateNode(nodeRef, newData) {
    const referenceToNode = ref(db, "/" + nodeRef)        //there is an optional second argument that you can use to refence a specific node in database
    
    set(referenceToNode, {                             //set can be used to update a node in the database with new data, set will delete any previous nodes that has the same reference
      name: newData.name,
      age: newData.age,
      birthday: newData.birthday
    })
}



function createNewNode(newData){
    const referenceToDB = ref(db);
    const newNodeWithUniqueID = push(reference);           //push will generate a unique ID for a node
    
    set(newNodeWithUniqueID, {
        name: newData.name,
        age: newData.age,
        birthday: newData.birthday
    })
  
}
     











//------------------------------------------------------------- AUTHENTICATION ------------------------------------------------------------------
import { createUserWithEmailAndPassword, updateProfile, signOut, sendEmailVerification, sendSignInLinkToEmail} from 'firebase/auth';
import {auth} from './firebase-config';


//alot of the functions in the authentication module are asynchronous
//its also a good idea to use a try-catch block to catch any errors and handle them appropriately

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



async function login(email, password) {
  try{
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);                //this will sign the user in if their email is already registered
      if(!userCredentials.user) throw "email not verified";                                           //you can use the userCredentials object to check if the email has been verified    
  }
  catch(error) {
      if(error.message != null)
          console.log(error.message) 
      else
        console.log(error)
  }
}



async function createUserWithEmailLink(email) {
    try{
        const actionCodeSettings = {
            url: "http://localhost:8080/login",                                         //this is the url that the user will see when they click on the email link
            handleCodeInApp: true,                                                      //this must be true
        }
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)                    //this will send an email link that the user can use to login
        localStorage.setItem("emailLinkForSignIn", email);                              //its a good idea to store the email in the local storage 
    }
   catch(error){
       console.log(error.message)
   }  
}


//its a good idea to put this async function inside a useEffect() so that the user
//can skip the login page and go directly to the account page
async function LoginWithEmailLink() {
       const saved_email = localStorage.getItem("emailLinkForSignIn");                  //getting the email from the local storage
        if(isSignInWithEmailLink(auth, window.location.href) && saved_email){           //checking to see if the user logged in through an email link
            await signInWithEmailLink(auth, saved_email, window.location.href)          //this function actually signs the user in
            localStorage.removeItem("emailLinkForSignIn");                              //removing the email from the local storage
            navigate("/adminaccount");                                                  //navigating directly to the account page
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
import {useSignInWithGoogle, useSignInWithApple, useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';



function ChooseSignInMethod() {
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);           //userGoogle is an object with all the credentials of the user
    const [signInWithApple, userApple, loadingApple, errorApple] = useSignInWithApple(auth);
    
    const handleGoogle = async () => {
        try{
           await signInWithGoogle(); 
           navigate("/AcountInfo");
        }
        catch(error){
            console.log(error);
        }
    }
    const handleApple = async () => {
        try{
            await signInWithApple();
            navigate("/AccountInfo");
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <button onClick={handleGoogle}> "Sign In with Google" </button>   
            <button onClick={handleApple}> "Sign In with Apple" </button> 
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
import {ref as refSB, uploadBytes} from "firebase/storage";                     //some modules have the same function names, such as ref
import {storage} from './firebase-config';




//the functions below are all asynchronous
function uploadImagesToStorage(file) {
     const reference = refSB(storage, "/AbelsImages/" + file.name);                   //its a good idea to store the images in a folder like this
      uploadBytes(reference, file);                                        //file can be the Javascript File that comes from the <input type="file">     
}                                                                                     //or it can be a blob object

async function downloadImagesFromStorage(fileName){
    const reference = refSB(storage, "/AbelsImages/" + fileName);
    let url = await getDownloadURL(reference);
    //you can then select an img element and assign the url to the src attribute
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
        await uploadFile(ref, fileUploaded);
    }
    
    return(
        <input type="file" onClick={handleClick}/>
    
    )
    
}




















//-------------------------------------------------------- FIRESTORE --------------------------------------------------------------------------------
import {collection, addDoc, setDoc, doc} from 'firebase/firestore'

//in Firestore, data is organized in documents, which are then organized into collections

//this is also legal
const collectionRef = collection(db, "users");            //selects a collection
const docRef = doc(collectionRef, "Abel")                 //selects a document within the collection



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


















