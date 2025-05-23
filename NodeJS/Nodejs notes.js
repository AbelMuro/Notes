/* 
			Node.js is a runtime environment that allows you to run javascript outside of a browser.
   			A runtime environment is an abstraction that represents all the tools that you need to execute a program.
   			Node.js is mostly used to create RESTful APIs on the back-end.
   			You will need to install Node.js on the server that is using your RESTful API

						      FEATURES OF NODE.JS

			    	           		 MODULAR SYSTEM
		     	Node.js uses a modular system that allows the developer to break the application into smaller, re-usable components.
		      	Typically, every component is imported and used with the require() function
		
					  		 SINGLE-THREADED
		        Node.js is single threaded, which means that it can only perform one task at a time.

   							 NON-BLOCKING I/O
	  	        Node.js uses the event loop to ensure that tasks being performed are not blocking or halting other tasks.

     							    STREAMS
			Node.js uses streams to process large amounts of data. A stream is a continuous flow of data (binary, strings, files) 
   			that is loaded asychronously. The stream will break down large data into chunks, and these chunks will contain raw binary data.
      			The chunks are then stored into a buffer

  							     BUFFERS
	      		Node.js uses buffers to store raw binary data. They are a temporary storage for the raw binary data of files or other large data.
			Buffers can be used to manipulate the data, such as writing new text to a text file.
		  
		  			    		   EVENT LOOP
			 Node.js uses the event loop to process and handle tasks, even though Node.js is single-threaded, we use the
    			 event loop to simultaneously perform multiple tasks. All synchronous tasks are placed in the call-stack,
		  	 and executed one by one. All asynchronous tasks are taken out of the call-stack and processed in a different 
		    	 thread (this thread is NOT part of node.js). Once the asynchronous task has completed in the 
		         separate thread, it will then be placed in the Queue. Once the call-stack is empty, all tasks in the 
			 queue then get placed in the call-stack for execution in the main node.js thread. Keep in mind that the queue
    			 divides its tasks into microtasks and macrotasks; microtasks(promises) have a higher priority, and macrotasks(setTimeout) 
			 have a lower priority

				   NODE.JS THREAD			    SEPARATE THREAD											 	
			 	
				     Call stack												  	  
			  	   |		|										
				   |		|												
				   |  syncFunc	|											
				   |  AsyncFunc	| --------------> this async function is taken out of the call stack 	
				   |  syncFunc	|		  and processed in a separate thread. Once the function				
				   |  syncFunc	|                 finishes processing, it gets placed in the Queue				
				   |  syncFunc	|				|								
				   -------------				|								
					^					|
					| 					|	
				       Queue					|
				   |		|				|
				   |		|	<---------------------- |
				   |		|
				   |		|
				   |		|
				   | AsyncFunc  |
				    ----------			The Queue will complete all microtasks before completing macrotasks

    
		HOW TO INSTALL NODE.JS

			For current user only
	  			1) sudo apt update		 // updates the package manager
	     
			        2) sudo apt install curl -y	 // install curl
	
	    			3) curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash		// installs nvm
		
				4) nvm install node		// installs the latest version of Node

			Globally
   				sudo apt install nodejs -y







		HOW TO DEPLOY YOUR NODE.JS APP WITH HEROKU
			(this service uses serverless functions)
	  
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
       






	  	HOW TO DEPLOY YOUR NODE.JS APP WITH NETLIFY
	 		(this service uses serverless functions)
	
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




//=========================================================== MODULES ==================================================================


//---------------------------------------- CUSTOM MODULE ----------------------------------------
/* 
	You can create your own custom modules in Node.js
*/


 	//1)   addBill.js

		const express = require('express');
		const router = express.Router();
		
		router.post('/add_bill', async (req, res) => {
		    //router logic goes here
		});

		module.exports = router;			//module.exports = {router, ...}

 	//2)   server.js

	 	const addBill = require('./addBill.js');		
	  	const express = require('express');
		const app = express();
	
		app.use(addBill);
















//---------------------------------------- NODEMAILER MODULE ----------------------------------------
//you can use this mail module to send emails from the server

	var nodemailer = require('nodemailer');
	
	app.put('/send_email', () => {
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
	})













