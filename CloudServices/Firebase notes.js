/* 
        Firebase is a cloud service that provides back-end features as a service

        npm install firebase
*/





//=================================================== Initialize Firebase ===================================================
/* 
        You can initialize firebase by calliing the initializeApp functions
        But first you need to create a new project in the firebase console

        Go to firebase console -> create new project -> go to project settings -> general -> scroll down to 'your apps' section, and add a web app to the project

        When you add a web app to your project, it will generate the firebaseConfig object that 
        you will need to use for initializing the firebase SDK
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
    Add Realtime Database to your firebase project and change the read and write rules
    for the database

    Go to firebase console -> Realtime database -> Rules -> { "rules": {".read": true, ".write": true}}
    

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
    apiKey: "",                      //the 'key' that your app needs to access the firebase console
    authDomain: "",                 //the domain for the authentication that your app can use for signing in and logging out
    projectId: "",                   //identifies the project that this app will be using
    storageBucket: "",
    messagingSenderId: "",          //the ID that is used for enabling messaging in your app
    appId: "",                     //the ID that is used for identifying the app in the project. Projects can have multiple apps             
    measurementId: "",
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
        You can implement authentication with firebase with different providers. 
        Add authentication to your project in the firebase console, and add a 
        sign-in provider that your app can use to sign in users

        go to firebase console -> authentication -> go to sign-in-method -> select the sign-in providers you want to use      
        
*/


//------------------------- Initializing Authentication
/* 
        You must call the getAuth() function to initialize authentication
        in your firebase app
*/
import { initializeApp } from "firebase/app";                   
import { getAuth} from 'firebase/auth';

const firebaseConfig = {                                    
    apiKey: "",                      //the 'key' that your app needs to access the firebase console
    authDomain: "",                 //the domain for the authentication that your app can use for signing in and logging out
    projectId: "",                   //identifies the project that this app will be using
    storageBucket: "",
    messagingSenderId: "",          //the ID that is used for enabling messaging in your app
    appId: "",                     //the ID that is used for identifying the app in the project. Projects can have multiple apps             
    measurementId: "",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);                                         




//------------------------- onAuthStateChange() Hook
/* 
        The onAuthStateChange() is a firebase hook that can be used to detect
        changes in the auth state. If the user logs in or logs out, it will trigger
        the onAuthStateChange(). The callback that is passed to the second argument
        of this hook has access to the following object.

        currentUser = {
                uid: A unique identifier for the user.
                email: The user's email address (if available). 
                emailVerified: A boolean indicating whether the user's email is verified.    
                displayName: The user's display name (if set).   
                photoURL: The URL of the user's profile picture.   
                phoneNumber: The user's phone number (if available).   
                providerId: The authentication provider used (e.g., "google.com", "facebook.com").  
                metadata: An object containing metadata about the user's account, including:  
                creationTime: Timestamp of when the user account was created.   
                lastSignInTime: Timestamp of the user's last sign-in.  
                providerData: An array of provider-specific user information. 
                stsTokenManager: An object managing the Firebase authentication tokens.  
                tenantId: The tenant ID if multi-tenancy is enabled. 
                isAnonymous: A boolean indicating whether the user signed in anonymously.
        }
*/

import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (currentUser) => {
     if(currentUser) 
        console.log("user is already logged in");
    else 
        console.log("no user is logged in");
})



//------------------------- Verify Email
/* 
        If you want the user to verify their email before logging in,
        you can do this by using the sendEmailVerification() function
*/
import { sendEmailVerification} from 'firebase/auth';
import {auth} from './firebase-config';

async function verifyEmail() {
        try{
              await sendEmailVerification(auth.currentUser)  
        }
        catch(error){
              console.log(error.message);
        }
}

                                
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




//------------------------- Logging out
/* 
        You can use the signOut() function to log out
        a user.
*/

import { signOut} from 'firebase/auth';
import {auth} from './firebase-config'

