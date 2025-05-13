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
