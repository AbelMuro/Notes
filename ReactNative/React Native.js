/*    

        React Native is a library used to develop mobile apps on android and iOS


        Bookmarks:
                1) Features of React Native
                2) Container Components (View, Scroll View, Dynamic Scroll View)
                3) List Components (Flat List, Section List)
                4) Button Components (Pressable, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback)
                5) Text Components (Text)
                6) Image Components (Image, BackgroundImage)
                7) Loading Icon Components (ActivityIndicator)
                8) Input Components (TextInput)
                9) Forms (Formik, Field, useField, useFormikContext)
                10) Event Handlers (onPress, onLongPress, ...)
                11) Modules
                        11.1) Platform
                        11.2) Alert
                        11.3) Stylesheets
                        11.4) Linking
                12) React Navigation
                13) ENV variables
                14) Styled-Components (CSS in JS library)


                                       FEATURES OF REACT NATIVE

                                          NATIVE COMPONENTS:  
                                          
                          In Android development, we use Kotlin or java to write components
                          In iOS development, we use Swift or Objective-C to write components
                          React Native will create a corresponding component for android and iOS
                          and invoke them by using Native Components (View, Text, Image, ScrollView, TextInput)
                          

                      --------------------------INSTALLING REACT NATIVE--------------------------
                      1) npx react-native init NameOfProject
                                     
                      2) npm run start              

                              keep in mind that if you have issues with initializing your react-native app
                              you may want to run the following lines of code to reset the cache
      
                                  cd android
                                  ./gradlew clean
                                  cd ..
                                  npm start --reset-cache

                              ALSO, don't move the files around!


                              if you want to regenerate the android or ios folder, follow these steps
        
                              npm install react-native-eject
                              npm install @react-native-community/cli
        
                              react-native eject
                      
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



                    ---------------------- REMOVING FONTS FROM YOUR PROJECT---------------
    
                    1) First delete the font file from the assets/fonts folder

                    2) For android, go to android/app/src/main/assets and delete the font file there

                    3) For iOS, open up xCode and go to the Info.plist and delete the font file there
                       then go to the 'build phases tab' and go to the 'copy bundle resources' section
                        delete the font files within that section


                    

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

        
                    10) Open up Google Play console -> Home -> Create app

                    11) Complete the steps necessary in the 'Finish setting up your app' section

                    12) Next you will need to setup the app for Closed Testing. 
                        Go to the 'Closed Testing' section and then complete the necessary steps
                        At some point, you will need to upload the .aab file that was generated after building your app
                        This will be your App Bundle

                    13) Once you complete the steps for the closed testing, you must submit your changes in the 'publishing overview' section

                    14) Once you submit, you will have to wait until Google reviews and approves the closed testing changes that you made







                  ---------------------- DEPLOY IOS APP WITH REACT NATIVE ---------------------------------
                  1) Open up Xcode and open up the .xcworkspace file in the ios folder of your project

                  2) Go to {project name}/Images and upload the icons needed for the app 
                      (make sure the 1024 x 1024 icon is exported without an alpha channel in the preview app)

                      2.5)  you can check if an image has an alpha channel by opening up the preview app, 
                            file -> duplicate -> then save -> a popup will appear and you want to uncheck alpha

                  3) Click on Product -> Sceme -> Edit Scheme -> Run
                     Change Build Configuration to Release

                  4) Then click on Product -> build  (this may take some time)

                    4.5) At this point, you will need an Apple Developers Account.
                         make sure to have a device registered in Certificates, IDs & Profiles -> Devices

                  5) Then Product -> Archive 

                    5.5) At some point in the build process, Xcode will ask you for your mac password.
                    
                  6) If a popup doesn't appear, go to Window -> Organizer and then select on the newest archive.
              
                  7) Then Click on Distribute App

                  8) The App will then be uploaded to the apple store connect

                  9) Log into your Apple developers account and go to Apple Store Connect -> Apps -> NameOfApp (Prepare for submission)

                  10) Enter all the necessary information for the app, including screenshots of the app

                    10.5) In the case that you submit multiple builds, you can go to TestFlight -> Builds -> iOS 
                          and then you can modify the builds so that they appear in Distribution

                  11) Click on submit for review

                  12) You may need to wait a day or two until Apple reviews the app for any inconsistencies

                  13) When the app is ready for distribution, go to Pricing and Availability -> App Distribution Methods -> select public

                  14) App should be available on the apple store now
                    
*/