async function logOut(email, password) {
  try{                                                                                           
        await signOut(auth);                                                                       
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

        You can also use the isSignInWithEmailLink() method
        to check if the current URL is a valid link that can be used 
        to sign in.
*/

import {auth} from './firebase-config';
import { sendSignInLinkToEmail, isSignInWithEmailLink} from 'firebase/auth';

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
        You can login with google by using the GoogleAuthProvider() constructor
        and the signInWithPopup() method. The signInWithPopup() will
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

import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from './firebase-config';

async function LoginWithGoogle() {
    try{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
                   login_hint: 'A string specifying the email address of the user to be pre-filled in the sign-in form.',
                   hd: 'A string specifying a Google Workspace domain to restrict sign-in to users from a particular domain.' ,
                   prompt: 'Specifies the authentication prompt behavior. Possible values are "none", "consent", or "select_account".',
                   include_granted_scopes: 'A boolean (true or false) to indicate whether the user should be prompted to grant additional scopes if they’ve already signed in.',
                   openid.realm: 'Used for OpenID authentication and helps with federated identity setups.',
                   access_type: 'Defines whether the authentication flow should request offline access. Possible values are "online" or "offline".',
        });
        const userCredentials = await signInWithPopup(auth, provider);    
    }
    catch(error){
        console.log(error);
    }
}



//------------------------- Login with Microsoft
/* 
        You can login with Microsoft by using the oAuthProvider() constructor
        and the signInWithPopup() function. The signInWithPopup() returns the 
        following object.

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

import { OAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from './firebase-config';

async function LoginWithMicrosoft(){
    try {
        const provider = new OAuthProvider("microsoft.com");
        provider.setCustomParameters({
                   login_hint: 'A string specifying the email address of the user to be pre-filled in the sign-in form.'
                   hd: 'A string specifying a Google Workspace domain to restrict sign-in to users from a particular domain.' 
                   prompt: 'Specifies the authentication prompt behavior. Possible values are "none", "consent", or "select_account".'
                   include_granted_scopes: 'A boolean (true or false) to indicate whether the user should be prompted to grant additional scopes if they’ve already signed in.'
                   openid.realm: 'Used for OpenID authentication and helps with federated identity setups.'
                   access_type: 'Defines whether the authentication flow should request offline access. Possible values are "online" or "offline".'
        })
       const userCredentials = await signInWithPopup(auth, provider)    
    }
    catch(error){
        console.log(error);
    }
}



//------------------------- Login with Facebook
/* 
        You can login with facebook with the FacebookAuthProvider() constructor
        and the signInWithPopup() function. The signInWithPopup() returns the following
        object

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

import { FacebookAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth} from './firebase-config';

async function LoginWithFacebook(){
    try {
        const provider = new FacebookAuthProvider();
        const userCredentials = await signInWithPopup(auth, provider)    
    }
    catch(error){
        console.log(error);
    }
}



//------------------------- Delete account
/* 
        You can delete your account by using the deleteUser() function
*/

import { deleteUser} from 'firebase/auth';
import {auth} from './firebase-config';

async function deleteAccount() {
    try{
        await deleteUser(auth.currentUser);
    }
    catch(error){
        if(error.code === 'auth/requires-recent-login')
            // find a way to let user log in again
    }
}



//------------------------- Sign in with Phone number
/* 
        You can enable uses to sign in with a phone number by using 
        the signInWithPhoneNumber() function. Phone number must be in 
        the following format.

                +1 510 619 6057
*/

        // 1) In an onSubmit handler, you will call signInWithPhoneNumber() and this will return a confirm object
        
          import { signInWithPhoneNumber } from 'firebase/auth';
          import {auth} from './firebase-config';
        
          const handleSubmit = async (phoneNumber) => {
                try{
                    const confirm = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
                    console.log('text message with a code was sent to the phone number')
                    setConfirm(confirm);                        //you should put the confirm object in a state 
                }
                catch(error){
                    console.log(error);
                }
            }
          
        
        // 2) With the confirm object, you have access to the confirm() method that can be used to 
        //    let the user enter the code that was sent to them
        
        const handleCode = (code) => {
                try{
                    const result = await confirm.confirm(code);                //confirm is the object returned from signInWithPhoneNumber()
                    console.log('user is logged in')
                }
                catch(error){
                    if(error.code === 'auth/invalid-verification-code')
                        console.log('Invalid Code was entered')
                }
        }
        




