//React Native is a library used to develop mobile apps on android and iOS
// REMEMBER, react native does NOT use className

/*    
                                          NATIVE COMPONENTS:  
                                          
                          In Android development, we use Kotlin or java to write components
                          In iOS development, we use Swift or Objective-C to write components
                          React Native will create a corresponding component for android and iOS
                          and invoke them by using Native Components (View, Text, Image, ScrollView, TextInput)
                          

                      --------------------------INSTALLING REACT NATIVE--------------------------
                      1) npx react-native init NameOfProject
                                     
                      2) npm run start                          


                     ----------------------INSTALLING FONTS INTO PROJECT---------------------------
                    1) To install fonts into your react-native project 

                        1.1) create the assets folder and then the fonts folder, then put the font files inside the folder
                              Make sure you name the font files appropriately
    
                        1.2) create the react-native.config.js file with the following content
    
                            module.exports = {
                                  project: {
                                      ios: {},
                                      android: {},
                                    },
                                  assets: ['./assets/fonts'],
                            };
                            
                        1.3) npx react-native-asset  (this will automatically link the font files in your project)
    
                              keep in mind that the name of the font files will be the name of the font family



                    ------------------DEPLOYING ANDROID APP WITH REACT NATIVE----------------

                    1) Open up terminal and change directory to "C:\Program Files\jdk-21.0.2\bin"

                    2) type in the following line

                        keytool -genkeypair -v -storetype PKCS12 -keystore CUSTOMNAME.keystore -alias CUSTOMNAME -keyalg RSA -keysize 2048 -validity 10000

                    3) The terminal will ask you for a password and will give you a set of questions that you must answer
                       REMEMBER THE PASSWORD YOU USED HERE

                    4) Then a .keystore file will be generated in the "C:\Program Files\jdk-21.0.2\bin" folder

                    5) Go to the android/app folder and put the .keystore file in that folder

                    6) Open up the gradle.properties file in android folder, and insert the following lines of code
                    
                              MYAPP_UPLOAD_STORE_FILE=CUSTOMNAME.keystore
                              MYAPP_UPLOAD_KEY_ALIAS=CUSTOMNAME
                              MYAPP_UPLOAD_STORE_PASSWORD=put_password_here
                              MYAPP_UPLOAD_KEY_PASSWORD=put_password_here

                    7)  Go to the android/app folder and open the build.gradle file and insert the following lines of code
                        Leave everything else as it is.
                        
                              android {
                                  ...
                                  defaultConfig { ... }
                                  signingConfigs {
                                      release {
                                          if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                                              storeFile file(MYAPP_UPLOAD_STORE_FILE)
                                              storePassword MYAPP_UPLOAD_STORE_PASSWORD
                                              keyAlias MYAPP_UPLOAD_KEY_ALIAS
                                              keyPassword MYAPP_UPLOAD_KEY_PASSWORD
                                          }
                                      }
                                  }
                                  buildTypes {
                                      release {
                                          ...
                                          signingConfig signingConfigs.release
                                      }
                                  }
                                  splits {
                                      abi {
                                          reset()
                                          enable true
                                          universalApk false
                                          include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
                                      }
                                  }
                              }
                            }

                    8) Next, run the following commands in the terminal
                          cd android 
                          ./gradlew bundleRelease

                    9) The command above will generate a .aab file that can be used to deploy the react-native app to the play store

                        android/app/build/outputs/bundle/release/app-release.aab









                  ---------------------- DEPLOY IOS APP WITH REACT NATIVE ---------------------------------
                  1) Open up Xcode and oepn up the .xcworkspace file in the ios folder of your project

                  2) Click on the Images file/folder and upload the icons needed for the app 
                      (make sure the 1024 x 1024 icon is exported without an alpha channel in the preview app)

                  3) Close xCode

                  4) Open up Xcode and open up the .xcodeproj file in the ios folder of your project

                  5) Click on Product -> Sceme -> Edit Scheme -> Run
                     Change Build Configuration to Release

                  6) Then click on Product -> build

                  7) This will build the .xcodeproj file
                      
                  7) Then close Xcode and open up PROJECTNAME.xcworkspace in ios folder

                  8.1) At this point, you will need an Apple Developers Account.
                       make sure to have a device registered in Certificates, Identifiers & Profiles -> Devices

                  9) Then Product -> Archive 

                  10) It will start to build the .xcworkspace file

                  11) At some point in the build process, Xcode will ask you for your mac password.

                  12) Then Click on Distribute App

                  13) The App will then be uploaded to the apple store connect

                  14) Log into your Apple developers account and go to Apple Store Connect -> Apps -> NameOfApp (Prepare for submission)

                  15) Enter all the necessary information for the app, including screenshots of the app

                  16) Click on submit for review

                  17) You may need to wait a day or two until Apple reviews the app for any inconsistencies

                  18) When the app is ready for distribution, go to Pricing and Availability -> App Distribution Methods -> select public

                  19) App should be available on the apple store now
                    
*/




