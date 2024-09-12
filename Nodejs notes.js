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

	1) Create a folder and then a file server.js

	2) npm init -y

 	3) npm install express 

  	4) Copy the following lines of code

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

	5) run the command - node server.js

 	6) The server should be running on localhost:4000 and will display a Hello World Message

  	7) If you want browsers of different origins to make fetch requests to the server, you must implement CORS

   	8) Now create a front end app that you can use to interact with the server

    	9) You will need to use fetch requests to send requests and receive respponses from the server

		const response = await fetch('http://localhost:4000/', {
	            method: 'POST',
	            headers: {
	                "Content-Type": "application/json"
	            },
	            body: JSON.stringify({data: 'my data'})
	        });
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





//========================================================= AuthO =============================================================
/* 
	AuthO is a way to authenticate users in your node.js app
 	npm install express express-openid-connect --save

 	1) Log in to your AuthO account

  	2) Go to applications section and then create an application, and then click on quickstart

   	3) Select the type of website/app that you are creating

    	4) Select node.js as the technology you are using for the backend

     	5) Select 'I want to integrate with my app'

      	6) In the allowed callbacks, leave everything as it is.
       
  	7) In the configure router section, copy and paste the code that is displayed

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


  	-continue and apply the remaining steps in the quickstart section

	8) To enable users to log in with a password
     	   Go to Auth0 dashboard -> Applications -> select your application -> settings -> advanced settings ->  Grant types -> Check password

	9) Now you must create a Database that can be used to store the users account info
	    Go to Auth0 dashboard -> Authentication -> database -> create database
            Create a name for the database
	    Check email 
     	    Check password
	    Click on create button
     
  	 10) Now you must enable the database to connect to your Auth0 app
             Go to Auth0 dashboard -> Authentication -> database -> select database -> Applications
	     Check the app that you want to connect to this database

 	     Next go to Auth0 Dashboard -> Applications -> Select you application -> Connections
       	     Check the database that you want to use

      	     You may need to change the default connection for the apps in your dashboard to make this work
	     Go to Auth0 Dashboard -> Settings -> Scroll down to API Authorization Settings
             Add the name of the database that you want to set as default in 'Default Directory'


	 11) To enable users to read data and write data into their account you must create a Machine to machine application

  		Auth0 dashboard -> Applications -> Create Application -> select Machine to Machine -> 
    	        	Select Auth0 Management API -> specify the permissions 

       	12) Then go to auth0 dashboard -> API -> selecte auth0 management api -> Machine to Machine Apps -> check the application that you want to use with this api


  	13) In your server, you will need to use the ManagementClient API from the auth0 sdk

   		13.1) const { ManagementClient } = require('auth0');

     		13.2) const getManagementAccessToken = async () => {
			    try{
			        const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
			            method: 'POST',
			            headers: {
			                'Content-Type' : 'application/json'
			            },
			            body: JSON.stringify({
			                client_id: process.env.AUTH0_CLIENT_ID,
			                client_secret: process.env.AUTH0_CLIENT_SECRET,
			                audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
			                grant_type: 'client_credentials'
			            })
			        });
			
			        const results = await response.json();
			        return results.access_token        
			    }
			    catch(error){
			        console.log(error);
			    }
			}

  	      13.3) const managementAccessToken = await getManagementAccessToken();

	      13.4) const management = new ManagementClient({
	        	    domain: `https://${process.env.AUTH0_DOMAIN}`,
	        	    token: managementAccessToken,
	    		})

	 14) npm install auth0				//this will install the auth0 sdk
  	     

 		11.1) const { AuthenticationClient } = require('auth0');

 		11.2) const auth0 = new AuthenticationClient({
			    domain: process.env.AUTH0_DOMAIN,				// make sure to NOT include https://
			    clientId: process.env.AUTH0_CLIENT_ID,			// you can find this in auth0 dashboard -> applications -> select your app -> settings
			    clientSecret: process.env.AUTH0_CLIENT_SECRET,
			});


	     	11.3) app.post('/register', async (req, res) => {
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


		  11.4) app.post('/login', async (req, res) => {
			    const {email, password} = req.body;
			
			    try{
			        const account = await auth0.oauth.passwordGrant({
			            username: email,
			            password: password,
			            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
			            realm: process.env.AUTH0_REALM						//this is the name of the auth database that you are using
			        });
			        const accessToken = account.data.access_token;
			
			        res.cookie('access_token', accessToken, {					//You should store access-tokens with these http only cookies
			            httpOnly: true,
			            secure: process.env.NODE_ENV === 'production', 
			            sameSite: 'Strict'
			          });

      				//req.cookies.access_token;							//this is how you access the access_token stored in cookies
			
			        res.status(200).send('Login Successfull');
			    }
			    catch(error){
			        res.status(400).json({error: error.message});
			    }
			})
	
  

*/









