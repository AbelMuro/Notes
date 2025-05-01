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










//================================================ FILE PATHS ================================================        
/* 
    You can use the built-in path module to resolve file paths in node.js
    This makes is easier to load files in your application
*/


const path = require('path');
const indexFilePath = path.join(__dirname, 'folder/index.html');	

app.use('/', (req, res) => {
	res.sendFile(indexFilePath)
})
 













	






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







//---------------------------------------- MULTER MODULE ----------------------------------------
//Multer module is used for handling multi-part/form data, particularly file uploads
// (look at the Fetch API notes on how to send files from the front-end with a fetch request)

	// --------------The example below is how you receive files in the back-end
	const multer = require('multer');
	const storage = multer.memoryStorage();			       	    // Set up multer for file handling
	const upload = multer({ storage: storage}); 		      
	
	app.put('/upload_file', upload.single('image'), (req, res) => {      // in upload.single('image'), it will look for the property 'image' in the FormData object that you created on the front-end
	    const {username, email, password} = req.body;	
	    const image = req.file;					     // this is how you receieve files from the front end ( look at the fetch api notes for more info on how to send files from the front-end to the back-end  )

	    // look at mongoDB notes for the GridFsBucket module on how to get the binary string of req.file and store it within a database
		
	    res.status(200).send('data has been received')
	})




	// ----------------The example below will send an image from an <input type='file'> to the server, the server will then get the file and store it in a folder './uploads'
 
		// BACK-END
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


	//-------------- The example below will send an image from an <input type='file'> to the server, the server will then upload the image to an s3 bucket

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
			formData.append('image', image);							//make sure you use the same property here and in upload.single()
			
			const response = await fetch('http://localhost:4000/add_transaction', {			//file will be uploaded automatically
				method: 'POST',
			        body: formData,
			});



	//-------------- The example below will receive a file from the back end and store the file in base




//---------------------------------------- WEBSOCKET MODULE ----------------------------------------
//you can create a WEBSOCKET in your node.js app that creates a connection between the front-end and the back-end
//typically this connection is used to automatically send data between front-end and back-end when theres a changes in the
//database or an event that is triggered in the front end



//------------------------------------------BACK END CODE
        const WebSocket = require('ws');
        
	/* 
		./src/index.js
  
	 	const options = {
		    key: fs.readFileSync(privateKeyFilePath),			//these files must be valid SSL files for a domain that you bought
		    cert: fs.readFileSync(certificateFilePath),
		}
		
		const httpsServer = https.createServer(options, app).listen(443, (error) => {
		    if(error){
		        console.log('HTTPS error occurred: ', error);
		        return;
		    }
		    console.log('HTTPS server is running on port 443')
		});

		global.webSocketHandlers = {};                              // this global variable will be used to store all websocket handlers (wss)

		httpsServer.on('upgrade', (request, socket, head) => {
		    const wss = global.webSocketHandlers[request.url];      //we access a list of websockets we already created
		    
		    if (wss) {						   //if the request url already has a websocket
		        wss.handleUpgrade(request, socket, head, (ws) => {
		            wss.emit('connection', ws, request);
		        });
		    } else {
		        socket.destroy();                                   // Gracefully close invalid connections
		    }
		});

  		createWebSocket(httpsServer);
 		
 	*/

	//dont forget to add the upgrade event handler above
	const createWebSocket = (server) => {
						  //development		//production
	        const wss = new WebSocket.Server({port: 8000}  or   {noServer: true});     //make sure the port is the same for the back-end and the front-end

		global.webSocketHandlers[`/${path}`] = wss;				 //we save the websocketHandler in our global list
		
	        wss.on('connection', ws => {                                        //you establish the connection between the back end and the front end
	            console.log('Front-end and back-end are connected');        
	            ws.send('data must be in json format')                         //This is where you send the changes to the front-end (YOU have to call this function, its best to use it in some event handler)
		    ws.close();							   //you can manually close the websocket whenever you want	
	            ws.on('close', () => {                                        //Event listener that is triggered when the front-end is disconnected from the back-end
	                console.log('Client disconnected')
	            })
		})	
	}


	const CloseWebSocket = (path) => {
	    global.webSocketHandlers[`/${path}`].close();
	}

	const CloseAllWebSockets = () => {
		const websockets = global.webSocketHandlers;

	        for(let wss of Object.values(websockets)){
	            wss.clients.forEach((client) => {				//disconnecting any client connections, before we close the websockets
	                if(client.readyState === WebSocket.OPEN)		// const WebSocket = require('ws')
	                    client.close();
	            });  
	
	            wss.close();
	        }     
	
	        global.webSocketHandlers = {};
	}


//--------------------------------------------FRONT END CODE

        const WEBSOCKET_URL = 'ws://localhost:8000'  or   'wss//my-back-end-domain.com:443/queue'        //first string is for development, the second is for production (port 443 is the default port for https)

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










//---------------------------------------- FILE SYSTEM MODULE ----------------------------------------
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









//---------------------------------------- EVENTS MODULE ----------------------------------------
//this module handles all types of events that are received from the client 

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', function() {          //event handler for 'scream' events
    //do something here
})

eventEmitter.emit('scream')                     //triggerring the event 








//---------------------------------------- FORMIDABLE MODULE ----------------------------------------
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

















	       
	       
	       



