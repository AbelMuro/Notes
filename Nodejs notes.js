//Node.js is an open source server environment that allows you to run javascript outside of a browser
//Node.js uses asynchronous programming

// Below is how Node.js handles file requests

// 1) sends the task to the computers file system
// 2) ready to handle the next request
// 3) when the file system has opened and read the file, the server returns the content to the client 

// Node.js eliminates the waiting and simply continues to the next request

// modules are like javascript libraries, a set of pre-built functions that you can use.
// typically, you will use the require() function to access the functions in the modules





/* 
    How to create a server with node.js (keep in mind that some localhosts may not work in your browser)

	1) Create a folder structure like this 

   		--node_modules
     		--src
       		   --Config					//any technology that requires configuration goes here
	           --Routes
	    		--POST
       			     /add-data.js
       			--GET
	  		     /get-data.js
	  		--PUT
     			    /update-data.js
	           /index.js
	        /.gitignore
	        /package.json

	2) npm init -y

 		in your package.json, create a script like this..

   			"start" : "node index.js"

 	3) npm install express 

  	4) Copy the following lines of code to the index.js

		const express = require('express');
		const app = express();                                        //creating an object that represents the main app
		const port = 4000;

		app.get('/', (req, res) => {
		    res.send('Hello World')
		})
		
		app.listen(port, (error) => {
		    if(error){
		        console.log(error, 'error occured');
		        return;
		    }
		    console.log(`Server is running on port ${port}`);
		});                                         

	5) run the command
 		
   		npm start

 	6) The server should be running on localhost:4000 and will display a Hello World Message

  	7) If you want browsers of different origins to make fetch requests to the server, you must implement CORS

   	8) Now create a front end app that you can use to interact with the server

    	9) You will need to use fetch requests to send requests and receive respponses from the server

		const response = await fetch('http://localhost:4000/add-data', {
	            method: 'POST',
	            headers: {
	                "Content-Type": "application/json"
	            },
	            body: JSON.stringify({data: 'my data'})
	        });
*/






/* 
		HOW TO DEPLOY YOUR NODE.JS APP WITH HEROKU CLI

	  		1) Install heroku cli    
	
	      		2) Go to your node.js project terminal and run the following commands below
	
	   			heroku login				//this command will open up the browser and enable you login
	 			heroku create name-of-app		//this command will generate a url of your deployed node.js app
				heroku git:remote -a name-of-app 	//this command will initialize the git repository for heroku
	   			git push heroku main			//this will push all the changes in your project to the git repo in heroku	
	      			heroku config:set VAR1=value1 VAR2=value2 VAR3=value3   //this will set the env variables if your app uses them
	
			3) Make sure that you are not hard setting the port number, heroku uses an env variable to set the port number
	
	  			app.listen(process.env.PORT || port, (error) => {
				    if(error){
				        console.log(error, 'error occured');
				        return;
				    }
				    console.log(`Server is running on port ${port}`);
				}); 
	
	   		4) KEEP IN MIND, when you make changes to your project, 
	     		   you will need to commit and push those changes to the remote repository on github 
		  	   in order to reflect those changes on the deployed node.js app
			   Then you can run the following command
	
	      			git push heroku main


   

		HOW TO DEPLOY YOUR NODE.JS APP WITH HEROKU/GITHUB

  			1) Go to your apps page in heroku and click on New button to create a new app

     			2) Type in a name for the app and click on create

 			3) Open the app and go to Deploy tab -> Deployment method -> Connect with Github and find the github repo for your project

    			4) Enable Automatic deploys and click on deploy branch

       			5) On the top right corner, click on Open App

   			6) KEEP IN MIND, make sure your listen route in node.js looks like the following

			      app.listen(process.env.PORT || port, () => {
				    console.log(`Server is running on this port ${port}`);
			       });     
			7) To add env variables, go to Settings -> Config vars and add your env variables there
*/