//------------------------------------------------------- AUTHENTICATION REACT HOOKS -----------------------------------------------------------------
/* 
        You can also implement authentication with firebase hooks
        keep in mind, for microsoft and facebook, you will need to configure your developers account 
        for each of these companies to use the 'log in' functionality make sure you use the 
        redirect URI for the configuration 

        All the following hooks return the user object

                user = {
                        uid: Unique identifier for the user.
                        displayName: User's full name from their Facebook profile.       
                        email: Email associated with the account (if available).        
                        photoURL: Profile picture URL.       
                        emailVerified: Boolean indicating if the email is verified.         
                        phoneNumber: User's phone number (if available).           
                        providerData: Array of authentication provider details.      
                        metadata: Contains timestamps for account creation and last sign-in.
                }
*/




//------------------------- useSignInWithGoogle()
/* 
        you can use the useSignInWithGoogle() hook to sign in your
        users with google. It displays a popup on the website that 
        takes the user to the google login page.
*/

import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';

function App() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);           //userGoogle is an object with all the credentials of the user

    const handleGoogle = async () => {
        try{
           await signInWithGoogle();                 
        }
        catch(error){
            console.log(error.message);
        }
    }
        
}



//------------------------- useSignInWithApple()
/* 
        You can use the useSignInWithApple() hook to enable users to log in with 
        their apple account. It displays a popup on the website that takes users 
        to the apple log in page.

        to use apple log-in, you have to buy a subscription that costs $100 a year, fuck that
*/

import { useSignInWithApple} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';


function App(){
        const [signInWithApple, user, loading, error] = useSignInWithApple(auth);

        const handleApple = async () => {
                try{
                    await signInWithApple();                       
                }
                catch(error){
                    console.log(error.message);
                }
        }
}



//------------------------- useSignInWithMicrosoft()
/* 
        You can use the useSignInWithMicrosoft() hook to enable users to log in with 
        their microsoft account. It displays a popup on the website that takes users 
        to the microsoft log in page.
*/

import { useSignInWithMicrosoft} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';

function App() {
        const [signInWithMicrosoft, user, loading, error] = useSignInWithMicrosoft(auth);

        const handleMicrosoft = async () => {
                try{                                                //you MUST include the following parameters on the second argument for this to work
                    await signInWithMicrosoft("", {prompt: "consent", tenant: "9376f0e7-1c43-470a-aaea-06f6e6e413da"});     //prompt will ask the user which microsoft account they want to use            
                }
                catch(error){
                    console.log(error);
                }
        }
        
}




//------------------------- useSignInWithFacebook()
/* 
        You can use the useSignInWithFacebook() hook to enable users to log in with 
        their faceboook account. It displays a popup on the website that takes users 
        to the facebook log in page.
*/

import { useSignInWithFacebook} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';

function App() {
        const [signInWithFacebook, user, loading, error] = useSignInWithFacebook(auth);  

        const handleFacebook = async () => {
                try{
                    await signInWithFacebook();
                }
                catch(error){
                    console.log(error.message);
                } 
        }
}



//------------------------- useAuthState()
/* 
        You can use the useAuthState() hook to detect changes 
        on the log-in state of the user
*/

import { useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase-config';

function App() {
        const [user] = useAuthState(auth);    
}
































//=================================================== FIREBASE STORAGE ===================================================
/* 
        You can use the storage in firebase to store files such as images and text documents
        Add firebase storage to your project, and set the rules of the storage to allow people to access
        the storage.

        go to firebase console -> firebase storage -> Rules -> allow read, write: if true;

*/



//------------------------- Initialize firebase storage
/* 
        You must initialize firebase storage by using the getStorage()
        function. The second argument is a link that is generated in the
        storage.

        Go to firebase console -> firebase storage -> copy the url ('gs://name-of-project-f1fdc.appspot.com/')
*/

import { initializeApp } from "firebase/app";               
import { getStorage} from 'firebase/storage';

const firebaseConfig = {                                    
    apiKey: "",                    
    authDomain: "",           
    projectId: "",                
    storageBucket: "",
    messagingSenderId: "",       
    appId: "",                            
    measurementId: "",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, 'gs://link-sharing-app-f1fdc.appspot.com/');  //you must include the 'bucket' name for the storage you are trying to access




//-------------------------  Upload file to storage
/* 
        You can upload an image to storage by using the ref() 
        function and the uploadBytes() function.

        The file upload can be the files uploaded from <input type="file"/>  
        or any blob object
*/

import {ref, uploadBytes, listAll} from "firebase/storage";                  
import {storage} from './firebase-config';

async function uploadImagesToStorage(file) {
     const reference = ref(storage, "/AbelsImages/" + file.name);                  
     const uploadResult = await uploadBytes(reference, file);            
     uploadResult.metadata;
     uploadResult.ref;                //reference to the file uploaded to storage                              
}                                                                                 




//------------------------- Download file from storage
/* 
        You can download a file from storage by using the 
        getDownloadURL(). This function will return the url
        of the file in storage that can be used to download the file
*/

import {ref, getDownloadURL} from "firebase/storage";                  
import {storage} from './firebase-config';

async function downloadImagesFromStorage(fileName){
    const reference = ref(storage, "/AbelsImages/" + fileName);
    const url = await getDownloadURL(reference);
    //you can assign the url to the src attribute of an img tag
}


//------------------------- Delete file from storage
/* 
        You can delete files from the storage by using the 
        deleteObject() function.
*/

import {ref, deleteObject} from "firebase/storage";                  
import {storage} from './firebase-config';

async function deleteFile() {
    const imageRef = ref(storage, 'myImages/funny-cat.jpg');
    await deleteObject(imageRef);
}







//-------------------------------------------------------- FIREBASE STORAGE REACT HOOKS -----------------------------------------------------------
/* 
     You can use hooks to upload and download files from the storage   
*/



//------------------------- useDownloadURL()
/* 
        You can use the useDownloadURL() hook to download a file
        from the storage. The hook returns the url for the file 
        that can be used on a src attribute of an img tag
*/

import { useDownloadURL} from 'react-firebase-hooks/storage';
import {ref} from 'firebase/storage';
import {storage} from './firebase-config';

function App({filename}) {
    const ref = ref(storage, "/DavidsImages/" + fileName);
    const [downloadUrl, loading, error] = useDownloadURL(ref);                      
                                                                                    
    return !loading && <img src={url}/>
}






//------------------------- useUploadFile()
/* 
        You can use useUploadFile() hook to upload a file 
        to the storage.
*/

import {useUploadFile } from 'react-firebase-hooks/storage';
import {ref} from 'firebase/storage';
import {storage} from './firebase-config';

function Upload() {
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    
    const handleClick = async (file) => {                                //file is a blob object from an <input type='file'/>
        const ref = ref(storage, "/folderName/" + file.name);
        await uploadFile(storage, file, { contentType: "text/plain" });;
    }
     
}




















//=================================================== FIREBASE FIRESTORE ===================================================
/* 
        The firestore is a NoSQL database that can be used for deep nesting.
        Firestore organizes its data by using collections, and each collection 
        is a group of documents. Each document has syntax similar to an JS object.
        Add firestore to your project.
        
*/


//------------------------- Initialize Firestore
/* 
        You can initialize firestore by using the getFirestore() method
*/

import { initializeApp } from "firebase/app";               
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {                                    
    apiKey: "",                     
    authDomain: "",               
    projectId: "",                   
    storageBucket: "",
    messagingSenderId: "",         
    appId: "",                             
    measurementId: "",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);




//------------------------- Doc() function
/* 
        You can use the doc() function to get a reference to a specific
        document in a collection. The second/third arguments of this function
        accept directories that point to a specific document. Also, if the 
        directory includes a path that doesnt exist, then it will be created.
        Keep in mind that the final path of the directory must be a document
*/

import {doc} from 'firebase/firestore'
import {firestore} from './firebase-config';

const docRef = doc(db, 'users/richard/history/actions/contacts/david')      // users is a colletion, richard is a document, history is a collection, actions is a document, etc..  
const docRef = doc(db, "users", "richard/info/data")                        // second argument accepts the name of a collection, third argument accepts the directory of a document within the collection
docRef.exists();                                                            // returns a boolean value indicating if the document exists in the collection 




//------------------------- Collection() function
/* 
        You can use the collection() function to get a reference to a specific
        collection in firestore.
*/

import {collection} from 'firebase/firestore'
import {firestore} from './firebase-config';

const collectionRef = collection(db, "users");                            // selects a collection
const collectionRef = collection(db, "users/richard/history");            // users is a collection, richard is a document, history is a collection
const docRef = doc(collectionRef, "Abel")                                 // you can also use the reference returned by collection(), and use it on the first argument of doc()





        

//------------------------- Getting a document from a collection
/* 
        You can get a document from a collection by using the getDoc() function.
        getDoc() returns a promise that resolves to the following object.

        snapshot = {
                id: The document ID.
                ref: A reference to the document (DocumentReference).        
                exists(): A method that returns true if the document exists, otherwise false.       
                data(): A method that retrieves the document’s data as an object.       
                get(fieldPath): A method to retrieve a specific field’s value.       
                metadata: Contains metadata related to the snapshot, including whether it comes from cache or the server.     
                createTime: The timestamp of when the document was created.     
                updateTime: The timestamp of the latest update to the document.      
                readTime: The timestamp of when the snapshot was read
        }
        
*/

import {getDoc, doc} from 'firebase/firestore';

async function getDocument() {
     try{
         const docRef = doc(db, "cities", "LA");                         
         const snapshot = await getDoc(docRef);                             
     }
     catch(error){
         console.log(error);
     }
}






//------------------------- Getting all documents in a collections
/* 
       You can get all the documents in a collection by using the 
       getDocs() function. The promise that is returned from 
       getDocs() will resolve to an iterable object that contains 
       all the documents. Each document in the iterable object has the
       following properties.

        document = {
               document.id:   A string representing the document's unique ID.
               document.ref:  A DocumentReference pointing to this document’s location in Firestore.        
               document.data(): Returns an object containing all the fields in the document.
               document.get(fieldPath): Retrieves the value of a specific field by its path.
        }

        You can also use the query() function to get a specific group of documents 
        within the collection. The query() function uses where(), orderBy() and limit()
        to specify the group.

                orderBy()    can be used to order the documents based on a property (second argument can 'asc' or 'desc')
                where()      can be used to get a document if a property's value meets a certain condition
                limit()      can be used to limit the number of documents that are retrieved from the collection      
*/

import { getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";

async function getAllDocumentsFromCollection() {
    try{
        const collectionRef = collection(db, "cities");
        const query = await getDocs(collectionRef);   
        query.forEach((document) => {});
            
        const q = query(collectionRef, orderBy('datePosted', 'desc'));
        const q = query(collectionRef, where('population', '!=', 1000));
        const q = query(collectionRef, limit(10)));
        const q = query(collectionRef, where('population', '!=', 1000), limit(20))                // you can combine where(), orderBy() and limit() in the same query function
        const query = await getDocs(q);                           
    }
}








//------------------------- Create document in collection
/* 
        You can use the addDoc() function to add a new document 
        to a collection. The first argument of addDoc() accepts a
        reference to a collection returned by the collection() function.
        The second argument is an object with the data we want to store
        in the new document.addDoc() returns a promise that resolves 
        to the following object.

        docRef = {
                id: The unique ID of the document generated by Firestore.
                path: The full path of the document in the Firestore database (e.g., "myCollection/abcd1234").    
                parent: A reference to the parent collection (myCollection in this case).  
                firestore: A reference to the Firestore instance 
                withConverter(): A method for applying a custom converter to the document reference.  
                collection(): A method to get a subcollection reference within the document.  
                delete(): A method to delete the document. 
                get(): A method to retrieve the document's data.
                set(): A method to create or update the document.
                update(): A method to update specific fields in the document.
        }
*/

import {collection, addDoc} from 'firebase/firestore';

async function addNewDocument () {
        try{
            const myCollection = collection(db, "users")                  
            const docRef = await addDoc(myCollection, {                     
                first: "abel",                                              
                last: "muro",
            });                          
        }                                                                   //you cannot customize the name of the document with addDoc
        catch(error){
            console.log("error");
        }
}




//------------------------- Replace document in collection
/* 
        You can use the setDoc() to replace a document in a collection.
        If the document doesn't exists, then a new document will be created.
        The third argument of setDoc() accepts an object with the following 
        properties.

                {
                        merge:  a boolean indicating if ALL the provided properties should be updated in the existing document, if false, then the whole document will be replaced
                        mergeFields: an array of properties that includes which provided property should be updated in the existing document.
                }
*/

import {doc, setDoc} from 'firebase/firestore'

async function ReplaceDocument() {
     try{
        const newDocument = doc(db, "cities", "LA");                  
        await setDoc(newDocument, {                                       
                name: "carlos",                                           
                age: 56,
                location: 'LA'
            }, {merge: true})                            //name, age and location will be updated in the existing document.  If false, then the whole document will be replaced
        }                          
        await setDoc(newDocument, {
                name: 'carlos',
                age: 57,
                location: 'san francisco'
        }, {mergeFields: ['name', 'age']})                //only name and age will be updated in the existing document, location will not be added/updated
     }
    catch(error){
        console.log(error); 
    }
}






