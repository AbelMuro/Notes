//------------------------------------------- you can use Plyr to help you decorate a video player for you-----------------------------------------------------
//npm install plyr-video
import Plyr from 'plyr-react';



function PlyrWithReact() {
  
      const plyrProps = {
        source: {type: "video", sources: [{src: videoData.url, size: 1080}, 
                                          {src: videoData.url, size: 720},
                                          {src: videoData.url, size: 576},
                                          {src: videoData.url, size: 480},
                                          {src: videoData.url, size: 360},
                                          {src: videoData.url, size: 240}]}, 
        options: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }, 
      }

      return(
            <Plyr {...plyrProps}/>
      )
}







//--------------------------------------------------------------------another way of using plyr---------------------------------------------------
//npm install plyr
import Plyr from 'plyr';




function UsingPlyr() {
   useEffect(() => {
      const video = new Plyr("#video", {
          title
          quality: {default: 576, options: [1080, 720, 576, 480, 360, 240]}
      });
   })
  
  return(
    <>
        <video id="video"> 
            <source src={videoName.mp4} size="1080"/>                         //use the size attribute to specify the quality of the video
            <source src={videoName.mp4} size="720"/>
            <source src={videoName.mp4} size="576"/>
            <source src={videoName.mp4} size="480"/>
            <source src={videoName.mp4} size="360"/>
            <source src={videoName.mp4} size="240"/>
        </video>
    </>
  )
}


