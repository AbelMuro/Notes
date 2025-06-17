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

 	//2)   index.js

	 	const addBill = require('./addBill.js');		
	  	const express = require('express');
		const app = express();
	
		app.use(addBill);



























 
	       
	       