//------------------------- Update document in collection
/* 
        You can update a document in a collection by using the updateDoc()
        function. All properties in the object on the second argument of the
        updateDoc() function will be updated in the existing document. If a property
        doesnt exist in the original document, then that property will be added.
        If the document doesnt exist, then it will be created

        If you want to retrieve the previous value of a property and update it.
        you can do so by using the following functions

                increment()        accepts a positive or negative integer value that will be used to increment or decrement the property's original value
                arrayUnion()       accepts any value that will be added as a new element to the property's original array (if arrayUnion() contains an element that is already included in the original array, then nothing will happen)
                arrayRemove()      accepts a value that will be filtered from the property's original array
                serverTimeStamp()  returns the current server's time when the document was updated
*/

import {updateDoc, doc, increment, arrayUnion, serverTimeStamp} from 'firebase/firestore'

async function updateDocument() {
    try{
        const documentRef = doc(db, 'posts/post');
        await updateDoc(documentRef, {                                      
            title: 'new title',                                            
            age: increment(1),                      //can be negative as well                                       
            friends: arrayUnion('john'),     
            updatedAt: serverTimeStamp()
        })
    }
    catch(error){
        console.log(error);
    }
        
}




//------------------------- Delete document in collection
/* 
        You can delete a document in a collection by uding the
        deleteDoc() function.
*/

