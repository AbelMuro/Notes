//React Native is a library used to develop mobile apps on android and iOS
// REMEMBER, react native does NOT use className

/*    
                                          NATIVE COMPONENTS:  
                                          
                          In Android development, we use Kotlin or java to write components
                          In iOS development, we use Swift or Objective-C to write components
                          React Native will create a corresponding component for android and iOS
                          and invoke them by using Native Components (View, Text, Image, ScrollView, TextInput)
                          

                                                INSTALLING REACT NATIVE FOR MAC
                      1) Watch this video if you are setting up the developers environment (https://www.youtube.com/watch?v=MJEcookWYUI&t=10s) (install the dependencies with brew ONLY)

                      2) npx react-native init NameOfProject
  
                      3) npm run ios or npm run start                          


                                            INSTALLING REACT NATIVE FOR WINDOWS

                      Watch this video if you are setting up the developers environment (https://www.youtube.com/watch?v=MJEcookWYUI&t=10s) (install the dependencies with brew ONLY)       

                                            
                      1) npm init -y

                      2) npm install react react-native
                         npm install @babel/core -D
                         npm install @babel/preset-env -D
                         npm install @babel/runtime -D
                         npm install @react-native/babel-preset -D
                         npm install @react-native/metro-config -D

                      3) Use the following scripts

                              "scripts": {
                                  "android": "react-native run-android",
                                  "ios": "react-native run-ios",
                                  "start": "react-native start",
                                },


                       4) Create the metro.config.js file in the root directory

                              const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
                              
                              const config = {};                         
                              module.exports = mergeConfig(getDefaultConfig(__dirname), config);


                       5) Create the index.js file in the root directory

                                import {AppRegistry} from 'react-native';
                                import App from './src/App.js';
                                import {name as appName} from './src/app.json';
                                
                                AppRegistry.registerComponent(appName, () => App);

                       6) Create a babel.config.js file in the root directory

                             module.exports = {
                                  presets: ['module:@react-native/babel-preset'],
                              };


                       7) Create a src folder in the root directory

                       8) Create an app.json file in the src folder

                                   {
                                      "name": "AdviceGeneratorApp",
                                      "displayName": "AdviceGeneratorApp"
                                  }

                      9) Create an app.js file in the src folder

                            import React from 'react';
                            import {View, Text} from 'react-native';
                            
                            function App() {
                                return(
                                    <View>
                                        <Text>
                                            Hello World
                                        </Text>
                                    </View>
                                  )
                            }
                            
                            export default App;

                    10) Create an android folder in the root directory and copy ALL the files from the android folder in the AdviceGeneratorApp repository

                    11) Create an ios folder in the root directory and copy ALL the files from the ios folder in the AdviceGeneratorApp repository

                    12) To install fonts into your react-native project 

                    12.1) create the assets folder and then the fonts folder, then put the font files inside the folder
                          Make sure you name the font files appropriately

                    12.2) create the react-native.config.js file with the following content

                        module.exports = {
                              project: {
                                  ios: {},
                                  android: {},
                                },
                              assets: ['./assets/fonts'],
                        };
                        
                    12.3) npx react-native-asset  (this will automatically link the font files in your project)

                          keep in mind that the name of the font files will be the name of the font family



                    DEPLOYING ANDROID APP WITH REACT NATIVE

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

