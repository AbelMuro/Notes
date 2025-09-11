//============================================================== CORS ======================================================================
/* 
	  CORS: Cross origin resource sharing

 	  CORS is basically a way for servers to allow browsers of different origins to load resources
   	  If the browser is making a get-request from a different origin, then you will need cors

	   	  NOTE TO SELF: There will be certain web hosts that use a strict comparison to compare the origins of the front end
		  and the back end. 
	   
	   	  If the origin making a fetch request is 'https://world-class-checkers.netlify.app/' and the allowed origins
		  for a node.js app is 'https://world-class-checkers.netlify.app'
	
	   					'https://world-class-checkers.netlify.app/' === 'https://world-class-checkers.netlify.app'
	
	  	   The expression above will return 'false' because of the trailing /
		   Therefore, the origin at 'https://world-class-checkers.netlify.app/' will be invalid
*/
    
	

    const cors = require('cors');
    const corsOptions = {
        origin: 'http://example.com',						     //Access-Control-Allow-Origin
		origin: (origin, callback) => {							   // the origin property can also accept a callback
			if(allowedOrigins.includes(origin))					   // you can manipulate the origin URL string before comparing 
				callback(null, true);							   // it to the allowed origin strings
			else
				callback(new Error('Not allowed by cors'))
		}
        methods: ['GET', 'POST'],                               //methods allowed
        allowedHeaders: ['Content-Type', 'Authorization'],	    //Access-Control-Allow-Headers
        credentials: true,                                      //allows cookies to be sent with the request/response
        maxAge: 3600,       
        optionsSuccessStatus: 200
    }

	app.use(cors(corsOptions));							        // Enabling cors for all routes using app.use()

	app.get('/', cors(corsOptions), (req, res) => { 			// Alternatively, we can enable cors for specific routes using app.get(), app.post(), etc.
 
	});