//---------------------------------------- FORMIDABLE MODULE ----------------------------------------
/* 
	Formidable module is used for parsing incoming Form data. The form fields will be temporarily
 	stored in RAM, but the files will be stored in the servers' disk storage. If you are not planning
  	on keeping the files that were uploaded from the front-end, then you can delete the files by using
        fs.unlink(). The directory of the file is set with form.uploadDir.

 	The Front-end can send form data in two ways; Inside a <form/> tag or with a fetch request

		Using the Form tag:
		    	<form action="/upload" method="POST" enctype="multipart/form-data">
			    <input type="text" name="username" placeholder="Enter your name">
			    <input type="file" name="profilePic">
			    <button type="submit">Upload</button>
			</form>
	
		Using a Fetch Request:
	  		const formData = new FormData();
			formData.append("username", "Abel");
			formData.append("profilePic", document.querySelector("#fileInput").files[0]);
			
			fetch("/upload", {
			    method: "POST",					   //no need to specify headers here
			    body: formData
			})
*/

var formidable = require('formidable');                                     //npm install formidable

app.post("/upload", (req, res) => {
    const form = new formidable.IncomingForm();				   // Parses the incoming Form from the front-end and extracts the form fields
    form.uploadDir = path.join(__dirname, "uploads"); 			   // Set upload directory
    form.keepExtensions = true; 					   // Keep file extensions

    form.parse(req, (err, fields, files) => {				   // files can be an array if uploading multiple files
        if (err) {							   // Remember to delete the files that were uploaded, use fs.unlink() to delete them
            res.status(400).json({ error: "Error processing upload" });
            return;
        }
        /* 
	  fields = {
	      name: 'Carlos',
	      age: 34,
	   }	
    
  	   files = {
      		filepath, 		Full path where the uploaded file is temporarily stored.
		originalFilename,  	The original name of the file as submitted by the user.
		mimeType,		The MIME type of the file (e.g., "image/png", "application/pdf").
		size, 			File size in bytes.
		newFilename, 		Generated name for the file when stored.
		hash, 			Hash of the file (if hashing is enabled).
		lastModifiedDate,	Timestamp of when the file was last modified.
	   }
	 */
    });
});











		



//---------------------------------------- MULTER MODULE ----------------------------------------
/* 
	Multer module is used for uploading files from the front-end
	(look at the Fetch API notes on how to send files from the front-end with a fetch request)

	You can use the multer module to get a file(image) from the front end
 	and store it as a buffer in memory.

	multer.memoryStorage();					// this method will temporarily save the file in RAM
	multer.diskStorage(					// this method will save the file in the servers disk
 	    destination: './uploads/',					// first argument is the location of the folder that will store the file
	    filename: (req, file, cb) => {				// second argument is the name of the file being uploaded to the ./uploads folder in your node.js app	
		cb(null, `${Date.now()}-${file.originalname}`)	
	    });		
 	
*/

	const multer = require('multer');
	const storage = multer.memoryStorage();				    // you can use the diskStorage() function here as well		       	  
	const upload = multer({ storage: storage}); 		      
	
	app.put('/upload_file', upload.single('image'), (req, res) => {      // in upload.single('image'), it will look for the property 'image' in the FormData object that you created on the front-end
	    const {username, email, password} = req.body;	
	    const image = req.file;					    
		/* 
		  req.file = {
			fieldname,			The name of the form field <input name='image'>
			originalname,			The original name of the uploaded file
			encoding,			The encoding type (7bit or base64)
			mimetype,			The file's MIME type (e.g., 'image/png', 'image/jpeg')
			size,				The size of the file in bytes
			buffer,				The raw binary data as an object
		    }
		*/
	});













//---------------------------------------- MULTER-S3 MODULE ----------------------------------------
/* 
	You can also use the multer module to upload files into an S3 Bucket
	Go to the AWS Console and create an S3 bucket. Then go to your 
 	account on the top right corner and click on Security Credentials.
  	Create a new access key, and then copy the secret access key that is 
   	also generated. The signature version should be v4

	Make sure that the IAM user that is using the S3 bucket has full access
 	to that bucket
 
	npm install @aws-sdk/client-s3
	npm install multer
	npm install aws-sdk
 	npm install multer-s3

*/    
	const aws = require('aws-sdk');
	const multer = require('multer')
	const multerS3 = require('multer-s3')

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

	app.post('/add_transaction', upload.single('image'), (req, res) => {		
		const image = req.file									
			/* 
			  req.file = {
     				location			The URL of the uploaded file in S3
				fieldname,			The name of the form field <input name='image'>
				originalname,			The original name of the uploaded file
				encoding,			The encoding type (7bit or base64)
				mimetype,			The file's MIME type (e.g., 'image/png', 'image/jpeg')
				size,				The size of the file in bytes
				bucket,				The name of the s3 bucket used to store the file
    				key,				The unique file name assigned to the file in S3
				acl,				The access control level (public read, private)
    				metadata,			The meta data of the file uploaded
				etag,				A unique hash representing the uploaded file in S3.
			    }
			*/
	})












