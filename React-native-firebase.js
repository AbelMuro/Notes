/* 
                0) npm install --save @react-native-firebase/app


                ANDROID STEPS:

                    1) Go to firebase console and either create or select a project for your android app
                       
                       1.1) Project Settings -> General -> Add app

                       1.2) Go to /android/app/build.gradle and find the applicationId and put that value in the 'Android package name'

                       1.3) cd android   ->    ./gradlew signingReport         this will generate the 'SHA-1' key

                       1.4) Create android app in firebase2

                    2) Next download the google-services.json file and place it in /android/app/google-services.json

                    3) Go to /android/build.gradle and add the following line of code

                        buildscript {
                            dependencies {
                              // ... other dependencies
                              
                              classpath('com.google.gms:google-services:4.4.1')      < - add this
                            }
                          }

                    4) go to /android/app/build.gradle and add the following line of code at the top
                          apply plugin: 'com.google.gms.google-services'            <- Add this line

                    5) Now you can start using any sdk from react-native-firebase




            IOS STEPS

                1) Go to the firebase console and either create or select a iOS app

                    1.1) Open your .xcworkspace file in xCode and go to general tab -> identity -> bundle ID
                          Use this ID for the 'Apple bundle ID'

                          the other inputs don't matter for now.

                    1.2) Download the GoogleService-Info.plist
                          Go to project navigator on the left hand side
                          Put the file in this directory...
                              WorldViewApp/WorldViewApp/googleService-Info.plist
                          A pop up window will appear, make sure to select all targets and check 'Copy if needed'

                    1.3) Go to AppDelegate.mm and modify the following code

                        #import <Firebase.h>              //this must be after #import "AppDelegate.h";
        
                        - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
                              [FIRApp configure];          //add this to the top of the functions scope
                              // ...
                            }
                    1.4) Then you will need to install the firebase-sdk into your .xcodeworkspace file

                          file -> Add Packages -> type in 'https://github.com/firebase/firebase-ios-sdk' and install the package
                          
                    1.5)  Create the project in firebase console

              2) Next open your Podfile in ios/Podfile and modify the following code

                  target 'WorldViewApp' do
                    
                      use_frameworks! :linkage => :static            //add this to the top
                      $RNFirebaseAsStaticFramework = true            //add this to the top
                      
                      use_react_native!(
                          :flipper_configuration => flipper_config    //remove this line of code
                      
                      //..

              3) Then install pods by doing 
                  cd ios 
                  pod install --repo-update   (this may take a while)
*/
















///========================================================= FIRESTORE ==========================================================
//npm install @react-native-firebase/firestore
// for ios only..         cd ios ->  pod install

import firestore from '@react-native-firebase/firestore';



// 1) Traverseing through the document of a collection
function App() {
  const collectionRef = firebase.firestore().collection('developers/allVideos/UserVideos');
  
  collectionRef.get().then((snapshot) => {      //snapshot is an array like object that has the documents
      snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());      //data() converts the document object into a js object
      });
  });
}



// 2) Subscribing to live changes in a collection
firestore()
    .collection(`${video.userID}/${video.videoID}/commentSection`)
    .onSnapshot((snapshot) => {       
          snapshot.forEach((doc) => {
            //this function will be called everytime there is a change in the collection
            //you will need to gather the documents again here and store them inside a state array
      });   

// 3) deleting all documents in a collections
let allVideos = await firestore().collection('my videos').get();
      allVideos.forEach((video) => {
            video.ref.delete();
      });




// 4)  Different ways of getting documents and collections      
let collectionRef = firestore().collection('myCollection').orderBy('age', 'desc');    //will return a reference to a collection that has been sorted in ascending or descending order, property must be an integer
let userInfo = await firestore().collection(`my collection`).doc('userInfo').get();   //will return an JS object with all the properties in the document 
await firestore().collection(`my collection`).doc('userInfo')                         //references a doc 'userInfo'
await firestore().collection(`my collection`).doc('userInfo').set({});                //will create or replace a document with the collection
await firestore().collection(`my collection`).doc('userInfo').update(                 //will update properties in the document but will leave everything else alone
  {
    username: newUserName,
    aboutMe: newAboutMe
  }
);
userInfo.exists;                                                                      //this will return true if the document exists or false if it doesn't












      
//======================================================== AUTHENTICATION ==========================================================
//npm install @react-native-firebase/auth
// for ios only..         cd ios ->  pod install


import auth from '@react-native-firebase/auth';


function App() {

    const handleSignOut = () => {
      auth().signOut().then(() => Alert.alert('You have signed out!'));  
    }

    // 1)  Sign in with email and password
    const handleSignInEmailPassword = async (email, password) => {
        try{
            const user = await auth().signInWithEmailAndPassword(email, password);
        }
        catch(error) {
            
        }
    }

  
    // 2)  Sign in with Google
    const handleGoogleLogin = async () => {
        GoogleSignin.configure({
            webClientId: '400279370588-hlaf463h74nf6b5mnp3jbb7ovthatogq.apps.googleusercontent.com'            // -> go to android/app/google-services.json and copy the client_id with client_type 3
        });

        try{
           await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });                        // check if your device supports google play
           const {idToken} = await GoogleSignin.signIn();                                                     // sign in with google and get users id token
           const googleCredential = auth.GoogleAuthProvider.credential(idToken);                              // create credential with users id token
           await auth().signInWithCredential(googleCredential);                                               // register credential
        }
        catch(error){
            alert("Can't sign in with Google")
        }
    }

    // 3) Create account with email and passsword
   const createAccount = (email, password) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use')
                setError('Email is already registered')
            else if(error.code === 'auth/invalid-email')
                setError('Invalid Email');
        }
   }

  /* 
      Sign in with phone number
    
     1) Go to firebase console -> Project Settings -> Your Apps -> copy Encoded App ID
     2) Open up Xcode with project-name.xcworkspace
     3) go to info tab -> URL types, then click on the + sign and in the URL Shemes paste the encoded App ID

     FOR ANDROID:

     1) Go to android/app/build.gradle and add the following dependencies

         dependencies {
            implementation(platform("com.google.firebase:firebase-bom:33.1.0"))      //add this
            implementation("com.google.firebase:firebase-auth")                      //add this
        }  

    2) make sure you get the correct SHA1 and SHA256 keys by using the following command

          keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
      go to firebase -> Project settings -> General -> update the SHA keys

      
  */
  const signInWithPhoneNumber = (phone) => {                        
    const isValid = await auth().verifyPhoneNumber(value);
  }

  

  // 4) Update account info 
  const updateAccount = (username, photoURL) => {
        auth().currentUser.updateProfile({
              displayName: username,
              photoURL: photoURL,
          })
  }

  //5) Deleting account in firebase
  const deleteAccount = async () => {
        let user = auth().currentUser;
        let uid = user.uid;
        await user.delete(); 
  }
  

    //called everytime there is a change in the state
    const onAuthStateChanged = (user) => {
        if(!user) {
            console.log('user is not logged in');
          return;
        }
        let userData = {                           
            userName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            userImage: user.photoURL,
            uid: user.uid
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);        //when the state of the users account changed between logged in or logged out, onAuthStateChange() will call its function
        return subscriber;
    }, [])


    return(
      <View>
        <Pressable onPress={handleSignOut}> 'Sign Out' </Pressable>
        <Pressable onPress={handleGoogleSignInt}> 'Sign in with google'</Pressable>      
      </View>

    )
  
}



