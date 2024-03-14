//React Native is a library used to develop mobile apps on android and iOS
// REMEMBER, react native does NOT use className

/*    
                                          NATIVE COMPONENTS:  
                                          
                          In Android development, we use Kotlin or java to write components
                          In iOS development, we use Swift or Objective-C to write components
                          React Native will create a corresponding component for android and iOS
                          and invoke them by using Native Components (View, Text, Image, ScrollView, TextInput)
                          

                                                INSTALLING REACT NATIVE

                       1) run the command     npx create-expo-app name-of-project

                       2) install the Expo Go app on your phone

                       3) npm start (expo start) will create a QR code. 
                          You will need to scan the QR code with your phones' camera, 
                          and the Expo Go app will automatically open the dev server

                        4) 
                           4.1) To install font files in you react native app, 
                           you will need to first create an assets folder that contains the font files.

                           4.2) Then create a react-native.config.js file in the root directory and copy the following code

                                     module.exports = {
                                        project: {
                                          ios: {},
                                          android: {},
                                        },
                                        assets: ['./assets/fonts'],
                                      };
                            
                            4.3)  Then run the command           npx react-native-asset





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

import {Text, View} from 'react-native';

const App = () => {
    return (
      <View>            
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