//---------------------------------------- WEBSOCKET MODULE ----------------------------------------
/* 
	You can create a WEBSOCKET in your node.js app that creates a connection between the front-end and the back-end
	typically this connection is used to automatically send data between front-end and back-end when theres a changes in the
	database or an event that is triggered in the front end

	For both HTTP and HTTPS, you will need the 'upgrade' event to be defined. The upgrade event will
 	upgrade an HTTP request into a websocket connection

		httpsServer.on('upgrade', (request, socket, head) => {
		    const { pathname } = new URL(request.url, `http://${request.headers.host}`);         //will extract only the path portion of the url, (https://my-socket.com/query    ->     /query)
		    const wss = global.webSocketHandlers[pathname];      				// we access a list of websockets we already created
		    
		    if (wss) {						   				// if the request url already has a websocket
			wss.handleUpgrade(request, socket, head, (ws) => {
			    wss.emit('connection', ws, request);
			});
		    } else 
			socket.destroy();                                   				// Gracefully close invalid connections
		});
*/





//----------- CREATING WEBSOCKETS
/*
	You can use the Websocket.Server() constructor to create a websocket

	syntax:
 		const wss = new WebSocket.Server({noServer: true});

   		wss.on('connection', callback);						// 'connection' event will be triggered when front-end and back-end are connected

     		callback = (ws, req) => {						// 'ws' is an instance of a user that connected to the front-end, every user will have their own instance
											// 'req' is an object that represents the request sent by the front-end to the back-end
			ws methods:							// keep in mind, that 'ws' is an object that can store custom properties and methods 
				ws.send('JSON data');					// ws.send() will send data to the front-end (YOU have to call this function, its best to use it in some event handler)
				ws.close();				 		// ws.close() will close the websocket
				ws.on('message', (message) => {			        // 'message' event will be triggered when the front-end sends a message to the back-end
				     const messageFromFrontEnd = JSON.parse(message);
				})   				  
				ws.on('close', () => {})                                 // 'close' event will be triggered when the front-end disconnectsfrom the back-end
		  
			req methods:
				req.url,             					// The URL used to connect, including query params
				req.headers,     					// Contains request headers (req.headers.cookie) NOT HTTP-ONLY COOKIES
				req.method,       					// HTTP method (usually "GET" for WebSocket connections)
				req.connection, 					// Information about the TCP connection
				req.socket,       					// Raw socket instance
				req.socket.remoteAddress, 				// Client's IP address
				req.socket.remotePort 					// Client's port number
       
		};					
*/

	const WebSocket = require('ws');

	const createWebSocket = (path = 'queue') => {	
	        const wss = new WebSocket.Server({noServer: true});     	    // we use the same server that our node.js app is running on for the websocket

		global.webSocketHandlers[`/${path}`] = wss;			    // we save the websocketHandler in our global list
		
	        wss.on('connection', (ws, req) => {      
		    ws.custom = 'any data';				            // keep in mind that you can save custom properties for each specific instance of the websocket
	            ws.send('data must be in json format')                          
		    ws.close();				 			   
	            ws.on('message', (message) => {			           
			const messageFromFrontEnd = JSON.parse(message);
		    })   				  
	            ws.on('close', () => {                                         
	                console.log('Client disconnected')
	            })
		    wss.clients.map((client) => {				      // you can traverse through all the clients that are connected to this websocket
		     /* 
			 	client.readyState; 				      // Indicates the connection status. It can be WebSocket.OPEN, WebSocket.CLOSED, etc.			
				client.protocol; 				      // If the client specified a subprotocol during the handshake, it will be stored here.		
				client.url; 					      // Contains the URL the client connected to.		
				client.extensions; 				      // Lists any WebSocket extensions in use.		
				client.on(event, callback); 			      // Lets you handle events like "message", "close", "error", etc.
				client.send(data); 				      // Allows sending data to the client.	
				client.terminate();				      // Immediately terminates the connection.		
				client.close(code, 'reason'); 			      // Gracefully closes the connection with an optional code and reason.
			*/									// code is an integer 
		    })										// 1000 (normal closure)   			     1001 (Going away e.g., client navigating away)
		})										// 1006 (Abnormal closure cannot be set manually)    1011 (Server encountered an unexpected condition)


//------------ CLOSING WEBSOCKETS

	const CloseWebSocket = (path) => {
	    global.webSocketHandlers[`/${path}`].close();
	}

	const CloseAllWebSockets = () => {
		const websockets = global.webSocketHandlers;

	        for(let wss of Object.values(websockets)){
	            wss.clients.forEach((client) => {				// disconnecting any client connections, before we close the websockets
	                if(client.readyState === WebSocket.OPEN)		// const WebSocket = require('ws')
	                    client.close();
	            });  
	
	            wss.close();
	        }     
	        global.webSocketHandlers = {};
	}



//------------- CONNECTING TO THE WEBSOCKET FROM THE FRONT-END
/* 
	Keep in mind that the websocket url can be used with query parameters
 	This is another useful way for sending data to the back-end

 		wss//my-back-end-domain.com:443/queue?username=random
*/
				//development			//production (443 is the default port for https)
        const WEBSOCKET_URL = 'ws://localhost:8000/queue'  or   'wss//my-back-end-domain.com:443/queue'     

        const connectToWebSocket = () => {         
            const socket = new WebSocket(WEBSOCKET_URL);            	   // make sure the port is the same on the web socket in the back-end

	    socket.send('sending data to the back-end');		   // socket.send() will send data to the back-end

	    socket.close();						   // socket.close() will close the connection between the front-end and the back-end
		
            socket.onopen = () => {                                        // onopen() event will be triggered when the front-end has connected to the back-end
                console.log('Connected to WebSocket server');
            };
        
            socket.onmessage = (e) => {					   // onmessage() event will be triggered when the back-end sends data to the front-end 	
		const change = e.data;
	    };                          
        
            socket.onclose = () => {					   // onclose() event will be triggered when the front-end disconnects from the back-end
                console.log('Disconnected from WebSocket server');
            };
        
            socket.onerror = (error) => {				   // onerror() event will be triggered when an error occurred
                console.error('WebSocket error:', error);
            };
        }














//---------------------------------------- FILE SYSTEM MODULE ----------------------------------------
/*
	You can use the File System module to manipulate files on the server and from the front-end
*/

//---------------  UPDATING FILES
/* 
	appendFile() will add the specified content to the end of the file
 	writeFile() will replace the file's content with the specified content 
   	For both functions above, if the file doesnt exist, then a new one will be created
*/
    var fs = require("fs");

    fs.appendFile("./nameOfFile.html", 'Hello World!', (err) => { 
        if(err) 
	   console.log(err)
    })

    fs.writeFile("./nameOfFile.html", "hello World", (err) => { 	
        if(err) 
	   console.log(err)                                           
    })



//--------------- READING FILES
/* 
	readFile() will read the contents of a file
*/


    fs.readFile('./nameOfFile.html', (err, data) => {      //reads a file
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write(data);                                        //data is the actual html that you want to send to the client
        return res.end();                                       
    })


//--------------- OPENING FILES
/* 
	open() will open the contents of a file
 	if the file doesnt exist, then a new one will be created
*/

    fs.open("./nameOfFile.html", (err, file) => {          // (you can add a second argument 'w', it stands for 'writing')
	if(err) 
	   console.log(err) 
    })




//--------------- DELETING FILES
/* 
	unlink() will delete a specified file
*/
    fs.unlink("./nameOfFile.html", (err) => {               //deleting a file
        if(err) 
	   console.log(err) 
    })



//--------------- RENAMING FILES
/* 
	rename() will change the name of an existing file
*/
    fs.rename("./nameOfFile.html", "./newFileName.html", (err) => {
        if(err) 
	   console.log(err) 
    })



//-------------- READ STREAMS
/* 
	createReadStream() will read a file by using a stream to load the content
 	in chunks(a part of the content). This is usefull for reading large files
*/

    const rs = fs.createReadStream("./demofile.txt");             //createReadStream fires an event everytime the file opens or closes
    const chunks = []

    rs.on("open", () => {
        console.log('stream has opened')
    })

    rs.on('data', (chunk) => {
	 chunks.push(chunk);    
    })

    rs.on('error', (e) => {
	 console.log('Error has occurred', e);   
    })
























//---------------------------------------- CRYPTO MODULE ----------------------------------------
/* 
	The Crypto module lets you use cryptographic features such as hashing, encryption and 
 	decryption.

  	Haxadecimal String: a string that represents binary data
   
	    Binary: 01000101 0100111010 01001010 10011001 
	    Hexadecimal String: 48 65 62 3F
	    English: Hello
*/

//-------------- Hashing
/* 
	Hashing is the process of obscuring a sequence of characters 
 	with a different set of characters. This is particularly useful
  	for securing a password in a database. You can use the .createHash()
   	method to do this.
*/

	app.post('/hash', () => {
		const message = 'Hello World'
    		const hashObject = crypto.createHash('sha256')				// we create a hash object (instance of the crypto.Hash() class) and specify the 'sha256' hashing algorithm
		const updatedHashObject = hashObject.update(message);     		// we update the hash object with the data we want to hash
		const hashedMessage = updatedHashObject.digest('hex');			// we finalize the hashing process by converting the hash object into a Hexadecimal string
	})

//-------------- Generating tokens
/* 
	Tokens can be generated with the randomBytes() method.
 	This method generates random bytes and stores them in a 
  	buffer. You will then need to convert the buffer into a 
   	hexadecimal string
*/

	app.post('/token', () => {
		const buffer = crypto.randomBytes(32).toString('hex');			// we create a buffer (raw binary data) that has 32 random bytes
		const token = buffer.toString('hex');					// we convert the buffer into a Hexadecimal string
	})
	





















//---------------------------------------- BCRYPT MODULE ----------------------------------------
/* 
	The bcrypt module also lets you use cryptographic features, but is designed more for password hashing
*/



//------------- Salts
/* 
	Salts are random generated values that can be added to a set of data 
 	during the hashing process. This ensures that the hashed value will
  	be unique and secure. you can create a Salt by using the genSalt() method
*/

	app.post('/salt', () => {
		const data = 'data123'
		const salt = await bcrypt.genSalt(10);			// we create a salt of random generated values
		const hashedData = await bcrypt.hash(data, salt);	// the password is then hashed with the generated salt to ensure security and uniqueness.
	})



//-------------- Hashing passwords
/* 
	You can securely hash passwords with salts by using the .hash() method.
 	you can also use the compare() method to compare a hashedPassword with 
  	any string, useful for authenticating a user
*/

	app.post('/hash', async () => {
		const password = 'password123'
		const salt = await bcrypt.genSalt(10);				// we create a salt of random generated values
		const hashedPassword = await bcrypt.hash(password, salt);	// the password is then hashed with the generated salt to ensure security and uniqueness.
		const match = await bcrypt.compare(hashedPassword, password)	// the compare() method can compare a hashed password with a JS string (hashedPassword will be decoded automatically)
	})
	























//---------------------------------------- EVENTS MODULE ----------------------------------------
//this module handles all types of events that are received from the client 

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', () => {          //event handler for 'scream' events
    //do something here
})