/* 
	How to deploy node.js app with NETLIFY

 	1) create a functions folder

  		node_modules
    		src
      		functions
			/app.js
		package.json
  		...

    	2) in the app.js file...

	     	const serverless = require('serverless-http'); 
		const app = require('../src/index.js'); 		//make sure you export the app module from the index.js
  		const connectDB = require('../src/Database/db.js');	//if you are using mongoose
		
		const handler = serverless(app);  		       //you can use     module.exports.handler = handler       as well
		module.exports.handler = async (e, context) => {	//you can use a callback to connect to databases or some other async logic that must be implemented before every request
  		    await connectDB();					// you will need to call the connectDB() everytime there is a request made by the front end
		    const result = await handler(e, context);
		    return result;
		};

  	3) Then create a netlify.toml file

		[build]
		    functions = "functions"
		
		[[redirects]] 
		    from = "/*" 
		    to = "/.netlify/functions/app/:splat" 
		    status = 200 
		    force = true

  		[functions]														//use this if your app uses files to load
		    included_files = ["src/Config/MongoDB/Models/PemFiles/cert.pem", "src/Config/MongoDB/Models/PemFiles/key.pem"]
		

      	4) npm install serverless-http
       
       		...if you haven't already, use npm install netlify-cli -g

  	5) In your package.json file, use script
   
     		"scripts": {
   			"build": "netlify deploy --prod"
      		}
	
	6) In your .gitignore file...

 		.netlify

	7) npm run build 
 		the command above will ask you a few questions, make sure the publish directory is set to .
   		it will then generate a url that you can use to make fetch requests

*/


//=============================================================== EXPRESS WEB FRAMEWORK =================================================================
//middleware, a function that does something between the server receiving a request and sending a response 

 
const express = require('express');
const cookieParser = require('cookie-parser');                //npm install cookie-parser, this will parse all cookies that are send along with each request
const multer = require('multer');			      //npm install multer, you can use this to parse incoming files from the front-end
const app = express();                                        //creating an object that represents the main app
const port = 5000;
const path = require('path');
const filePath = path.join(__dirname, 'folder/index.html');	//you should always use path.resolve() to load files in a node.js app with the FS module (when deploying the node.js app, some web host may need you to specify the location of the files, like netlify.toml)


app.use(express.json());					//this will parse all incoming json data, you will need this if your server expects json data from the front-end
app.use(express.urlencoded({extended: true}));			//this will parse all incoming form data, you will need this if your server expects form data from the front-end 		(<form action="/submit-form" method="POST"></form>)
app.use(cookieParser());


// 'get' requests
app.get('/account', (req, res) => {                             // .get() is for handleling 'get' requests from the client
    const someObject = {data: 'hello world'}
    res.status(200).json(someObject);            		// you must use json to format any JS into json before you send a response                     
})

// 'post' request
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    res.status.send('login info is correct')
})

// 'put' request - This is how you receive files in the back-end (look at the Fetch API notes on how to send files from the front-end)
const storage = multer.memoryStorage();			       // Set up multer for file handling
const upload = multer({ storage: storage}); 		       // look at the 'multer module' notes WAY BELOW for more info on the different ways of using this module

app.put('/update', upload.single('image'), (req, res) => {      // in upload.single('image'), it will look for the property 'image' in the FormData object that you created on the front-end
    const {username, email, password} = req.body;	
    const image = req.file;					//this is how you receieve files from the front end ( look at the fetch api notes for more info on how to send files from the front-end to the back-end  )
	
    res.status(200).send('data has been received')
})

// 'delete' request
app.delete('/account/:id/:type', (req, res) => {
    //you can use formidable module to get user-input from forms
    const id = req.params.id;						//you can use :id to send data to an endpoint like this http://localhost:4000/acount/123456
    const type = req.params.type;
    res.send('data has been deleted')
})

// app.use will bind a middleware for the path '/contantPage'
app.use('/contactPage', () => {                              // .use() is a function that will 'use' the function on the second argument
})                                                          // everytime the user opens an url with /contactPage, EXAMPLE: www.example.com/contactPage

//listens to port 5000
app.listen(port, (error) => {
	if(error)
	    console.log('Internal Error')
	else
	    console.log(`Server is running on port ${port}`)
});                                           






//============================================================ DYNAMICALLY DISPLAYING MESSAGES ON NODE.JS =================================================================
//you can send a dynamic html file to the browser to display messages about route access and database updates

const express = require('express');
const app = express();     
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

//for http only
	const server = http.createServer(app);
	const io = new Server(server);