import {deleteDoc, doc} from 'firebase/firestore'

async function deleteDocument() {
    try{
        const docRef = doc(db, 'posts/post');
        await deleteDoc(docRef);                                                //as the name implies, the document will be deleted from the collection
    }
    catch(error){
          console.log(error.message);
    }
}




//------------------------- Detecting changes in a document
/* 
        You can detect changes in a document by using the onSnapshot()
        function. onSnapshot() will return a function that lets you unsubscribe 
        from the changes of the document. The second argument of this function 
        accepts a callback that will be called when there is a change in the document. 
        The callback will accept an object with the following properties.

        document = {
                doc.id: A string representing the document’s unique ID.
                doc.ref: A DocumentReference pointing to the document’s location in Firestore.
                doc.exists(): A boolean indicating whether the document exists.   
                doc.metadata: Metadata about the document, such as whether it was fetched from the cache or server.
                doc.data(): Returns an object containing the document’s fields (or undefined if the document doesn’t exist).
                doc.get(fieldPath): Retrieves the value of a specific field by its path.
        }
*/

import {onSnapshot, doc} from 'firebase/firestore'

async function detectingChangesInADocument() {
    const docRef = doc(db, `MyAccount/userInfo`);
    const unsubscribe = onSnapshot(docRef,  (document) => {})
}
















//-----------------------------------------------------------FIRESTORE HOOKS-------------------------------------------------------------------------------
import React from 'react';
import {firestoreDB } from './firebase-config';
import {collection, doc} from 'firebase/firestore';
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore';        



function ReactHooks () {
    const collectionRef = collection(db, "cities")                                  // collection() returns a reference to a collection
    const documentRef = doc(collectionRef, "LA")                                    // doc() returns a reference to a document from a collection
    const q = query(collectionRef, orderBy('datePosted', 'desc'));
    
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


