eventEmitter.emit('scream')                     //triggerring the event 























//---------------------------------------- URL MODULE ----------------------------------------
/* 
	The url module can be used to manipulate and extract specific parts of the current url.
 	Url stands for Uniform Resource Locator, and it is used as the address for every website. 
  	You can get the current url with 'req.url'	
*/
var url = require('url');                                       // used for formating the url of the website

app.post('/url', (req, res) => {
	const full_url = req.url;				// http://example.com/aboutus/contantus?year=2017&month=february
	const parsed_url = url.parse(full_url, true);		// parsing the url string into an object (if second argument is true, url will be parsed into object, if its false, then it will be parsed into a string )
        const host = parsed_url.host;				// returns the domain name (example.com)
	const pathname = parsed_url.pathname;			// returns the path (/aboutus/contantus)
	const search = parsed_url.search;			// returns the query parameters as a string (?year=2017&month=february)
	const query = parsed_url.query;				// returns the query parameters as an object { year: 2017, month: february}
})












	






//======================================================== ENV VARIABLES ====================================================
/* 

	1) npm install dotenv

	2) const { config } = require('dotenv');
      	   config();							//this should be called BEFORE using the env variables
	  
	3) process.env.apiKey can only be used in the SAME file where you called config()

*/








	       
	       
	       



