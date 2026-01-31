/* 
        EXPRESS is a back-end framework that is used with Node.js


                            FEATURES OF EXPRESS.JS

                                    ROUTING
        Express provides a routing mechanism that is used to define routes that
        a front-end application (React) can use to make fetch HTTP requests

                                  MIDDLEWARE
        Express supports using middleware to handle requests and responses before
        they reach the route. Middlewares are functions that get called before a route
        is used in Express.




 				
        How to create a Restful API with Express.js

		1) npm init -y
	
	 		in your package.json, create a script like this..
	
	   			"start" : "node index.js" 

		2) Create a folder structure like this 
	
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
















//================================================ ROUTING ================================================
/* 
    Routing in Express allows us to create Routes that can be used by the front-end to make fetch request and
    send back responses.
*/
 
    const express = require('express');
    const app = express();                                        // express() returns an object that represents the app   
    const port = 8080;


    app.use(express.json());                                      // express.json() will parse all requests from JSON into Javascript

    app.use('/', (req, res) => {					              // send() is used to send a string to the root directory of the app
        res.send('Hello World');
        res.sendFile(indexFilePath);				              // sendFile() is used to send a file to the browser
    })

    // 'get' requests
    app.get('/account', (req, res) => {                         
        const someObject = {data: 'hello world'}
        res.status(200).json(someObject);            		     // json() is used to convert javascript into JSON                   
    })

    // 'post' request
    app.post('/login', (req, res) => {
        const {username, password} = req.body;
        res.status(200).send('login info is correct')           // send() is used to send strings
    })

    // 'delete' request
    app.delete('/account/:id/:type', (req, res) => {
        const id = req.params.id;						        // req.params is used to get the parameters of the route URL
        const type = req.params.type;
        res.send('data has been deleted')
    })

    // app.use will bind a middleware for the path '/contantPage'
    app.use('/contactPage', () => {           
                            
    })                                                         	




//================================================ REAL-URL ROUTES ================================================
/* 
	You can create a route that serves an image to the front end that uses an img tag
*/

//------------------- Back end

router.get('/image', async (req, res) => {
    try{
		const account = getAccountFromDatabase();

        const imageData = account.imageData;
        const mimeType = imageData.mime_type;
        const data = imageData.data;				//this will be the buffer property from the req.file object

        res.set('Content-Type', mimeType);
        res.send(data)  
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
});


//------------------- Front end

/*
	You can directly call the real-url route via the src attribute of a img tag
*/
<img src="http://localhost:4000/get_image"/>


	
/* 
	You can also make a fetch request to the real-url route 

	(using the cache parameter will ensure that the browser doesnt rely on
	the cache to display the image, this is particularly useful when the
	user updates their photo in their account)
*/

const getImage = async () => {
	const response = await fetch(`http://localhost:4000/get_image?cache=${Date.now()}`, {method: 'GET'});
	const imageData = await response.blob();
	const imageSrc = URL.createObjectURL(imageData);	//you can assign the imageSrc variable to an img tag via the src attribute
} 






	



//================================================ HTTP SERVER ================================================
/* 
    You can use the listen method to create an http server that can be used to make local fetch requests

    The listen() method is asynchronous

*/

    const express = require('express');
    const app = express(); 

    app.listen(8080, (error) => {
        if(error)
            console.log(error);
        else
            console.log('Express app is running on port 8080')
    })

















//======================================================= HTTPS SERVER ============================================================================

/* 
        The https module can enabled you to run your express app with HTTPS
        You will need SSL files from a domain that can be used with https
        you can get these files from ionos, google domains or any other registrar that allows you to buy domains
        you must change the DNS settings for the domain to make sure that the domain points to your computer
        For the DNS settings, add the following records

        A record
            Host name: @
            Points to: ipv4 address of the computer hosting the node.js app
        
        AAAA record
            Host name: @
            Points to: ipv6 address of the computer hosting the node.js app

        Once you implement the instructions above, you can access your app with your domain
        
        https://my-domain.com

        listen() method is asynchronous

*/


    const options = {
        key: fs.readFileSync(privateKeyFilePath),			//SSL file for private.key
        cert: fs.readFileSync(certificateFilePath),			//SSL file for certificate.cer
    }								
                                    
                                
    const httpsServer = https.createServer(options, app).listen(443, (error) => {
        if(error){
            console.log('HTTPS error occurred: ', error);
            return;
        }
        console.log('HTTPS server is running on port 443')
    });



