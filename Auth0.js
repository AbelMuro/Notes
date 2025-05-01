		
//========================================================= AuthO =============================================================
/* 
	AuthO is a way to authenticate users in your node.js app
 	npm install express express-openid-connect --save

 	  1) Log in to your AuthO account

  	2) Go to applications section and then create an application, and then click on quickstart

	  3) follow the prompts
       
  	4) In the configure router section, copy and paste the code that is displayed

    		const { auth } = require('express-openid-connect');
    		
    		const config = {							//keep in mind that this code will use the endpoint /login and /logout for auth0
    			  authRequired: false,					        //your node.js app will not be able to use those endpoints
    			  auth0Logout: true,
    			  secret: 'a long, randomly-generated string stored in env',
    			  baseURL: 'http://localhost:4000',
    			  clientID: 'clientID',
    			  issuerBaseURL: 'issuerBaseURL'
    		};
    		
    		app.use(auth(config));


	5) To enable users to log in with a password
     	   Go to Auth0 dashboard -> Applications -> select your application -> settings -> advanced settings ->  Grant types -> Check password

	6) Now you must create a Database that can be used to store the users account info
  	    Go to Auth0 dashboard -> Authentication -> database -> create database (Create a name for the database)
  	    Check email 
       	Check password
  	    Click on create button
     
  	 7) Now you must enable the database to connect to your Auth0 app
             Go to Auth0 dashboard -> Authentication -> database -> select database -> Applications
	               Check the app that you want to connect to this database

 	           Next go to Auth0 Dashboard -> Applications -> Select you application -> Connections
       	         Check the database that you want to use

      	     You may need to change the default connection for the apps in your dashboard to make this work
	           Go to Auth0 Dashboard -> Settings -> Scroll down to API Authorization Settings
             Add the name of the database that you want to set as default in 'Default Directory'


	 8) To enable users to read data and write data into their account you must create a Machine to machine application

  		  Auth0 dashboard -> Applications -> Create Application -> select Machine to Machine -> Select Auth0 Management API -> specify the permissions 

   9) Then go to auth0 dashboard -> API -> select auth0 management api -> Machine to Machine Apps -> check the name of the machine to machine app you just created

 		  You will need the machine to machine app to use the ManagementClient class in the auth sdk

	  10) npm install auth0				//this will install the auth0 sdk  
  */


 		10.1) const { AuthenticationClient, ManagementClient } = require('auth0');

 		10.2) const auth0 = new AuthenticationClient({
			    domain: process.env.AUTH0_DOMAIN,				// make sure to NOT include https://
			    clientId: process.env.AUTH0_CLIENT_ID,			// you can find this in auth0 dashboard -> applications -> select your app -> settings
			    clientSecret: process.env.AUTH0_CLIENT_SECRET,
			});
   
		10.3) const management = new ManagementClient({
			    domain: process.env.MACHINE_DOMAIN,
			    clientId: process.env.MACHINE_CLIENT_ID,			// you must use the client_id and client_secret for the machine to machine app
			    clientSecret: process.env.MACHINE_CLIENT_SECRET
			});
   

	     	10.4) app.post('/register', async (req, res) => {
			    const {email, name, password} = req.body;
			
			    try{
			        const user = await auth0.database.signUp({
			            connection: 'finance-app-authentication-database',		//make sure you use the actual name of the authentication database
			            email,
			            password,
			            user_metadata: {						//any additional data goes here
			                name: name
			            }
			        });
			
			        res.status(200).json(user);
			    }
			    catch(error){
			        res.status(400).json({error: error.message});
			    }
			})


		  10.5) app.post('/login', async (req, res) => {
			    const {email, password} = req.body;
			
			    try{
			        const account = await auth0.oauth.passwordGrant({
			            username: email,
			            password: password,
			            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
			            realm: process.env.AUTH0_REALM						//this is the name of the auth database that you are using
			            scope: 'openid profile email'
	   			});
			        const accessToken = account.data.access_token;
        			const userId = jwt.decode(access_token).sub;					//you must install jsonwebtoken
	   
			        res.cookie('user_id', userId, {							//You should store access-tokens with these http only cookies
			            httpOnly: true,
			            secure: process.env.NODE_ENV === 'production', 
			            sameSite: 'Strict',
				    maxAge: 1000 * 60 * 60
			          });

      				//req.cookies.user_id;								//this is how you access the access_token stored in cookies
			
			        res.status(200).send('Login Successfull');
			    }
			    catch(error){
			        res.status(400).json({error: error.message});
			    }
			});

 		10.6) app.get('/profile', async (req, res) => {
			    const userId = req.cookies.userId;
			
			    try{
			       const profile = await management.users.get({id: userId});
			       res.status(200).json({profile}); 
			    }
			    catch(error){
			        console.log(error);
			        res.status(403).json({error});
			    }
			}) 


   		10.7) app.post('/add_Data', async (req, res) => {		//you can use this method to update existing data or overwrite old data
			    const newData = req.body;
			    const userId = req.cookies.userId;
			
			    try{
			        const user = await management.users.get({id: userId});
			        const userData = user.data || {};
			        const metadata = userData.user_metadata || {};
			        const prevData = metadata.anyData || [];
			
			        await management.users.update({id: userId}, {		
			            user_metadata: {budgets: [...prevData, newData]}
			        });
			        res.status(200).send('profile updated successfully');        
			    }
			    catch(error){
			        res.status(403).send(`${error.message}`);
			    }
			})

