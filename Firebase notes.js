//npm install firebase

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
//keep in mind that it is possible for a user's account to use both email/password and the google identity provider.
//but its ALWAYS a good idea for the user to verify their email first before linking their email/password with another identity provider
//also keep in mind that when you are trying to load an image photo from google or microsoft, its always a good idea to use referrerPolicy="no-referrer" on your image tags


import { createUserWithEmailAndPassword, updateProfile, signOut, sendEmailVerification, sendSignInLinkToEmail} from 'firebase/auth';
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




async function LoginWithGoogle() {
    try{
        const provider - new GoogleAuthProvider();
        provider.setCustomParameters({
            "login_hint": "user@example.com"
        });
        await signInWithPopup(auth, provider)    
    }
    catch(error){
        console.log(error);
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
        await uploadFile(ref, file,  );
    }
    
    return(
        <input type="file" onClick={handleClick}/>
    
    )
    
}




















//-------------------------------------------------------- FIRESTORE --------------------------------------------------------------------------------
import {collection, addDoc, setDoc, doc, updateDoc, increment, decrement} from 'firebase/firestore'

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
        })
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


















