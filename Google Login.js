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
        }
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

