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

*/

/* 
 
        const express = require('express');
        const cookieParser = require('cookie-parser');                //npm install cookie-parser, this will parse all cookies that are send along with each request
        const multer = require('multer');			      //npm install multer, you can use this to parse incoming files from the front-end
        const app = express();                                        //creating an object that represents the main app
        const port = 5000; 
        
        app.use(express.json());					//this will parse all incoming json data, you will need this if your server expects json data from the front-end
        app.use(express.urlencoded({extended: true}));			//this will parse all incoming form data, you will need this if your server expects form data from the front-end 		(<form action="/submit-form" method="POST"></form>)
        app.use(cookieParser());
                                                
*/




/* 



        const express = require('express');
        const cookieParser = require('cookie-parser');                //npm install cookie-parser, this will parse all cookies that are send along with each request
        const multer = require('multer');			      //npm install multer, you can use this to parse incoming files from the front-end
        const app = express();                                        //creating an object that represents the main app
        const port = 5000;
        const path = require('path');
        const indexFilePath = path.join(__dirname, 'folder/index.html');	//you should always use path.resolve() to load files in a node.js app with the FS module (when deploying the node.js app, some web host may need you to specify the location of the files, like netlify.toml)
        
        
        app.use(express.json());					//this will parse all incoming json data, you will need this if your server expects json data from the front-end
        app.use(express.urlencoded({extended: true}));			//this will parse all incoming form data, you will need this if your server expects form data from the front-end 		(<form action="/submit-form" method="POST"></form>)
        app.use(cookieParser());
        
        
        app.use('/', (req, res) => {					//root directory, you can send a message to the client or a index.html file
            res.sendFile(indexFilePath);				// you can send an index.html to the client when the user accesses the ./ route
        })
        
        // 'get' requests
        app.get('/account', (req, res) => {                             // .get() is for handleling 'get' requests from the client
            const someObject = {data: 'hello world'}
            res.status(200).json(someObject);            		// you must use json to format any JS into json before you send a response                     
        })
        
        // 'post' request
        app.post('/login', (req, res) => {
            const {username, password} = req.body;
            res.status(200).send('login info is correct')
        })
        
        // 'delete' request
        app.delete('/account/:id/:type', (req, res) => {
            //you can use formidable module to get user-input from forms
            const id = req.params.id;						//you can use :id to send data to an endpoint like this http://localhost:4000/acount/123456
            const type = req.params.type;
            res.send('data has been deleted')
        })
        
        // app.use will bind a middleware for the path '/contantPage'
        app.use('/contactPage', () => {                              		// .use() is a function that will 'use' the function on the second argument
        })                                                         	 	// everytime the user opens an url with /contactPage, EXAMPLE: www.example.com/contactPage
        
        //listens to port 5000
        const httpServer = app.listen(port, (error) => {			//keep in mind that the listen method is asynchronous
            if(error)
                console.log('Internal Error')
            else
                console.log(`Server is running on port ${port}`)
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





















//======================================================= HTTPS SERVER============================================================================

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




















//============================================================== CORS ======================================================================
/* 
	CORS: Cross origin resource sharing

 	CORS is basically a way for servers to allow browsers of different origins to load resources
   	If the browser is making a get-request from a different origin, the you will need cors

    npm install cors
*/
    
	

    const cors = require('cors');
    const corsOptions = {
        origin: 'http://example.com',						    //Access-Control-Allow-Origin
        methods: ['GET', 'POST'],                               //methods allowed
        allowedHeaders: ['Content-Type', 'Authorization'],	    //Access-Control-Allow-Headers
        credentials: true,                                      //allows cookies to be sent with the request/response
        maxAge: 3600,       
        optionsSuccessStatus: 200
    }

	app.use(cors(corsOptions));							        // Enabling cors for all routes using app.use()

	app.get('/', cors(corsOptions), (req, res) => { 			// Alternatively, we can enable cors for specific routes using app.get(), app.post(), etc.
 
	});

















//======================================================== COOKIES ==============================================================
/* 
    Cookies are a type of storage that is send with every request and response. 
    To use cookies, the fetch requests that set and get cookies must use the 
    credentials property.

    fetch('/login', {
        method: 'POST',
        credentials: 'include'
    })
*/


/* 
            COOKIES

    These types of cookies can be accessed by the front-end and the back-end.
    You should only uses these cookies for data that is not sensitive

*/
const cookieParser = require('cookie-parser');                //npm install cookie-parser, this will parse all cookies
app.use(cookieParser())


app.post('/setting_cookies', (req, res) => {
    const {query} = req.body;
	const access_token = 'JSON WEB TOKEN';

	res.cookie('accessToken', access_token);
    res.cookie('searchQuery', query);
});


app.get('/accessing_cookies', (req, res) => {
	const accessToken = req.cookies.accessToken;		    //accessing the http only cookie
	
    if(!accessToken)
		return res.status(401).send('User does not have third-party cookies enabled or cross-site tracking enabled');
});



/* 
            HTTP-ONLY COOKIES

     HTTP-only cookies can only be viewed on the server
     For these types of cookies to work, the developer need to make sure that the client 
     has third-party cookies enabled and cross-site tracking enabled in their browser

*/


app.post('/setting_httpOnlyCookies', (req, res) => {
    const {email, password} = req.body;
	const access_token = 'JSON WEB TOKEN THAT STORES EMAIL AND PASSWORD';

	res.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: true,      					//http only cookies will only be used throught https 
            sameSite: 'Strict or None',				//Strict only allows sites from the same orgins to make requests, None allows cross-site requests
            maxAge: 1000 * 60 * 60,				//you can have an expiration date for these cookies, but for auth, you shouldnt use this, instead let the front end handle the expiration for these cookies		
        })
});

app.get('/accessing_httpOnlyCookies', (req, res) => {
	const accessToken = req.cookies.accessToken;		//accessing the http only cookie

	if(!accessToken)
		return res.status(401).send('User does not have third-party cookies enabled or cross-site tracking enabled');
	
});


















//======================================================== JSON WEB TOKENS ========================================================
/* 
    One way to authenticate the user is using JSON WEB TOKENS. It is a type of storage that is used to contain 
    account data. If the storage has data, then we can say the user is logged in, if its empty, they the user 
    is not logged in

    To share JSON WEB TOKENS across your routes, you may need to use HTTP-only cookies
*/


const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    //we use some database function here to check if the password is correct

    const JWT_SECRET = 'my secret key goes here';    		

    const token = jwt.sign({email: email, otherAccountData: {}}, JWT_SECRET, {expiresIn: '1h'});

    // put the token in an HTTP-only cookie and sent it with the response
})













//======================================================== AUTHENTICATION ========================================================