//for https only
	const options = {
	    key: fs.readFileSync('key.pem'),
	    cert: fs.readFileSync('cert.pem'),
	}
	const server = https.createServer(options);
	const io = new Server(server);


app.use((req, res, next) => {
    req.io = io;
    next();
})


app.get('/', () => {
    const filePath = path.join(__dirname, 'index.html');       //you can send an index.html file to the browser when you access the server's url
    res.sendFile(filePath);
})



/* 
	--------------------------------index.html


	 <!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Online Chess Server</title>
	</head>
	<body>
	    <div id="messages"></div>
	    <script src="/socket.io/socket.io.js"></script>
	    <script>
	        const socket = io();
	        const messagesDiv = document.getElementById('messages');
	
	        // Listen for messages from the server
	        socket.on('message', (msg) => {
	            const message = document.createElement('p');
	            message.textContent = msg;
	            messagesDiv.appendChild(message);
	        });
	    </script>
	</body>
	</html>




*/




	
//============================================================== CORS ======================================================================
/* 
	CORS: Cross origin resource sharing

 	CORS is basically a way for servers to allow browsers of different origins to load resources
   	If the browser is making a get-request from a different origin, the you will need cors
    
	//npm install cors

    	const cors = require('cors');
     	const corsOptions = {
        	origin: 'http://example.com',						//Access-Control-Allow-Origin
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],			//Access-Control-Allow-Headers
		credentials: true,
		maxAge: 3600,
		optionsSuccessStatus: 200
	}
	app.use(cors(corsOptions));							// Enabling cors for all routes using app.use()

	app.get('/', cors(corsOptions), (req, res) => { 				// Alternatively, we can enable cors for specific routes using app.get(), app.post(), etc.
 
	});
*/



//======================================================== HTTP only cookies ==============================================================
//Cookies are a type of storage that is send with every request and response
//HTTP-only cookies can only be viewed on the server
// KEEP IN MIND that every fetch request that sends cookies MUST have credentials: 'include'
// this includes the fetch requests that sets the cookies in the route as well as the requests that accesses the cookie in the route
// you need to make sure that the user has third-party cookies enabled and cross-site tracking enabled in their browser
// usually, its best if the front end has some timer that will automatically expire the http-only cookie and log the user out.

fetch('/login', {
	method: 'POST',
	credentials: 'include'
})

fetch('/account', {
	method: 'GET',
	credentials: 'include'
})

app.post('/login', (req, res) => {
    	const {email, password} = req.body;
	const access_token = 'access token';

	res.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: true,      					//http only cookies will only be used throught https 
            sameSite: 'Strict or None',				//Strict only allows sites from the same orgins to make requests, None allows cross-site requests
            maxAge: 1000 * 60 * 60,				//you can have an expiration date for these cookies, but for auth, you shouldnt use this, instead let the front end handle the expiration for these cookies		
        })
});

app.get('/account', (req, res) => {
	const accessToken = req.cookies.accessToken;		//accessing the http only cookie

	if(!accessToken)
		return res.status(401).send('User does not have third-party cookies enabled or cross-site tracking enabled');
	
});










//======================================================== ENV variables ====================================================
/* 

	1) npm install dotenv

	2) const { config } = require('dotenv');
      	   config();							//this should be called BEFORE using the env variables
	  
	3) process.env.apiKey can only be used in the SAME file where you called config()

*/









//================================================= CRYPTOGRAPHY ============================================================
/* 
	Cryptographic is the field of encryption, decryption, hashing, and digital signatures
 	More specifically, hashing is the process of obscuring a sequence of characters with a different set of characters
  	A Password will be more secure if it has been hashed with a different set of characters

	In Node.js, whenever you have authentication, its crucial to hash the passwords of the users account
	You can use the BCRYPTJS and CRYPTO modules to do just that

 	key concepts:

  	Hexadecimal string: a way of representing binary data using letters and numbers
   		Binary: 01000101 0100111010 01001010 10011001 
     		Hex: 48 65 62 3F
       		English: Hello

*/


	//HASH FUNCTIONS: a function that takes input data and generates a fixed-sized string of characters
			const message = 'Hello World'

    			const hashedMessage = crypto.createHash('sha256').update(message).digest('hex');
				// 1) we create a hash object (instance of the crypto.Hash() class) and specify the 'sha256' hashing algorithm
    				// 2) we update the hash object with data we want to hash
				// 3) we finalize the hashing process by converting the hash object into a HEX string
				// 4) the message 'Hello World' will be displayed in Hexadecimal format after it has been hashed

	//BUFFER: a temporary location in memory that has raw binary data
			
			const token = crypto.randomBytes(32).toString('hex');
				// 1) we create a buffer that has 32 random bytes
				// 2) We then convert the raw binary data into a HEX string


	//SALTS: a random generated value that can be added to the data to ensure the hashed value is unique
			const password = 'password123'

			const salt = await bcrypt.genSalt(10);
			const password = await bcrypt.hash(password, salt);
				// 1) we create a salt of random generated values
				// 2) the password is then hashed with the generated salt to ensure security and uniqueness.




