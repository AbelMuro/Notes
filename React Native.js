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


// there will be times where you will need to dynamically load data with scroll view
// you will need to do the following...

import {Dimensions} from 'react-native';            //this component lets you access the width and height of the device you are using

<ScrollView style={{maxHeight: Dimensions.get('window').height, minHeight: 200 }}>    //the scroll view will recalculate its height based on the devices screen
    // dynamic content
</ScrollView>



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
          <Image 
                source={icons['logo']} style={{width: '64px', height: '64px'}} 
                onError={({nativeEvent: {error}}) => {                            //this function is called when there is an error in loading the image
                        console.log(error)
                    }}/>
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
    const [error, setError] = useState(false);

    const styles = {
       input: {
           width: 100,
           height: 90,
           borderColor: error ? 'red' : 'grey',              //you can change the styles of the input with the error state
           borderStyle: 'solid',
           borderRadius: 5,
       }
    }

    const handleText = (newText) => {
        setText(newText)
    }

    const handleBlur = () => {
        if(text === '')                                   //we can't use 'e.target.validity' in react-native, so we have to validate the state ourselves
          setError(true)  
        else if(text.includes('a'))
          setError(true)
    }

    const handleSubmit = () => {
        if(text === '' && text.includes('a')) return;
        //submit to server
    }

    useEffect(() => {
        setError(false)
    }, [Text])
  
    return (
        <View>
            <TextInput
                placeholder='Type here'
                placeholderTextColor={error ? 'red' : 'grey'}
                value={text}
                onChangeText={handleChange}                //we dont use onChange event handler here
                onBlur={handleBlur}
                 multiline={true}
                style={styles.input}
            />
              <Pressable onPress={handleSubmit}> 
                  <Text> Submit </Text>
              </Pressable>
        <View>
    )
}