//=========================================================== MODULES ==================================================================
/* 
	MODULES are separate files with functions and classes that can be used(imported) in other files in node.js

 	1)   //add.js

  	const add = (a, b) => a + b;
	module.exports = add;

    
 	2)   //server.js

 	const add = require('./add');			//you dont need the extension for ./add.js	
  	add(1, 2);
*/















//========================================================= DNS (Domain Name System) =======================================================
// (DNS is like a contacts list on your phone that contains a list of IP addresses that your computer has visited before)

// Every time the user types in a URL into a browser, the browser must translate the URL into an ip address
// First, the browser checks the DNS cache in the browser for the ip address of the URL
// if its not found in DNS cache, then the browser will check the DNS servers (operating system) for the ip address of the URL,
// if its not found in DNS servers, then the browser will make an HTTP request to the server for the ip address of the URL
// Once the browser has the IP address, the browser establishes a TCP connection to the server, this allows for HTTP requests and responses















//=============================================================== EXPRESS WEB FRAMEWORK =================================================================
//middleware, a function that does something between the server receiving a request and sending a response 

 

const express = require('express');
const app = express();                                        //creating an object that represents the main app
const bodyParser = require('body-parser');                    //npm install body-parser, this will parse all incoming fetch() requests
const cookieParser = require('cookie-parser');                //npm install cookie-parser, this will parse all cookies that are send along with each request
const port = 5000;

app.use(bodyParser.json());					//you will need this if your server expects fetch requests with the body property
app.use(cookieParser());

// 'get' requests
app.get('/login', (req, res) => {                                 // .get() is for handleling 'get' requests from the client
    res.send('data has been sent');                                 
})

// 'post' request
app.post('/login', (req, res) => {
    //do something with req.body (if request came from a fetch())
    //or use formidable module to get user input from forms
    res.send('data has been received')
})

// 'put' request is similar to 'post', but the main difference is that calling the same 'put' request will produce the same result, but calling the same 'post' request will create the same resource over and over again
app.put('/login', (req, res) => {
    //do something with req.body (if request came from a fetch())
    //or use formidable module to get user input from forms
    res.send('data has been received')
    
})

// 'delete' request
app.delete('/login', (req, res) => {
    //do something with req.body (if request came from a fetch())
    //or use formidable module to get user input from forms
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








//======================================================== ENV variables ====================================================
/* 

	1) npm install dotenv

	2) const { config } = require('dotenv');
      	   config();
	  
	3) process.env.apiKey can only be used in the SAME file where you called config()

*/









//=========================================================HTTP MODULE=========================================================
// HYPER TEXT TRANSFER PROTOCOL -> all about requests and responses that are done between clients and servers
// http module is the most used module in node.js, it uses http to receive requests and send responses to the client
// below is how you will create a server


// configure webpack.config file with the following
//  
//        module.exports = {
//            ...
//            devServer: { 
//                port: 3000,
//                proxy: {
//                    '/' : {
//                        target: 'http://localhost:3000',
//                        router: () => 'http://localhost: 4000'         //all requests will be forwarded to this port                                     
//                   }
//               }
//           }
//       }
        


// req is the request object that is sent by the client
// res is the response object that will be sent back to the client
var http = require("http");
var url = require("url");


http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename= "." + q.pathname;                         //remember that q.pathname = /nameOfFile.html

    fs.readFile(filename, function(err, data) {
        if(err) {
            res.writeHead(404, {"Content-Type" : "text/html"}) //error handling
            return res.end("404 Not Found")                
        }
        res.writeHead(200, {'Content-Type' : "text/html"});  //defines the content type that will be sent to the client.. 200 is a status code that means everything is ok, 404 is a status code that means something is wrong
        res.write(data);
        return res.end();                                    //we end the response here   
    })

}).listen(8080);                                             //the server listens on port '8080'                           





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
  
       
	       
	       
	       



