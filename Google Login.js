/* 
    You will need to create a client Id for the google sign-in process

    1) Go to google cloud and create a new project

    2) Then go to API & Services

    3) Go to OAuth consent screen and click on publish
    
    4) Then go to Credentials and create a new 0Auth client-id and save it

        make sure you add the front end app's url to the authorized origins of the client-id

    5) ?
    

*/




//================================== react google login ===============================================


function GoogleLogin() {
       const handleCredentialResponse = (res) => {
        console.log(res.credential);
    }

    const triggerGoogleSignIn = () => { 
        google.accounts.id.prompt((notification) => { 
            if(notification.isNotDisplayed()) 
                console.log(notification.getNotDisplayedReason()); 
            else if(notification.isSkippedMoment()) 
                console.log(notification.getSkippedReason()); 
            else if(notification.isDismissedMoment()) 
                console.log(notification.getDismissedReason())
            }); 
    };


    useEffect(() => {
        google.accounts.id.initialize({ 
            client_id: process.env.CLIENT_ID, 
            callback: handleCredentialResponse, 
        });
    }, [])

  return(
      <button onClick={triggerGoogleSignIn}> 
            'Google Sign in'
      </button>
  )
}

















//=================================== @react-oauth/google ===================================================

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {

  const handleSuccess = (response) => {
    
  }

  const handleError = (error) => {
    
  }
  
  return(
     <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} className={'googleClass'}/>
     </GoogleOAuthProvider>
  )
}
