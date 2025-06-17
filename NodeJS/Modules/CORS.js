//============================================================== CORS ======================================================================
/* 
	  CORS: Cross origin resource sharing

 	  CORS is basically a way for servers to allow browsers of different origins to load resources
   	If the browser is making a get-request from a different origin, the you will need cors
*/
    
	

    const cors = require('cors');
    const corsOptions = {
        origin: 'http://example.com',						                //Access-Control-Allow-Origin
        methods: ['GET', 'POST'],                               //methods allowed
        allowedHeaders: ['Content-Type', 'Authorization'],	    //Access-Control-Allow-Headers
        credentials: true,                                      //allows cookies to be sent with the request/response
        maxAge: 3600,       
        optionsSuccessStatus: 200
    }

	app.use(cors(corsOptions));							        // Enabling cors for all routes using app.use()

	app.get('/', cors(corsOptions), (req, res) => { 			// Alternatively, we can enable cors for specific routes using app.get(), app.post(), etc.
 
	});