//-------------------------- CIRCULAR PROGRESS BAR -----------------------
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function App() {
  return(
    <ActivityIndicator size="small" color="#0000ff" />
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

const App = () => {
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



//---------------------------- CLIPBOARD ----------------------------
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



//---------------------------------------------- e.NativeEvent------------------------------------------------------------------------












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




//======================================== FORMIK =====================================================
//npm install formik
import { Formik, Field } from 'formik';


const validateForm = (values) => {
    const errors = {};
    if(!values.email)
          errors.email = "Can't be empty";
    if(!values.password)
          errors.password = "Can't be empty";

    return errors;
}

const handleSubmit = (values) => {
        console.log(values)
}

  
<Formik
    initialValues={{email: '', password: ''}}                              //state of the form
    onSubmit={handleSubmit}
    validate={validateForm}>
     {
       ({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (    //you can use error object and touched object to determing which field to apply error styles
                <View>
                    <Field
                       name='email'
                       type='email'>
                          {({field}) => (
                                <TextInput 
                                    {...field} 
                                    onChangeText={handleChange('email')} 
                                    onBlur={handleBlur('email')} 
                                  />
                              )}
                      </Field>
                      <Field
                         name='password'
                         type='password'>
                            {({field}) => (
                                  <TextInput
                                      {...field} 
                                      onChangeText={handleChange('password')} 
                                      onBlur={handleBlur('password')} 
                                    />
                               )}
                       </Field>
                       <Pressable onPress={handleSubmit}>
                            <Text> Submit </Text>
                       </Pressable>                  
                   </View>
                    )
                } 
 </Formik>

//---------------------------- useField() --------------------------------------------------
//useField() hook lets you create a field for formik and each field has its own independent event handlers (onChange, onBlur, validate function, etc...)


function Form(){
      return(
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}>
                {
                    ({handleSubmit}) => (
                        <View>
                            <TextField name='email'/>
                            <TextField name='password'/>
                            <LoginButton onPress={handleSubmit}>
                                  'Log In'
                            </LoginButton>                  
                        </View>
                    )
                }
            </Formik>   
        )
}


function TextField({name}) {
    const validate = (value) => value ? '' : "Can't be empty";              //you can have an individual validate function for each field with this hook
    const [field, meta, helpers] = useField({name, validate})

    return(
        <TextInput 
            name='password'                                                  //this prop is ESSENTIAL
            onChangeText={helpers.setValue}
            onBlur={helpers.setTouched}
            placeholder={meta.error ? "Can't be empty" : 'Enter Password'}
        />
    )
}

  








//======================================== REACT NAVIGATION =================================
/* 
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

        This package is similar to react-routers, but it was designed for a react-native app 
*/
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen 
                    name='home'                           //key
                    component={Home}
                    options={{ headerShown: false }}      //removes the default navigation bar for the page
                      />
                 <Stack.Screen name='aboutus' component={AboutUs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


function Home({navigation}) {          //every stack component will have access to the navigation prop which can be used to navigate to different pages
  
    const handleNavigate = () => {
       navigation.navigate('aboutus', { //you can pass any data to another web page like this
         someParams: 'whatever'
       }); 
    }
  
    return(<></>)
  
}


function AboutUs({route}) {
    const navigation = useNavigation();    //you can use the useNavigation() hook to navigate through different pages
    const {someParams} = route.params;     //you can receive data from another web page like this

    const handlePress = () => {
      navigation.navigate('home')
    }

    const handleGoBack = () => {
      navigation.goBack();                //you can go to the previous page with this function
    }
  
    return(<Button></Button>)
  
}














//============================================ REACT NATIVE IMAGE TO BASE 64 ==============================
//npm install react-native-image-base64

import ImgToBase64 from 'react-native-image-base64';

ImgToBase64.getBase64String('file://your_file_url')
  .then(base64String => {
    // Do something with the base64String
  })
  .catch(err => {
    // Handle any errors
  });













//============================================== REACT NATIVE IMAGE PICKER ================================
// you can upload images with this package
// npm install react-native-image-picker

/*     
      IOS
          1) cd ios  ->  pod install 
          2) go to ios/{project name}/info.plist and add the following lines of code

              	<key>NSPhotoLibraryUsageDescription</key>
              	<string>Select image/video from photos</string>
              	<key>NSCameraUsageDescription</key>
              	<string>Capture Image</string>
              	<key>NSCameraUsageDescription</key>
              	<string>Capture Video</string>
              	<key>NSMicrophoneUsageDescription</key>
              	<string>Capture Video</string>
*/

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function App() {

  const handleImages = async () => {
      try{
          const image = await launchImageLibrary({
              mediaType: 'photo',
          });          
      }
      catch(error){
          if(error === 'camera_unavailable')
              Alert.alert('Camera is not available')
          else if(error = 'permission')
              Alert.alert("Please allow app to access images in permissions");
      }
  }

  const handleVideos = async () => {
      try{
          const image = await launchCamera({
              mediaType: 'video',
          });          
      }
      catch(error){
          if(error === 'camera_unavailable')
              Alert.alert('Camera is not available')
          else if(error = 'permission')
              Alert.alert("Please allow app to access images in permissions");
      }
  }

  return (
    <Pressable onPress={handleImages}> 
        'Upload images'
    </Pressable>
    <Pressable onPress={handleVideos}> 
        'Upload videos'
    </Pressable>
  )
}












//================================================= REACT NATIVE DIALOG ============================================
//npm install react-native-dialog
import Dialog from "react-native-dialog";

function App() {
  const [text, setText] = useState('');

  const handleText = (value) => {
      setText(value);
  }
  
  return(
      <Dialog.Container visible={true}>
          <Dialog.Title>'Account delete'</Dialog.Title>
          <Dialog.Description>
            'Do you want to delete this account? You cannot undo this action.'
          </Dialog.Description>
          <Dialog.Input value={text} onChange={handleText}/>            //all TextInput props will work with this component
          <Dialog.Button label="Cancel" />
          <Dialog.Button label="Delete" />
      </Dialog.Container>
  )
}
















//=================================================== REACT NATIVE SVG ===============================================
//  npm install react-native-svg
//  npm install react-native-svg-transformer -D
//  you may need to run the following commands if you are getting an error
//  cd ios
//  pod install

import { SvgXml } from 'react-native-svg';

function App () {
    return(<SvgXml xml={'<svg><svg>'} width='295px' height='16px'/>)
}

export default App;















//=========================================== REACT NATIVE ELEMENT DROPDOWN ====================================
//npm install react-native-element-dropdown --save

import { Dropdown } from 'react-native-element-dropdown';


function SelectRestaurant() {
    const [value, setValue] = useState(null);
    const [focus, setFocus] = useState(false);

    const data = [
        {label: 'McDonalds', value: 'McDonalds'},
        {label: 'Jack in the Box', value: 'Jack in the Box'}
    ];

    useEffect(() => {
        console.log(value);
    }, [value])

    return(
        <Container>                                               //styles for the container surrounding the dropdown
            <Dropdown 
                style={{        
                  width: 220,
                  height: 50,
                  paddingHorizontal: 8,
                  position: 'absolute',
                  right: -5,
                  top: -10,                                      //styles for the dropdown box (you may be better off at using position properties)
                }}                            
  
                data={data}
                labelField="label"
                valueField="value"
  
                iconStyle={{width: 20, height: 20}}                //styles for the arrow

                value={value}
                onChange={item => setValue(item)}

                placeholder={!focus ? 'Select Restaurant' : '...'} 
                placeholderStyle={}
                selectedTextStyle={}                              //styles applied to the item that is selected
                  
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}

                renderLeftIcon={() => (
                    <AntDesign                                    //icon to be displayed on the left
                        style={}
                        color={focus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />            
        </Container>

    )
}















//============================================ REACT NATIVE RADIO BUTTONS =========================================
//npm install react-native-radio-buttons-group


import RadioGroup from 'react-native-radio-buttons-group';

function App() {
    const [category, setCategory] = useState('Funny');          

      const categories = [
        {
            id: 'Funny',                     //must be unique and a non-empty string            
            label: 'Funny',
            value: 'Funny',
            borderColor: 'white',            //color for the border of the dot
            color: 'white',                  //color of the dot in the middle
            labelStyle: {color: 'white'}      // styles for the label
        },
        {
            id: 'Music',
            label: 'Music',
            value: 'Music',
        },
        {
            id: 'Sports',
            label: 'Sports',
            value: 'Sports',
        }
    ]

  
    return(
          <RadioGroup 
              radioButtons={categories} 
              onPress={setCategory}              //setCategory will automatically select the value prop of the radio button
              selectedId={category}
        /> )
}











//============================================= REACT NATIVE CHECKBOX =============================================
// npm install react-native-check-box

/* 
  Keep in mind that this component will only display one checkbox at a time,
  you will need to traverse through an array and return a new checkbox component 
  after every iteration
*/

import CheckBox from 'react-native-check-box';


function Ingredient({label}) {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    }


    return(
        <CheckBox
            style={{height: 20}}                        //style applied to the container of the checkbox
            onClick={handleChecked}                     
            isChecked={checked}
            rightText={'text goes here'}                //prop that will display text on the right side of the checkbox
            rightTextStyle={{color: 'black'}}           //style for the right sided text
            checkedImage={ <Image source={icons['checkmark']} style={{width: 20, height: 20}}/>}    
            unCheckedImage={<Image source={icons['emptymark']} style={{width: 20, height: 20}}/>}
        />
    )
}







//================================================= REACT NATIVE VIDEOS ===============================================
//npm install react-native-video
//npx pod-install     for ios only

import Video from 'react-native-video';
import videoFile from './test-video.mp4';

function App() {
    return(
          <Video
                source={{ uri: 'http://link-to-your-video.mp4'}}                  // the video file
                resizeMode='cover'                                                // contain, cover and stretch
                poster="https://baconmockup.com/300/200/"                         // url of the thumbnail
                posterResizeMode='cover'                                          // contain, cover and stretch
                paused={false}                                                    // make it start    
                style={{width: '200px', aspectRatio: 1}}                         // make sure to use 'aspectRatio' to maintain the aspect ratio of the video
                repeat={true} 
        />
    )
}






//=========================================== REACT NATIVE CREATE THUMBNAIL ===========================
//npm install react-native-create-thumbnail
/* 
    For Android:

          go to android/app/src/debug/AndroidManifest.xml

          <manifest xmlns:android='https//....'> 
              <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
              <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
          </manifest>

      for ios: 

          cd ios
          pod install
*/                  

                  
import { createThumbnail } from "react-native-create-thumbnail";


        async function getThumbnail() {
            try{
                const { path, width, height } = await createThumbnail({
                    url: 'path to video file',
                    timeStamp: 100,
                  })  
                           
            }
            catch(error){
                console.log(error);
            }
 
                 
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