//================================================== JSON WEB TOKENS ==========================================================
/* 
	json web tokens are a popular method for implementing authentication in a node.js/react.js app
 	The example below will use mongoDB and json web tokens to implement authentication
*/

// 1)   npm install mongoose bcryptjs jsonwebtoken crypto

	// bcrypt is a module that we can use to hash and encrypt a password for more security
	// jsonwebtoken

	const mongoose = require('mongoose');
	const {Schema} = require('mongoose');
	const bcrypt = require('bcryptjs');
	
	const userSchema = new Schema({
	    email: {type: String, required: true, unique: true},    			//remember to set the unique property here to true
	    password: {type: String, required: true},
	    resetPasswordToken: {type: String},			   			//you will need this property for reseting passwords
    	    resetPasswordExpires: {type: Date}
	});
	
	userSchema.pre('save', async function (next) {              			//pre() is a middleware that will execute a function that will hash a password BEFORE the save method is called
	    if(!this.isModified('password'))                        		        //if the password has NOT been modified
	        return next();                                      			//will execute the next middleware, if there are no more middlewares, then save() will be called
	
	    const salt = await bcrypt.genSalt(10);                  			//generates a salt 
	    this.password = await bcrypt.hash(this.password, salt); 			//we hash the password
	    next();
	});
	
	userSchema.methods.matchPassword = async function (enteredPassword) { 		//this will check the user's password to see if its correct
	    return await bcrypt.compare(enteredPassword, this.password)
	};

	userSchema.methods.createPasswordResetToken = function() {       
	    const resetToken = crypto.randomBytes(32).toString('hex'); 			// we generate 32 bytes of random binary data and return it as a 'buffer', then the buffer is converted into a HEX string
	    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');  // We hash the token with the sha256 algorithm and convert the token into a HEX string
	    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;                	// Token expires in 10 minutes
	    return resetToken;
	}  

	const User = mongoose.model('user', userSchema, 'accounts')        		//create a model that will be used to create documents
	
	module.exports = {
	    User
	}