//---------- sign in with Apple -----------
// 0) Make sure you enable apple sign-in in the firebase console
// 1) npm install @invertase/react-native-apple-authentication
// 2) cd ios
// 3) pod install
// 4) Open the .xcworkspace file in xCode
// 5) go to Signing & Capabilities tab
// 6) click on '+ Capability' and add 'Sign in with Apple'
// 7) Select 'abel muro' for the Team (you will need to create an apple developers account);
// 8) Go to your Apple Developers account -> Certificates, Identifiers & Profiles -> Identifiers -> Select your project
// 9) Make sure that 'Sign in with Apple' is checked
// 10) Click on 'edit' and select 'Enable as a primary app ID' option, then select the app in 'Primary App ID'
// 11) Then go to the keys tab and create a new key, create a name for the key
// 12) while creating the key, select 'Sign in with apple' and then click configure, then select the 'Primary app id' of the app that will use apple sign in
// 13) click on continue, then click on register
// 14) Download the key

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

function SignInWithApple() {
          try{
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });
            
            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }
            
            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            
            // Sign the user in with the credential
            return auth().signInWithCredential(appleCredential);            
        }
        catch(error){
            console.log(error);
        }
}



//====================================== STORAGE ====================================
//npm install @react-native-firebase/storage --force
// cd ios  -> pod install
      
import storage from '@react-native-firebase/storage';

//different ways of selecting a reference in storage
const reference = storage().ref('black-t-shirt-sm.png');    
const reference = storage().ref('/images/t-shirts/black-t-shirt-sm.png');

function App() {

  //1) uploading a file into the storage
  const handleUpload = async () => {
    try{
        let image = await launchImageLibrary({
              mediaType: 'photo',
          }); 
        if(image.didCancel) return;                    //in case the user does not select an image
        let imageObject = image.assets[0];             //getting the object that represents the image     
        const imageRef = storage().ref(`images/${imageObject.fileName}`);      
        await imageRef.putFile(imageObject.uri);           //using the uri to upload the image to storage  
    }
    catch(error){
        if(error === 'permission')
              Alert.alert("App doesn't have permission to access images");
    }
  }

  //2) uploading a file with event listeners
  const handleUpload = () => {

    const task = reference.putFile(pathToFile);

    task.on('state_changed', taskSnapshot => {          //you can use these event listeners to detect the current progress of upload
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
    
    task.then(() => {                                  //this function will automatically be called when the upload is complete
      console.log('Image uploaded to the bucket!');
    });
  }

  //3) Deleting all files in a folder in storage
  const handleDelete = async () => {
        let filesRef = storage().ref(uid);
        let files = await filesRef.listAll();
        files.items.forEach((file) => {
              file.delete();
        })
  }


  
  const getDownloadUrl = () => {
    try{
         let url = await storage().ref('images/dog.png').getDownloadURL();       //you can use url and add it to a source prop in an Image component
    }
    catch(error){
      console.log(error)
    }
  }
  
  return(
      <Pressable onPress={handleUpload}>
          'Upload image'
      <Pressable>
    )
}