//========================================================================== CONTAINER COMPONENTS ==============================================================================
/* 
    Every element created in React Native must be inside a container component
*/


//------------------------- VIEW 
/* 
     VIEW is a component that represents a small rectangular 
     element on the screen that can be used to display text, 
     images, and respond to user input. It serves as a 
     container for other elements
*/


import {View} from 'react-native';

const App = () => {
    return (
      <View style={{display: 'flex', justifyContent: 'center'}}>            //This is your container, anything can be nested within
        
      </View>
    );
};

export default App;




//------------------------- SCROLL VIEW 
/* 
    SCROLL VIEW: is a component that is similar to the view component, 
    the difference is that you can scroll within this container
*/


import {ScrollView} from 'react-native';

const App = () => {
    return (
      <ScrollView style={{display: 'flex', justifyContent: 'center'}}>            //This is your container, anything can be nested within
          // images and text goes here
      </ScrollView>
    );
};

export default App;


//------------------------- DYNAMIC SCROLL VIEW
/* 
     There will be times where you will need to dynamically load data with scroll view
     You can use the Dimensions.get() module to dynamically get the size of the device
     when rendering dynamic data
*/


import {Dimensions} from 'react-native';            //this component lets you access the width and height of the device you are using

<ScrollView style={{maxHeight: Dimensions.get('window').height, minHeight: 200 }}>    //the scroll view will recalculate its height based on the devices screen
    // dynamic content
</ScrollView>
































  



//========================================================================== LIST COMPONENTS ==============================================================================
/* 
    You can create a 'react list' with flat-list and section-list
*/



//------------------------- FLAT LIST 
/* 
     FLAT LIST is a component that displays a long list of data,
     the content only renders when it is currently on the screen
     you must use the contentContainerStyle prop to organize the 
     list as a flex box
*/


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





//------------------------- SECTION LIST
/* 
     SECTION LIST is a component that displays a large list of data divided into sections
     you must use the contentContainerStyle prop to organize the list as a flex box
*/


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
                  horizontal                                  //by default, SectionList is a vertical list, but you can make a horizonal list with this prop
                  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', gap: '45px'}}
                  ItemSeparatorComponent={itemSeparator}    
                  SectionSeparatorComponent={sectionSeparator}
                  keyExtractor={item => `basicListEntry-${item}`}
              /> 
          </View>
      )
}



























//========================================================================== BUTTON COMPONENTS ==============================================================================

//------------------------- PRESSABLE 
/* 
    PRESSABLE is a button component
*/

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





//------------------------- Touchable Opacity
/* 
        The touchable opacity component is used to make a container
        into a button, it supports the onPress event handler.
        This component provides an animation where the child 
        components become transparent when they are pressed on.
*/
import {TouchableOpacity} from 'react-native';

const App = () => {

  const handlePress = () => {
    console.log('Hello World')
  }
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Tap Me</Text>
    </TouchableOpacity>
  )
}


//------------------------- Touchable Highlight
/* 
        The touchable opacity component is used to make a container
        into a button, it supports the onPress event handler.
        This component provides an animation where the child components' 
        background-color darkens when pressed on
*/

import {TouchableHighlight} from 'react-native';

const App = () => {

  const handlePress = () => {
    console.log('Hello World')
  }
  
  return (
    <TouchableHighlight onPress={handlePress}>
      <Text>Tap Me</Text>
    </TouchableHighlight>
  )
}



//------------------------- Touchable without feedback
/* 
        The touchableWithoutFeedback component is used to make a container
        into a button, it supports the onPress event handler.
        This component does not provide any visual animation
*/

import {TouchableWithoutFeedback} from 'react-native';

const App = () => {

  const handlePress = () => {
    console.log('Hello World')
  }
  
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Text>Tap Me</Text>
    </TouchableWithoutFeedback>
  )
}












        














  
//========================================================================== TEXT COMPONENTS ==============================================================================


