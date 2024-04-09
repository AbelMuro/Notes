/* 
                0) npm install --save @react-native-firebase/app


                ANDROID STEPS:

                    1) Go to firebase console and either create or select a project for your android app
                       
                       1.1) If you are using a project that already exists, then go to Project Settings -> General -> Add app

                       1.2) Go to /android/app/build.gradle and find the manifest property and put that value in the 'Android package name'

                       1.3) cd android   ->    ./gradlew signingReport         this will generate the 'SHA-1' key

                       1.4) Create android app in firebase

                    2) Next download the google-services.json file and place it in /android/app/google-services.json

                    3) Go to /android/build.gradle and modify the following lines of code

                        buildscript {
                            dependencies {
                              // ... other dependencies
                              
                              classpath 'com.google.gms:google-services:4.4.1'      < - add this
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



//Traverseing through the document of a collection
function App() {
  const collectionRef = firebase.firestore().collection('developers/allVideos/UserVideos');
  
  collectionRef.get().then((snapshot) => {      //snapshot is an array like object that has the documents
      snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());      //data() converts the document object into a js object
      });
  });
}



//Subscribing to live changes in a collection
firestore()
    .collection(`${video.userID}/${video.videoID}/commentSection`)
    .onSnapshot((snapshot) => {       
          snapshot.forEach((doc) => {
            //this function will be called everytime there is a change in the collection
            //you will need to gather the documents again here and store them inside a state array
      });   



await firestore().collection(`my collection`).doc('userInfo')           //references a doc 'userInfo'
let userInfo = await firestore().collection(`my collection`).doc('userInfo').get();    //will return an JS object with all the properties in the document
await firestore().collection(`my collection`).doc('userInfo').set({});  //will create or replace a document with the collection
userInfo.exists;                                                        //this will return true if the document exists or false if it doesn't












      
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


  // 4) Update account info 
  const updateAccount = (username, photoURL) => {
        auth().currentUser.updateProfile({
              displayName: username,
              photoURL: photoURL,
          })
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


