//========================================================================== CORE COMPONENTS ==============================================================================
import React from 'react';


//-------------------------- VIEW-----------------------------------
// VIEW is a component that represents a small rectangular element on the screen that can be used to display text, images, and respond to user input
// it serves as a container for other elements

import {View} from 'react-native';

const App = () => {
    return (
      <View style={{display: 'flex', justifyContent: 'center'}}>            //This is your container, anything can be nested within
        
      </View>
    );
};

export default App;






//------------------------- SCROLL VIEW ----------------------------
//SCROLL VIEW: is a component that is similar to the view component, 
// the difference is that you can scroll within this container

import {ScrollView} from 'react-native';

const App = () => {
    return (
      <ScrollView style={{display: 'flex', justifyContent: 'center'}}>            //This is your container, anything can be nested within
          // images and text goes here
      </ScrollView>
    );
};

export default App;







//-------------------------- FLAT LIST ------------------------------
// FLAT LIST is a component that displays a long list of data,
// the content only renders when it is currently on the screen
// you must use the contentContainerStyle prop to organize the list as a flex box

import {Text, View} from 'react-native';

const App = () => {

  const renderItem = ({item}) => {                    //this function will be called for every item in the list, you can apply styles to every item 
      return (
          <Text style={{color: 'red'}}> 
              {item} 
          </Text>
    )
  }
  
  return (
      <View> 
          <FlatList 
              data={['my', 'name', 'is', 'dude']} 
              horizontal                                  //by default, FlatList is a vertical list, but you can make a horizonal list with this prop
              renderItem={renderItem}
              contentContainerStyle={{justifyContent: 'center', alignItems: 'center', gap: '45px'}}
            />    
      </View>
  )
}





//----------------------- SECTION LIST --------------------------
// SECTION LIST is a component that displays a large list of data divided into sections
// you must use the contentContainerStyle prop to organize the list as a flex box

import {SectionList, View, Text} from 'react-native';

const App = () => {

      const renderItem = ({item}) => {                        //this function will be called for every item in the list
          return (
              <Text style={{color: 'red'}}> 
                  {item} 
              </Text>
        )
      }

      const renderSectionHeader = ({section}) => {          //this function will be called for every section in the list
            return (
              <Text style={{color: 'blue'}}> 
                  {item} 
              </Text>
        )
      }

      const itemSeparator = () => {
          return 'separator between EVERY item';
      }

      const sectionSeparator = () => {
        return 'separator between every section'
      }
      
      return(
          <View>
              <SectionList 
                  sections={[
                    {title: 'A', data: ['david', 'stephani', 'vanessa']},
                    {title: 'B', data: ['mandy', 'billy', 'grim']}
                  ]}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                  horizontal                                  //by default, FlatList is a vertical list, but you can make a horizonal list with this prop
                  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', gap: '45px'}}
                  ItemSeparatorComponent={itemSeparator}    
                  SectionSeparatorComponent={sectionSeparator}
                  keyExtractor={item => `basicListEntry-${item}`}
              /> 
          </View>
      )
}

  
//------------------------- PRESSABLE ------------------------------
//PRESSABLE is a button component

import {Pressable} from 'react-native';