//------------------------- TEXT 
/* 
    TEXT is a component that can be used to display 
    text on the screen
*/

import {Text, View, Linking} from 'react-native';

const App = () => {
    
    return (
      <View>             
          <Text> Hello World</Text>       
      </View>
    );
};

export default App;






































//========================================================================== IMAGE COMPONENTS ==============================================================================


//------------------------- IMAGE
/* 
      IMAGE is a component that can be used to upload an image
*/

import {Image, View} from 'react-native';
import icons from './icons';

const App = () => {
    return (
      <View>
          <Image source={{uri: 'url goes here', width: 64, height: 64}} />
          <Image 
                source={icons['logo']} style={{width: '64px', height: '64px'}} 
                onError={({nativeEvent: {error}}) => {                            //this function is called when there is an error in loading the image
                        console.log(error)
                    }}/>
      </View>
    )
}



//------------------------- IMAGE BACKGROUND
/* 
    IMAGE BACKGROUND is a component that is used to create a container
    that has an image as a background
*/

import {ImageBackground} from 'react-native';
import images from './images';

const App = () => {
  return (
        <ImageBackground source={images['background']} resizeMode='cover' style={{width: '100px', height: '100px'}}>
  
        </ImageBackground>
    )
}

























//========================================================================== LOADING ICON COMPONENTS ==============================================================================

//------------------------- CIRCULAR PROGRESS BAR 
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function App() {
  return(
    <ActivityIndicator size="small" color="#0000ff" />
  )
}

























//========================================================================== INPUT COMPONENTS ==============================================================================


//------------------------- TEXT-INPUT 
/* 
    TEXT-INPUT is a component that can be used to receive user input
*/


import {TextInput, View} from 'react-native';

function App ()  {
    const [text, setText] = useState('');

    const handleText = (newText) => {
        setText(newText)
    }
        
    const handleSubmit = () => {}
  
    return (
        <View>
            <TextInput
                placeholder='Type here'
                placeholderTextColor={'grey'}
                secureTextEntry={true}                      // hides input, useful for password
                value={text}
                onChangeText={handleChange}                
                onBlur={() => {}}
                multiline={true}
            />
              <Pressable onPress={handleSubmit}> 
                  <Text> Submit </Text>
              </Pressable>
        <View>
    )
}






















//========================================================================== FORMS ===============================================================
/* 
        React-Native doesn't have a built in form component. To handle complex forms, we
        can use external libraries such as FORMIK

        npm install formik

*/


//------------------------- Formik Component
/* 
        The formik component serves as a centralized state manager for all
        the fields for a form.

        
                Syntax: 

                        Formik Component: 
                
                                <Formik initialValue={} onSubmit={} validate={}>
                
                                        initialValues: The initial state of the form
                                        onSubmit: a function that is called when the user submits the form
                                        validate:  a function that is used to validate certain fields, it returns an error object


                        Child Props:
                        
                                <Formik>
                                        {
                                            ({handleChange, handleBlur, handleSubmit, values, errors, touched}) => {         
                                                        
                                                        handleChange:  onChange event handler that changes a specific part of the state (handleChange('email'))
                                                        handleBlur:    onBlur event handler that detects if a TextInput loses focus (handleBlur('email'))
                                                        handleSubmit:  onSubmit event handler that will have access to the whole state
                                                        values:  an object that has all the field values of the form
                                                        errors: an object that is returned from the validate function
                                                        touched: an object that tells formik if a TextInput has been touched by the user
                                            }
                                        }
                                </Formik>
                        
*/

import { Formik } from 'formik';

function App() {

        const handleSubmit = (values) => {
                /* 
                        values = {
                           email,
                           password
                        }
                */
        }

        const validateForm = (values) => {                                               
            const errors = {};
            if(!values.email)
                  errors.email = "Can't be empty";
            if(!values.password)
                  errors.password = "Can't be empty";
        
            return errors;
        }
        
        return(
                <Formik     
                        initialValues={{email: '', password: ''}}                              //state of the form
                        onSubmit={handleSubmit}
                        validate={validateForm}>
                            {(handleSubmit) => (<Pressable onPress={handleSubmit}/> )}
                </Formik>
        )
}