// ------------------------------2) 
	const jwt = require('jsonwebtoken');
	const crypto = require('crypto');
	const bcrypt = require('bcryptjs');
	const {User} = require('../../Models/Models.js');


	router.post('/register', async (req, res) => {
	    const {email, password} = req.body;
	
	    try{
	        const user = new User({email, password});
	        const userData = await user.save();		//userData is a document that contains _id and other meta data about the users' account
	
	        res.status(200).send('User has created account');
	    }
	    catch(error){
	        const message = error.message;
	        if(message.includes('E11000 duplicate key error collection:')){
			if(message.includes('email'))
			    res.status(401).send('Email already exists');
			else if(message.includes('username'))
			     res.status(401).send('Username already exists')
		}
	            
	        else
	            res.status(500).send(message);
	    }
	});


	router.post('/login', async (req, res) => {
	    const {email, password} = req.body;
	    const JWT_SECRET = process.env.JWT_SECRET;    				//you will need to create your own secret key here
	
	    try{
	        const user = await User.findOne({email});				//we look for the user based on their email
	
	        if(!user || !(await user.matchPassword(password))){			//we check if the email exists and/or if their password is correct
	            res.status(401).send('Invalid Credentials');
	            return;
	        }
	            
	        const token = jwt.sign({id: user._id, email: email}, JWT_SECRET, {expiresIn: '1h'}); //create the json web token (you must add the data manually to the json web token)
	
	        res.cookie('accessToken', token, {					//using http only cookies to store the json web token
	            httpOnly: true,
	            secure: true,
	            sameSite: 'None',
	            maxAge: 1000 * 60 * 60
	        });
	
	        res.status(200).send('User is logged in');
	    }
	    catch(error){
	        const message = error.message;
	        res.status(500).send(message);
	    }
	});


	router.get('/account', async (req, res) => {
	    const token = req.cookies.accessToken;			//access the json web token
	    const JWT_SECRET = process.env.JWT_SECRET;
	
	    if(!token){
	        res.status(401).send('User has been logged out');
	        return;
	    }
	
	    try{
	        const decoded = jwt.verify(token, JWT_SECRET);		//decode the json web token
	        const email = decoded.email;				//access account info through the decoded token
	        const user = await User.findOne({email});
	        res.status(200).json(user);
	    }
	    catch(error){
	        const message = error.message;
	        res.status(500).send(message);
	    }
	
	
	})


	app.post('forgot_password', (req, res) => {
	    const {email} = req.body;
	
	    try{
	        const user = await User.findOne({email});				//we look for the user's account with their email
	
	        if(!user){
	            res.status(404).send('Email is not registered');
	            return;
	        }
	
	        const resetToken = user.createPasswordResetToken();			//we call this method that will generate a random reset token, will hash the reset token and store it into the users account
	        await user.save({ validateBeforeSave: false});			
	        const resetPasswordLink = `http://localhost:3000/reset/${resetToken}`; //we create a link that has the hashed token in the url (in your react app, you will need to retrieve the token with the useLocation() hook)
	
	        const transporter = nodemailer.createTransport({			//nodemailer is a module we can use to send an email to the user
	            service: 'Gmail',
	            auth: {
	                user: process.env.email,
	                pass: process.env.app_password                          	//you must create an app password for an app in your gmail acount
	            }
	        })
	
	        const mailOptions = {
	            from: process.env.email,
	            to: email,
	            subject: 'Reset Link for Note-taking app',
	            text: `Please click on the following link to reset your password ${resetPasswordLink}`    //you can either use html or text here
	        }
	
	        transporter.sendMail(mailOptions, (error, info) => {
	            if(error){
	                res.status(401).send(error.message);
	                return;
	            }
	            
	            res.status(200).send('Email sent successfully');
	        })
	
	    }
	    catch(error){
	        const message = error.message;
	        res.status(500).send(message);
	    }
	});


	app.post('/reset_password', () => {
		    const {token, password} = req.body;
		
		    try{
		        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');	//we hash the token
		        const user = await User.findOne({
		            resetPasswordToken: hashedToken,
		            resetPasswordExpires: {$gt: Date.now()}	//$gt means greater than        //we check the current time and compare it to the time the hashedToken was initially placed in the users account
		        });
		
		        if(!user){
		            res.status(400).send('Token is invalid or has expired');			
		            return;
		        }
		        user.password = password;
		        user.resetPasswordToken = null;
		        user.resetPasswordExpires = null;
		        await user.save();
			    
		        res.status(200).send('Password changed successfully');
		    }
		    catch(error){
		        const message = error.message;
		        res.status(500).send(message);
		    }
	})
	

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
	    Go to Auth0 dashboard -> Authentication -> database -> create database
            Create a name for the database
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


  	




//=========================================================== MODULES ==================================================================

	//MODULES are separate files with functions and classes that can be used(imported) in other files in node.js

 	1)   //addBill.js

		const express = require('express');
		const router = express.Router();
		
		router.post('/add_bill', async (req, res) => {
		    //router logic goes here
		});

		module.exports = router;			//module.exports = {router, ...}

 	2)   //server.js

	 	const addBill = require('./addBill.js');		
	  	const express = require('express');
		const app = express();
	
		app.use(addBill);





//======================================================== MULTER MODULE ======================================

