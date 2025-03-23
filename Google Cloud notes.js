//==================================================== GOOGLE CLOUD ============================================================================

/* 
    Google cloud is a service that provides cloud computing. Google has a number of data centers around the globe, 
    these data centers have computers, disk drives and virtual resources that can be utilized by other developers to 
    build a website, software or server for their business or organization.

    In other words, if a small business wants to deploy a server for their company, they can use google cloud
    to host their servers, because google already has the hardware (in their data centers) required to maintain and contain servers
    Developers dont need their own physical hardware or computer to host the server 24/7 when they have google cloud.

*/





//================================================= GOOGLE CLOUD RUN ===========================================================================
/*
    Google cloud run is a service that is used to deploy websites and servers.


//-------------------------- DEPLOY NODE.JS with CLOUD RUN -------------------------------------------------

          
    1) Use Docker to create an image of your node.js app (look at docker notes for more info)

    2) For windows only, download the google cloud CLI (https://cloud.google.com/sdk/docs/install)

        gcloud init

    3) For macOS only, run the following commands to install google cloud CLI

        brew install google-cloud-sdk
        gcloud init

    3) gcloud auth login                                                            //login with google
    
    4) Run the following commands 
    
        docker tag name-of-image gcr.io/PROJECT_ID/name-of-image                    // you can get PROJECT_ID from the google console 
        docker push gcr.io/PROJECT_ID/name-of-image                                 // This will uploade the image to the Google Artifact registry

        //if you have an issue with authorization, run the following command
        gcloud auth configure-docker

    5) Then go to 'Google Cloud Run' and then click on Deploy Container (click on 'service' in the dropdown)

    6) Select Docker Hub and Artifact Registry
       In the 'Container Image Url', click on select, and find the image that you uploaded on the Artifact Registry
       In 'Containers, Volumes, Networking, Security', select 'Variables & Secrets' and put your env variables there
       
    7) Click on Create
       
*/ 











//=================================================== GOOGLE LOGIN ====================================================================

/* 
    You will need to create a client Id for the google sign-in process

    1) Go to google cloud and create a new project

    2) Then go to API & Services

    3) Go to OAuth consent screen and click on publish
    
    4) Then go to Credentials and create a new 0Auth client-id and save it

        make sure you add the front end app's url to the authorized origins of the client-id

    5) npm install @react-oauth/google
    

*/



//=================================== @react-oauth/google ===================================================

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function App() {
  
  return(
     <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
        <GoogleLoginButton/>
     </GoogleOAuthProvider>
  )
}


function GoogleLoginButton() {
    const login = useGoogleLogin({
        onSuccess: async (token) => {
             console.log(token)
        },
        onError: async (error) => {
            console.log(error)
        },
        onNonOAuthError: (error) => {
            console.log('Typically used when the user closes the popup and decides not to log in with google')
        },
    })

    const handleClick = () => {
        login();
    }

    return(
            <button onClick={handleClick}>
                Google
            </button>
    )
}














  