const App = () => {

  const handlePress = () => {
    console.log('Hello World')
  }
  
  return (
    <Pressable onPress={handlePress}>
      <Text> CLick ME!</Text>
    </Pressable>
  )
}






//--------------------------- TEXT ----------------------------------
//TEXT is a component that can be used to display text onto the screen

import {Text, View, Linking} from 'react-native';

const App = () => {
    
    return (
      <View>             
          <Text> Hello World</Text>       
      </View>
    );
};

export default App;








//--------------------------- LINKING -------------------------------

import {Text, Linking} from 'react-native';

const App = () => {

    const handlePress = () => {
        Linking.openURL('http://google.com');                  //you can open up a new link with this module
    };
    
    return (
        <View onPress={handlePress}>             
            <Text> Hello World</Text>       
        </View>
    );
};

export default App;









//--------------------------- IMAGE ----------------------------------
//IMAGE is a component that can be used to upload an image

import {Image, View} from 'react-native';
import icons from './icons';

const App = () => {
    return (
      <View>
          <Image source={{uri: 'url goes here', width: 64, height: 64}} />
          <Image source={icons['logo']} style={{width: '64px', height: '64px'}} />
      </View>
    )
}



//------------------------ BACKGROUND IMAGE ---------------------------


import {ImageBackground} from 'react-native';
import images from './images';

const App = () => {
  return (
        <ImageBackground source={images['background']} resizeMode='cover' style={{width: '100px', height: '100px'}}>
  
        </ImageBackground>
    )
}





//---------------------------- INPUT ---------------------------------
//INPUT is a component that can be used to receive user input

import {TextInput, View} from 'react-native';

const App = () => {
    const [text, setText] = useState('');

    const handleText = (newText) => {
        setText(newText)
    }
  
    return (
        <View>
            <TextInput
                placeholder='Type here'
                defaultValue={text}
                onChangeText={handleChange}                //we dont use onChange event handler here
            />
        <View>
    )
}







//---------------------------- STYLESHEETS -----------------------------
//STYLESHEET: is a object that lets you create a stylesheet inside a JS file
//this is another way of modularizing css in your component

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
});

const App = () => {
    return(
      <View style={styles.container}>
        
      </View>
    )
}



//---------------------------------- ALERT ------------------------------

import {Alert} from 'react-native';

function App = () => {
    const handleAlert = () => {
      Alert.alert('Alert Title', 'My Alert Msg', [
        {                                                            //buttons
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    return(<View onPress={handleAlert}> Hello World! </View>)
} 





//========================================================================== MODULES ===============================================================
//you can use the platform module to apply certain styles to elements based on the current OS

import {Platform, StyleSheet} from 'react-native';

Platform.OS;                                                 //detects the current OS (android, iOS)
Platform.select();                                           //returns an object depending on the current OS
Platform.Version === 25;                                     //this can be used to detect the current version of android
parseInt(Platform.Version, 10);                              //this can be used to detect the current version of iOS

const styles = StyleSheet.create({
    container: {
       height: Platform.OS === 'ios' ? 200 : 100,             // OS will return the current operating system of the device (android or ios)
       ...Plaform.select({                                    // depending on the current OS, .select() will return a set of properties with their values
           ios: {
             backgroundColor: 'red'
           },
           android: {
             backgroundColor: 'blue'
           },
           default: {                                        //any other plaforms, like web for example
              backgroundColor: 'green'
           }
       })
    }
})

Platform.OS        
Platform





//===================================================== STYLED COMPONENTS =============================================
// styled components is a library that simplifies implementing css in a react native app
// the syntax for the properties and values resemble css

import styled from 'styled-components/native';


const MyImage = styles.Image`
    width: 100px;
    height: 100px;
`

export const Box = styled.View `
    width: 100%;
    height: 80px;
    border: 1px solid transparent;
    padding: 24px;
    background-color: white;

    &: hover {                            //you can apply hover states like this
      background-color: red;
    }
    
    > ${MyImage} {                       //you can apply descendent selectors with interpolation
    color: blue;
    }
    
`