//------------------------- Field Component
/* 
        The Field component is used to render a <TextField/> component 
        as a child prop

                Syntax:

                        Field Component
                        
                                <Field name={} type={}/>
        
                                        name:  this prop is used to identify the field
                                        type:  this prop specifies the type of data for the input
        

                        Child Props:      
                        
                                <Field>
                                        {
                                            ({fields}) => {                                        // fields is an object that has all the necessary props for the TextInput 
                                                  <TextInput {...field} />                         // if you get an error about handleChange() you may want to remove {...field}
                                            }
                                        }
                                </Field>
*/

function App() {
        return(
                <Formik>
                 {
                    ({handleChange, handleBlur}) => (   
                          <Field
                              name='email'
                              type='email'>
                                 {({field}) => (
                                         <TextInput 
                                                {...field}                                          /* using all default field properties (value, onChangeText, etc.. ) */
                                                 onChangeText={handleChange('email')}                /* Make sure the argument to handleChange matches the name prop */            
                                                  onBlur={handleBlur('email')}                        /* Make sure the argument to handleBlur matches the name prop */  
                                        />
                                )}
                             </Field>                 
                        )
                 } 
                </Formik>
        )
}




//------------------------- useField() Hook
/* 
        useField() hook lets you create a field for formik 
        and each field has its own independent event handlers 
        (onChange, onBlur, validate function, etc...)
        This is useful for modularization.

                Syntax: 
                        const [field, meta, helpers] = useField({name, validate});
                        
                                name:  the name of the field for the form (email, password)
                                validate: a function that is used to validate the state of the hook
                                field: {
                                        name,                         // The name of the field.
                                        value,                        // The current field value.
                                        onChange,                     // Function to update the field value.
                                        onBlur,                       // Function triggered when the field loses focus.
                                }
                                meta: {
                                        error,                         // Validation error message (if any).
                                        touched,                       // true if the field has been interacted with.
                                        initialValue,                  // The initial field value.
                                }
                                helpers: {
                                        setValue(value),               // Sets the value manually.
                                        setTouched(boolean),           // Sets the touched state.
                                }
        
*/

const validate = (value) => {
     if(value === '')
          return 'Cant be empty';
     else
          return '';
}

function TextField({name}) {
    const [field, meta, helpers] = useField({name, validate});

    return(
        <TextInput {...field} />
    )
}







//------------------------- useFormikContext() Hook
/* 
        The useFormikContext() hook will return an object 
        that has all the event handlers and the values of the form.
        This hook must be used inside the Formik component

                Syntax:
                        const context = useFormikContext();

                                context = {
                                        values,                         // The current values of all form fields.
                                        errors,                         // An object containing validation errors for each field.
                                        touched,                        // Tracks whether fields have been interacted with.
                                        dirty,                          // Boolean indicating if any field value has changed.
                                        isValid,                        // Boolean indicating if the form is valid.
                                        handleChange('email'),          // Updates field values when input changes.      
                                        handleBlur('email'),            // Marks the field as touched when input loses focus.  
                                        handleSubmit(),                 // Calls the form's submit function.     
                                        setFieldValue(name, value)      // Manually updates a field value.
                                        setFieldTouched(name, touched)  // Manually sets touched state.
                                        resetForm()                     // Resets the form to its initial state.
                                        isSubmitting,                   // Boolean indicating if the form is being submitted.
                                        submitForm(),                   // Manually triggers the form submission.
                                }              
*/

const MyForm = () => {
     return (
         <Formik>
            {() => (
               <View>
                  <SubmitButton />
               </View>
            )}
         </Formik>
     );
};


const SubmitButton = () => {
  const { handleSubmit, values } = useFormikContext();                        //must be used inside of a Formik component

  return (
    <View>
      <Button title="Submit" onPress={handleSubmit} />
      <Text>Current Values: {JSON.stringify(values)}</Text>
    </View>
  );
};



































