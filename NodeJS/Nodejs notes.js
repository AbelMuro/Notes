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

	If you are using https, you will need an event handler to handle the upgrade event
 	Place the following code in your index.js file...

		httpsServer.on('upgrade', (request, socket, head) => {
		    const wss = global.webSocketHandlers[request.url];      // we access a list of websockets we already created
		    
		    if (wss) {						   // if the request url already has a websocket
			wss.handleUpgrade(request, socket, head, (ws) => {
			    wss.emit('connection', ws, request);
			});
		    } else 
			socket.destroy();                                   // Gracefully close invalid connections
		});
*/

//----------- CREATING WEBSOCKETS

	const WebSocket = require('ws');

	const createWebSocket = (server) => {	//development		//production
	        const wss = new WebSocket.Server({port: 8000}   or   {noServer: true});     //make sure the port is the same for the back-end and the front-end

		global.webSocketHandlers[`/${path}`] = wss;			    //we save the websocketHandler in our global list
		
	        wss.on('connection', ws => {                                        // you establish the connection between the back end and the front end
	            ws.on('message', (e) => {					    // message event will be triggered when the front-end sends a message through the websocket
			const data = e.data;
		    })    
	            ws.send('data must be in json format')                         // ws.send() will send data to the front-end (YOU have to call this function, its best to use it in some event handler)
		    ws.close();							   // ws.close() will close the websocket
	            ws.on('close', () => {                                         // close event will be triggered when the front-end and back-end are disconnected
	                console.log('Client disconnected')
	            })
		})	
	}

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
	
				//development			//production (443 is the default port for https)
        const WEBSOCKET_URL = 'ws://localhost:8000'  or   'wss//my-back-end-domain.com:443/queue'       

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































//---------------------------------------- EVENTS MODULE ----------------------------------------
//this module handles all types of events that are received from the client 

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', function() {          //event handler for 'scream' events
    //do something here
})

eventEmitter.emit('scream')                     //triggerring the event 























//---------------------------------------- URL MODULE ----------------------------------------
var url = require('url');                                       //used for formating the url of the website
    var adr = 'http://localhost:8080/default.htm?year=2017&month=february';  //normally you would use 'req.url' to get the url
    var q = url.parse(adr, true)                                //parsing the url into an object
    q.host;                                                     //returns 'localhost:8080' (domain name)
    q.pathname;                                                 //returns 'default.htm'
    q.search;                                                   //returns '?year=2017&month=february'
    q.query;                                                    //returns an object { year: 2017, month: february}


    let filename = q.pathname;                                              
    formattedUrl = formattedUrl.year + " " + formattedUrl.month; 












	






//======================================================== ENV VARIABLES ====================================================
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
	You can use the BCRYPT and CRYPTO modules to do just that

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
			const hashedPassword = await bcrypt.hash(password, salt);
				// 1) we create a salt of random generated values
				// 2) the password is then hashed with the generated salt to ensure security and uniqueness.
			const match = await bcrypt.compare(hashedPassword, password)
				// the compare() method can compare a hashed password with a JS string
				// it will automatically decode the hashed password and then compare it
				// this is useful for validating if the user entered the correct password












  	




















	       
	       
	       



