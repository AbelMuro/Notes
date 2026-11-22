/* 
			Node.js is a runtime environment that allows you to run javascript outside of a browser.
   			A runtime environment is an abstraction that represents all the tools that you need to execute a program.
   			Node.js is mostly used to create RESTful APIs on the back-end.
   			You will need to install Node.js on the server that is using your RESTful API

						      FEATURES OF NODE.JS



								SINGLE-THREADED
								
				Node.js uses javascript, and javascript is single threaded.


									LIBUV
									
				Libuv is a built-in library in Node.js that handles asynchronous I/O operations  
				(I/O is where Node.js has to communicate with anything outside the servers memory/cpu)
				such as reading files, networking, DNS lookups and thread-pool management.
				By default, Libuv uses 4 threads for the following operations...

						fs.readFile()      				// disk I/O
						fetch()            				// network I/O
						http.createServer()				// network I/O
						dns.lookup()       				// DNS I/O

				Libuv has its own event loop that is used outside the scope of the thread
				of javascript. Libuv can also handle other asynchronous non-I/O operations 
				such as...

						setTimeout()
						crypto.pbkdf2(...)
						zlib.gzip(...)






									
    
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
	
		 	1) create a functions folder and an app.js file
		
		  		node_modules
		    		src
		      		functions
						/app.js
				package.json
		  		...
		
		    	2) In the app.js file...
		
					    const serverless = require('serverless-http'); 
						const app = require('../src/index.js'); 			//make sure you export the app module from the index.js
				  		const connectDB = require('../src/Database/db.js');	//if you are using mongoose
						
						const handler = serverless(app);  		      
			
		 			    module.exports.handler = handler      
				
						module.exports.handler = async (e, context) => {	//you can use a callback to connect to databases or some other async logic that must be implemented before every request
				  		    await connectDB();								// you will need to call the connectDB() everytime there is a request made by the front end
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
		   			"build": "netlify deploy --prod"				// you must npm install netlify-cli -g
		      		}
			
			6) In your .gitignore file...
		
		 		.netlify
		
			7) npm run build 
		 		the command above will ask you a few questions, make sure the publish directory is set to .
		   		this will deploy your node app on netlify


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

 	//2)   index.js

	 	const addBill = require('./addBill.js');		
	  	const express = require('express');
		const app = express();
	
		app.use(addBill);



























 
	       
	       