//========================================================================== EVENT HANDLERS ==============================================================================
/* 
        Every event handler has access to the event object, it is a synthetic event
        that wraps around all browser events with a API to ensure consistent behavior 
        across different browsers. Keep in mind that React-native doesnt use the same 
        event handler names as React, it has its own list of event handlers.

        React native uses the following event names

              onPress
              onLongPress              
              onPressIn              
              onPressOut
              onChangeText
              onEndEditing             
              onFocus            
              onBlur            
              onSubmitEditing            
              onKeyPress
              onScroll
              onMomentumScrollBegin
              onMomentumScrollEnd
              onScrollBeginDrag
              onScrollEndDrag
              onKeyboardDidShow
              onKeyboardDidHide
*/

function App() {

    const handlePress = (e) => {
      /* 
        e.nativeEvent.changedTouches           // An array of touch points that have changed.
        e.nativeEvent.locationX                // X-coordinate of the touch relative to the element.
        e.nativeEvent.locationY                // Y-coordinate of the touch relative to the element.  
        e.nativeEvent.pageX                    // X-coordinate relative to the entire screen.        
        e.nativeEvent.pageY                    // Y-coordinate relative to the entire screen.        
        e.nativeEvent.timestamp                // Time when the event was triggered.        
        e.nativeEvent.target                   // The React Native element that triggered the event.       
        e.nativeEvent.touches                  // An array of all active touch points.      
      */

    }
  
    return (
        <Touchable onPress={handlePress}>
      
        </Touchable>
    )
}



























//========================================================================== MODULES ===============================================================


//------------------------- Platform
/* 
     The platform module is used to get information about the device and the OS.
*/


import {Platform} from 'react-native';

function App() {
        Platform.OS;                                                 // returns the current OS running the app (android or iOS)
        Platform.Version;                                            // returns the version of the OS (a number on android, a string on iOS)
        Platform.isTV;                                               // returns true or false, detects if the app is running on a TV
        Platform.constants.reactNativeVersion;                       // returns a string containing the react native version
        Platform.constants.osVersion;                                // returns a string containing the OS version
        Platform.constants.model;                                    // returns a string containing the device' model (iphone 13, Pixel 6)
        const backgroundColor = Platform.select({                    // select() method is used to apply certain css styles based on the OS
                ios: 'red',                                               
                android: 'blue'
        })     


        return(
            <View style={{backgroundColor}}>
                
            </View>
        )
}



//------------------------- Alert
/* 
        The alert module can be used to display a message to a user
*/
import {Alert} from 'react-native';

const App = () => {
    const handleAlert = () => {
      Alert.alert(                                                                  // available for both iOS and android
          'Alert Title',                                                            // title
          'My Alert Msg', [                                                         // message
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed')},          // Cancel button   
          { text: 'OK', onPress: () => console.log('OK Pressed')}                   // OK button
        ]);

        Alert.prompt(                                                                // only available for iOS
          "Enter your name",                                                         // title
          "Please type your name below:",                                            // message
          (text) => console.log("User entered:", text)                               // text input
        );
    }

    return( 
            <TouchableOpacity onPress={handleAlert}> 
                    Hello World! 
            </TouchableOpacity>
        )
} 


//------------------------- Clipboard
/* */
import Clipboard from '@react-native-clipboard/clipboard';
import {Pressable} from 'react-native';

const App = () => {

    const handleClipboard = () => {
        Clipboard.setString('Hello World');
    }

  return (
    <Pressable onPress={handleClipboard}>
      Click me
    </Pressable>
  )
}



//---------------------------- Stylesheets 
/* 
      STYLESHEET: is a module that lets you create a stylesheet inside a JS file
      this is another way of modularizing css in your component
*/


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





//------------------------- Linking
/* 
    You can create a link with the Linking module and
    the openURL() method
*/

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
































