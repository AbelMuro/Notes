//====================================================== API ROUTES =============================================================
/* 
     You can create an API within your Next.js app.

     You will need to create an 'api' folder inside your 'pages' folder. Every file within the api folder will be a route of your API.
     
         The naming convention is: 
             /pages/api         
             /pages/api/login.js                  folder with the name api will use its files as the endpoints
             /pages/api/register.js
    
            Rules to know about API Routes
        
    1)  Do not fetch an API route from getStaticProps() or getStaticPaths()
    2)  API Routes do not specify CORS headers, meaning they are same-origin only by default 
    3)  You can use API routes to securely communicate with a third party api
         
*/



//  ---------------- /pages/api/login.js --------------------
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function handler(req, res) {         
    // you can treat this route as if it was a node.js route
    // To make a fetch request to this route, you must use the name of the file as the destination in the fetch request

    res.status(200).json({token: 1});
}



// ------------------ /pages/index.js -------------------

export default function Home() {
    const handleClick = () => {
        fetch('/login', {
            method: 'POST'
            body: JSON.stringify({email, password});
            credentials: 'include'
        })             
    }

    return(
        <button onClick="handleClick">
              'Click Here'
        </button>
    )
}











//---------------------------------------------DYNAMIC API ROUTES ---------------------------------------------
/* 
        API Routes can be dynamic, and follow similar convention to dynamic routes
        The syntax for dynamic api routes is below...

        /pages/api[endpoint].js                    //it doesnt have to be endpoint
*/       

// ---------------- /pages/api/[endpoint].js ----------------

export default function handler(req, res) {
  const { endpoint } = req.query;
  console.log(endpoint);                                        // if the URL is /123, then the endpoint = 123
  res.status(200).send(endpoint);
}





// ---------------- /pages/index.js ----------------

export default function Home() {

    const handleClick = () => {
        fetch('/anythingGoesHere', {                            //this will make a fetch to the api endpoint in /pages/api/[endpoint].js
            method: 'POST'
            body: JSON.stringify({data: 'anything'});
        })             
    }

    return(
        <button onClick={handleClick}> Click Here</button>
    )
}






