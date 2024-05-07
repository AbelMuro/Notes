/* 

            React Native Reanimation

            1) npm install react-native-reanimated 

            2) configure babel.config.js

                  module.exports = {
                      presets: ['module:@react-native/babel-preset'],
                      plugins: ['react-native-reanimated/plugin'],
                  };

            3) for ios only

                cd ios
                pod install

*/







//==================================================== ANIMATED component ====================================================
//Animated is an component that has access to ALL the react-native components (View, FlatList, Text, etc...);

import Animated, {FadeIn, FadeOut, FadeInLeft, FadeInRight} from 'react-native-reanimated';

function App() {
    return(
        <Animated.View
          entering={FadeIn}                                //initial animations that occur when the component is first rendered
          exiting={FadeOut}                                //animations that occur when the componets is unmounted
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'violet',
          }}
        />
    )
}

export default App;










//================================================== SHARED VALUE =========================================================
// useSharedValue() creates a variable that represents a css property, this variable can be changed to create an animation
// You must use an animating function (withTiming, withSpring, withDecay) to actually create the animation
// Easing is an object that specifies the timing function for the animation

import Animated, { useSharedValue, WitTiming, Easing } from 'react-native-reanimated';

function App() {
    const width = useSharedValue(0);              // 0 is the initial value for the width
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(open){
            width.value = withTiming(500, {           // width will have its value changed to 100, an linear animation will occur
                duration: 200,                          // in milliseconds
                easing: Easing.linear
            });
        }
        else{
            width.value = withTiming(0, {           // width will have its value changed to 100, an linear animation will occur
                duration: 200,                          // in milliseconds
                easing: Easing.linear
            });
        }
    }, [open])

  
  return (
      <Animated.Text
        onPress={handleShared}
        style={{
          width,
          height: '100px'
        }}>
         Hello world
      </Animated.Text>
    )
}