//======================================== REACT NAVIGATION =================================
/* 
        React Navigation can be used to implement client-side routing in a React-native app.
        Keep in mind that this library uses the stack data structure to organize the pages.
        Everytime you navigate to a different page, that page will be placed on top of a stack.
        When you press the back button, the page on top of the stack will be removed. The page 
        that is on top of the stack is what you see on your device.


              1)  npm install @react-navigation/native
                  npm install react-native-screens 
                  npm install react-native-safe-area-context
                  npm install @react-navigation/native-stack
        
              2) for IOS only: 
                      cd ios
                      pod install
                      
              3) for android only: 
                    android/app/src/main/java/<your package name>/MainActivity.kt
        
                        import android.os.Bundle;                                          //add this to the file (must below the package statement)
        
                         class MainActivity: ReactActivity() {
                            // ...
                            override fun onCreate(savedInstanceState: Bundle?) {          //add this to the class
                              super.onCreate(null)
                            }
                            // ...
                          }
*/




//------------------------- NavigationContainer Component
/* 
        <NavigationContainer/> is a component that serves as a container
        for all the navigation that happens in your app

*/

import { NavigationContainer} from '@react-navigation/native';

function App(){
        return(
                <NavigationContainer>
                        
                </NavigationContainer>
        )
}




//------------------------- Navigator Component
/* 
        Navigator is a component that servers as a container
        for all the routes in your app

                Syntax:
                        <Navigator 
                                initialRouteName={}                         // Sets the default screen that appears first. (Home, aboutus)
                                screenOptions={}                            // Provides default styling and behaviors for all screens in the navigator.
                                headerMode={}                               // Controls the header's visibility (screen, float, none).
                                gestureEnabled={}                           // Enables or disables gestures for navigation (swipe back on iOS).
                                presentation={}                             // Specifies how the screen appears (modal, transparentModal, etc.).
                                detachInactiveScreens={}                    // Optimizes performance by unmounting inactive screens.
                                animationEnabled={}                         // Toggles animation for screen transitions.
                        />
*/

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const {Navigator} = createNativeStackNavigator();

function App(){
        return(
                <NavigationContainer>
                        <Navigator initialRouteName="home">

                        </Navigator>
                </NavigationContainer>
        )
}






//------------------------- Screen Component
/* 
        Screen is a component that displays a single route.

                Syntax:
                         <Screen   
                                name={}                                      // Defines the unique name of the screen used for navigation.
                                component={}                                 // Specifies the React component to render for the screen.
                                initialParams={}                             // Passes default parameters to the screen components.
                                options={{
                                        title,                               // Sets the header title.
                                        headerShown,                         // Controls the visibility of the header (true or false).
                                        headerStyle,                         // Customizes header appearance (e.g., background color).                                     
                                        headerTitleStyle,                    // Styles the header text.                                  
                                        headerLeft,                          // headerRight: Adds components like buttons to the left/right of the header.
                                        gestureEnabled,                      // Enables/disables swipe gestures.                                       
                                        animationTypeForReplace,             // Determines animation when replacing a screen (push, pop, etc.).
                                }}
                        />                   
*/

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();


function App() {
        return (
               <NavigationContainer>
                        <Navigator initialRouteName="home">
                                <Screen name="home" component={Home} />
                        </Stack.Navigator>
               </NavigationContainer>
        )
}






//------------------------ Route Props
/* 
        Every component that is used within a <Screen/> component
        will have two props available. Keep in mind, that every Route can
        also return another <Navigator/> component with another set
        of Routes. Those routes will only update the current page on top 
        of the stack.
*/

function Home({navigation, route}) {                 // Every route will have access to the navigation and route prop 
        
        navigation.navigate('aboutus', {             // navigate() will place a new page on top of the stack 
             someParams: 'whatever'                          // You can pass any data as props to the page we are navigating to
        }); 
        navigation.push('AboutMe', {                 // Creates a new instance of the current page. The new instance will be placed ON TOP of the stack
             someParams: 'new params'                      // You can pass any data as props to the page we are navigating to
        });          
        navigation.goBack();                         // goBack() will remove the page on top of the stack
        
        route.key;                                   // A unique identifier for the screen.
        route.name;                                  // The name of the route ("home", "about_us").
        route.params;                                // An object containing any parameters sent to this screen.
        route.path;                                  // The path associated with the route, useful in deep linking.
                
        return (                             
            <Navigator initialRouteName="AboutUs">   // These routes will only update the page on top of the stack
                   <Screen name="home" component={AboutUs} />
            </Navigator>
        )
}






