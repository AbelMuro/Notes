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
                    
*/


///========================================================= FIRESTORE ==========================================================
//npm install @react-native-firebase/firestore

import firestore from '@react-native-firebase/firestore';


function App() {

  
}






