//SENDING FILES TO AN ENDPOINT IN NODE.JS


	1) The example below will send an image from an <input type='file'> to the server, the server will then get the file and store it in a folder './uploads'
 
		// BACK-END
		
			//npm install multer
			const multer = require('multer')
		 
			const storage = multer.diskStorage({
			    destination: './uploads/',
			    filename: (req, file, cb) => {
			        cb(null, `${Date.now()}-${file.originalname}`)				//second argument is the name of the file being uploaded to the ./uploads folder in your node.js app
			    }
			});
			
			const upload = multer({ storage });
		
			app.post('/add_transaction', upload.single('image') ,async (req, res) => {	
        		    if(req.file){									//you can check if the user uploaded a file or not, mutlers3 will still work if the user never uploaded a file
			    	const fileData = req.file;
	      		    	const imageURL = req.file.location;
	      		     }
       			    const formData = req.body;	
			})
		
		
		 // FRONT-END
		 
			const image = document.querySelector('input[type='file']').files[0];
			const formData = new FormData();						//you MUST use a FormData() to store all data, and send it to the server
		        formData.append('image', image);
		
		        const response = await fetch('http://localhost:4000/add_transaction', {		//file will be uploaded automatically
		            method: 'POST',
		            body: formData,
		        });


	//2) The example below will send an image from an <input type='file'> to the server, the server will then upload the image to an s3 bucket

		//BACK END
  
	 		//npm install @aws-sdk/client-s3
			//npm install multer
	  		//npm install aws-sdk
	    
			const s3 = new aws.S3({
			    region: 'us-west-1',
			    accessKeyId: process.env.ACCESS_KEY_ID,
			    secretAccessKey: process.env.SECRET_ACCESS_KEY,
			    signatureVersion: process.env.SIGNATURE_VERSION,
			});
			
			const upload = multer({
			    storage: mutlerS3({
			        s3: s3,
			        bucket: 'personal-finance-app',
			        key: (req, file, cb) => {
			            cb(null, `${Date.now()}-${file.originalname}`);
			        }
			    })
			});
	
	  		app.post('/add_transaction', upload.single('image'), async (req, res) => {		//image upload happens automatically
     			    if(req.file)									//you can check if the user uploaded a file or not
	    		    	const imageURL = req.file.location;
			})
	
		//FRONT END
  
	 		const image = document.querySelector("input[type='file']").files[0];
			const formData = new FormData();							//you MUST use a FormData() to store all data, and send it to the server
			formData.append('image', image);
			
			const response = await fetch('http://localhost:4000/add_transaction', {			//file will be uploaded automatically
				method: 'POST',
			        body: formData,
			});







//======================================================= WS MODULE =========================================================
//you can create a WEBSOCKET in your node.js app that creates a connection between the front-end and the back-end
//typically this connection is used to automatically send data between front-end and back-end when theres a changes in the
//database or an event that is triggered in the front end



//------------------------------------------BACK END CODE
        const WebSocket = require('ws');
        
         //PRODUCTION ONLY!
        const server = https.createServer({                                // this is for production only
            cert: fs.readFileSync('/path/to/ssl/cert.pem'),                // to generate these files, you need to install openSSL (https://slproweb.com/products/Win32OpenSSL.html)
            key: fs.readFileSync('/path/to/ssl/key.pem'),                  // you will also need to download the openssl.cnf file (https://github.com/openssl/openssl/blob/master/apps/openssl.cnf), store it in the same installation folder as Openssl
        });                                                                // then run the following commands     
                                                                           // 1) openssl req -config C:/Users/abelm/openSSL/openssl.cnf -new -x509 -keyout key.pem -out cert.pem                                                                          
									   // 2) openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem   (the files will be generated in the same directory specified in the command line)   
                                        //development      //production
        const wss = new WebSocket.Server({port: 8000}  or   {server});     //second, you create the web socket object (make sure the port is the same for the back-end and the front-end)

        wss.on('connection', ws => {                                        //Third, you establish the connection between the back end and the front end
            console.log('Front-end and back-end are connected');
        
            ws.send('data goes here')                                     //This is where you send the changes to the front-end (YOU have to call this function when theres a change somewhere)
        
            ws.on('close', () => {                                        //Event listener that is triggered when the front-end is disconnected from the back-end
                console.log('Client disconnected')
            })
        })