//------------------------- useNavigation() Hook
/* 
        You can use the useNavigation() hook to navigate 
        through different pages. Keep in mind, that the
        useNavigation() hook can only be used inside a 
        route.
*/

import { useNavigation } from '@react-navigation/native';

function Home() {
    const navigation = useNavigation();   
  
    navigation.navigate('AboutUs', {      // navigate() will place a new page on top of the stack
        someParams: 'whatever'                   // You can pass any data as props to the page we are navigating to
    });                
    navigation.goBack();                  // goBack() will remove the page on top of the stack
    navigation.push('ProductDetails', {   // Creates a new instance of the currentpage. The instance will be placed ON TOP of the stack
         productName: 'New Product'               // You can pass any data as props to the page we are navigating to
    });
    navigation.replace('Home');           // Replace the current instance with a new instance. You wont be able to go back to the old instance
    navigation.setParams();               // Update the current route params dynamically.
        
    return(<></>)
}






//------------------------ useRoute() Hook
/* 
        The useRoute() hook can be used to get information
        about the current route. Keep in mind, that this hook
        can only be used inside a route.
*/

import { useRoute } from '@react-navigation/native';

function App() {
      const route = useRoute();

       route.name;                 // The name of the current route.
       route.key;                  // A unique key identifying the route.
       route.params;               // An object containing parameters passed to the route.
        
       return (<></>)   
}





//------------------------ Creating a default Tab Bar for navigation
/* 
        The navigator component returned from createBottomTabNavigator
        will display a navigation bar on the bottom of the screen.

                Syntax: 
                
                        <Tab.Navigator
                                  initialRouteName,                       // Sets the default screen when the navigator loads.
                                  backBehavior,                           // Defines how the navigator handles the back button (firstRoute, initialRoute, order, history, none).
                                  detachInactiveScreens,                  // Determines whether inactive screens should be detached to save memory.
                                  tabBar,                                 // A custom component for rendering the tab bar.
                                  screenListeners,                        // Allows listening to screen lifecycle events.
                                  lazy,                                   // Controls whether screens are lazily loaded.
                                  screenOptions={{
                                        tabBarStyle: { backgroundColor: 'black' },        // background color for the tab bar
                                        tabBarActiveTintColor: 'white',                   // font color for the route name that is on top of the stack
                                        tabBarInactiveTintColor: 'gray',                  // font color for the route name that is NOT on top of the stack
                                  }}
                        />
*/

const Tab = createBottomTabNavigator();

function App() {
       return (
            <NavigationContainer>
                 <Tab.Navigator>
                      <Tab.Screen name="Home" component={HomeScreen} />
                      <Tab.Screen name="Profile" component={ProfileScreen} />
                 </Tab.Navigator>
            </NavigationContainer>
       );
}






//------------------------ Creating a custom Tab Bar for navigation
/* 
        You can create a custom tab bar with the tabBar prop 
        from the navigator component returned from createBottomTabNavigator

        <Tab.Navigator tabBar={CustomTabBar}>

*/

function CustomTabBar({ state, navigation }){
        state.index;                        // index of the active tab
        state.routes;                       // an array of all the route names
        navigation.navigate(name, params);  // Navigates to a specific screen.
        navigation.goBack();                // Goes back to the previous screen.
        navigation.reset({                  // Resets the navigation stack 
                  index: 1,                 // Profile Route will be the current route.
                  routes: [                 // We clear the stack and create a new stack
                    { name: 'Home' },
                    { name: 'Profile' },
                  ],
        });;                    
        navigation.setParams(params);       // Updates the current route's parameters.
}




















                  



//============================================ ENVIRONMENT VARIABLES ===================================


  /*
        1) npm install -D react-native-dotenv
    
        2) update babel.config.js

              module.exports = {
                plugins: [
                  ['module:react-native-dotenv']
                ]
              };

         3) create your .env file with your variables

         4) const apiKey = process.env.API_KEY
  
  */
                  



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

