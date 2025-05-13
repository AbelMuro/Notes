//============================================== REACT NATIVE IMAGE PICKER ================================
// you can upload images with this package
// npm install react-native-image-picker

/*     
      IOS
          1) cd ios  ->  pod install 
          2) go to ios/{project name}/info.plist and add the following lines of code AT THE TOP

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