//--------------------------------------------FRONT END CODE

        const WEBSOCKET_URL = 'ws://localhost:8000'  or   'wss//my-back-end-domain.com'        //first string is for development, the second is for production

        const onmessageFunction = (event) => {
            const change = JSON.parse(event.data);
            console.log(change);			           	//data received from the back-end
        }

        const connectToWebSocket = (onmessageFunction) => {         
            const socket = new WebSocket(WEBSOCKET_URL);            	//make sure the port is the same on the web socket in the back-end
        
            socket.onopen = () => {                                        //These are all event listeners
                console.log('Connected to WebSocket server');
            };
        
            socket.onmessage = onmessageFunction;                          // Update your front-end application with the received change
        
            socket.onclose = () => {
                console.log('Disconnected from WebSocket server');
            };
        
            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }






//=========================================================URL MODULE=========================================================
var url = require('url');                                       //used for formating the url of the website
    var adr = 'http://localhost:8080/default.htm?year=2017&month=february';  //normally you would use 'req.url' to get the url
    var q = url.parse(adr, true)                                //parsing the url into an object
    q.host;                                                     //returns 'localhost:8080' (domain name)
    q.pathname;                                                 //returns 'default.htm'
    q.search;                                                   //returns '?year=2017&month=february'
    q.query;                                                    //returns an object { year: 2017, month: february}


    let filename = q.pathname;                                              
    formattedUrl = formattedUrl.year + " " + formattedUrl.month; 







//=========================================================FILE SYSTEM MODULE=========================================================
var fs = require("fs");
    //updating files (be careful with writeFile())
    fs.appendFile("./nameOfFile.html", 'Hello World!', function (err) { //appending content "hello world "to the end of a file, if the file doesnt exist, then a new one will be created 
        if(err) throw err;
    })
    fs.writeFile("./nameOfFile.html", "hello World", function (err) { //replacing a file with the same name as the first argument and appending 'hello world' at the end of the new file, 
        if(err) throw err;                                            //if the file doesnt exist, then a new one will be created
    })
    //reading files
    fs.readFile('./nameOfFile.html', function(err, data) {      //reads a file
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write(data);                                        //data is the actual html that you want to send to the client
        return res.end();                                       //should return the res.end()
    })
    fs.open("./nameOfFile.html", function(err, file) {          //opening a file, if the file doesnt exist, then a new one will be created   (you can add a second argument 'w', it stands for 'writing')
        if (err) throw err;
    })
    //deleting files
    fs.unlink("./nameOfFile.html", function(err){               //deleting a file
        if(err) throw err;
    })
    //renaming files
    fs.rename("./nameOfFile.html", "./newFileName.html", function(err) { //renaming an existing file
        if(err) throw err;
    })
    var rs = fs.createReadStream("./demofile.txt");             //createReadStream fires an event everytime the file opens or closes
    rs.on("open", function() {
        //do something here
    })





//============================================================== EVENTS MODULE=============================================================================
//this module handles all types of events that are received from the client 

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', function() {          //event handler for 'scream' events
    //do something here
})

eventEmitter.emit('scream')                     //triggerring the event 






//============================================================= FORMIDABLE MODULE =========================================================================
//this module was designed to read form data

var formidable = require('formidable');                                     //npm install formidable

    //getting files from client
    http.createServer(function (req, res) {
        if(req.url == "/fileupload"){
            var form = new formidable.IncomingForm();                       //creating a form object to read form data
            form.parse(req, function (err, fields, files) {                 //'files' object is for files uploaded by the client, and 'fields' object are for user input sent by the client
                var oldpath = files.filetoupload.filepath;                  //getting the name of the file that was uploaded
                var newpath = "C:/Users/abelm/" + files.filetoupload.originalFilename; //defining a directory for the file to be stored onto local pc
                fs.rename(oldpath, newpath, function (err) {                //using fs.rename() to place the uploaded file onto the local machine
                    if(err) throw err;
                    res.write('File has been uploaded and moved to a different directory!');
                    res.end();
                })
            })
        }
        else{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();        
        }
    }).listen(8080);      
    

    //getting user-input from client
    http.createServer(function (req, res) {
        if(req.url == "/sendInput"){
            var form = new formidable.IncomingForm();                       //creating a form object to read form data                
            form.parse(req, function (err, fields, files) {                 //'files' object is for files uploaded by the client, and 'fields' object are for user input sent by the client
                res.write("you entered" + fields.userInput)                 //using the name property of the input element to retrieve user input   
                return res.end();
            })
        }
        else{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write('<form action="sendInput" method="post">');
            res.write('<input type="text" name="userInput">');              //this works for all inputs, as long as the input has a name attribute
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();        
        }

    })

//============================================================= EMAIL MODULE ===========================================================

//you can use this mail module to send emails from the server
var nodemailer = require('nodemailer');


http.createServer(function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',                       //keep in mind that google doesnt support less secure apps using its service
        auth: {                                 //so you have to use an app password to make this work
            user: "abelmuro93@gmail.com",       
            pass: "vewyvdjgpbdckqak"                        
        }
    })

    var mailOptions = {                         
        from: 'abelmuro93@gmail.com',          
        to: 'abelmuro93@gmail.com, anotherEmail@gmail.com',
        subject: 'Subject',
        text: 'Content'                                             // keep in mind that you can remove 'text:' and use 'html:' to include html in the body of the email
    };                                                              // html: '<h1> Welcome </h1> <p> Hello World! </p>'

    transporter.sendMail(mailOptions, function(err, info){          //sending the actual email
        if(err){
            console.log(err)
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write("email was not sent");
            res.end()
        }
        else{
            console.log("Email sent: " + info.response)
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write("email was sent");
            res.end();
        }
    })
   
}).listen(8080);   





//============================================================== NPM MODULES ==============================================================
//keep in mind that you can also include packages/modules from NPM

var uc = require('upper-case');                     //npm install upper-case
uc.upperCase("hello world");




















// ======================================================  JSON WEB TOKENS ==================================================================
// JSON web token is an open-standard that defines a way for securely transmitting information between parties
// It is a JSON object that is mainly used for authorization and authentication.
	       
// AUTHORIZATION:  When a user successfully logs in using their credentials, an ID token is returned. An ID token is always a JWT.
	       
// AUTHENTICATION: Once a user is successfully logged in, an application may request to access routes, services, or resources (e.g., APIs) on behalf of that user. 
//    To do so, in every request, it must pass an Access Token, which may be in the form of a JWT
	              
// How a JSON web token approximately looks like...
	       header : {
	       	  "alg" : "HS4564",
	          "typ" : "JWT"
       	       }
	       
	       payload : {
                  "sub" : "123456789",
	          "name" : "John Doe",
	      	  "admin" : true
       	       }
			
	       HMACSHA256 : {
             	   base64UrlEncoded(header) + '.' + base64UrlEncode(payload), 'secret'
               }
       
       
// How to use JSON web tokens in node.js
// Typically, using JSON web tokens are used for the back end to authorize users in an application

const jwt = require("jsonwebtoken");		//npm install jsonwebtoken
	
// 1) ---------------- endpoint when the user requests to login
app.post("/login", (req, res) => {
    const { username, password } = req.body;				// 1) Getting the username and password of the user
    if (username === "admin" && password === "admin") {			// 2) checking to see if the username/password is correct
        const token = jwt.sign({ username }, 				// 3) creating a json web token
        'secret key for the app only', {				// make sure to use a .env variable to hide the secret key here
            expiresIn: 86400						// the token will expire in 24 hours, then the user will be automatically logged off
        });
        return res.json({ username, token, msg: "Login Success" });	// returning a response to the user, indicating that the login has been successful
    }
    return res.json({ msg: "Invalid Credentials" });
});
	       
// 2) ------------------- Before this endpoint gets called, the middleware will verify if the JSON web token
app.get("/home", verifyTokenMiddleware, (req, res) => {
    const { user } = req;					// req is the object that is received from the middleware
    res.json({ msg: `Welcome ${user.username}`});
});       
	
			
// 3) -------------------- this function will verify the web token
function verifyTokenMiddleware (req, res, next) {
    const { token } = req.body;
    if (!token) return res.status(403).json({ 
        msg: "No token present" 
    })
    try {
        const decoded = jwt.verify(token, 				// jwt.verify() will automatically verify the token for you
            'secret key for the app only');				// rememeber to use an .env variable for this
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ 
            msg: "Invalid Token" 
        });
    }
    next();								//next() will automatically call the callback on the third argument in app.get('/home;
};
  
       
	       
	       
	       



