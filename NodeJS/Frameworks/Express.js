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




 				
        How to create a Restful api with Express.js

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
    const JWT_SECRET = 'my secret key goes here';    		
	
    const token = jwt.sign({email: email, otherAccountData: {}}, JWT_SECRET, {expiresIn: '1h'});
})













//======================================================== AUTHENTICATION ========================================================
/* 
	Authentication is the process of enabling or disabling a user to access resources on a database.
 	Typically, we use JSON web tokens to authenticate the user by storing account data in the token.
	We use the token as a way to verify if the user is logged in or not.
*/


// --------------------------------------------------- REGISTER------------------------------------------------
/* 
	When a user wants to register for an account in the database, we can store their credentials
 	in the database by hashing the password with the 'bcrypt' module. Hashing passwords is a 
  	secure way of storing a password in a database. Look at the cryptography section of your 
   	Node.js notes on more info about hashing.
*/

const bcrypt = require('bcryptjs');

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
	
    const salt = await bcrypt.genSalt(10);							//we use the bcrypt module to hash the password
    const hashedPassword = await bcrypt.hash(password, salt)
	
    createAccountInDatabase(email, hashedPassword);				
	
    res.status(200).send('Account has been created')
})


// --------------------------------------------------- LOGIN ------------------------------------------------
/* 
	Once the user has an account and they want to login. We can continue to use the bcrypt module
 	to compare a hashed password to a password that the user has entered in a form.	If the password 
  	they entered is correct, then we can proceed to create a JSON web token to store their account info.
   	The JSON web token can either be stored in an HTTP-only cookie, or be sent to the front-end and stored
    	in a global state
*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
    const {email, password} = req.body;\
    const {hashedPassword} = getAccountDataFromDatabase(email);					// 1) we get the hashed password from the database
    const JWT_SECRET = 'my secret key goes here';    		
	
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);			// 2) we compare the hashed password with the password the user entered
    if(!passwordsMatch){									
	 res.status(401).send('Password is invalid');
	 return;
    }

    const token = jwt.sign({email: email, otherAccountData: {}}, JWT_SECRET);			// 3) we create a JSON web token and store the account data in it	
    res.cookies('accessToken', token, {httpOnly: true, secure: true, sameSite: 'None'});	// 4) we can use http-only cookies to securely store the json web token
	
    res.status(200).send('User has successfully logged in');					// 5) or we can send the token to the front-end to be stored in some global state
})



// --------------------------------------------------- ACCOUNT ------------------------------------------------
/* 
	We can access account data using JSON web tokens and HTTP-only cookies
*/


app.get('/account', async (req, res) => {
     const JWT_SECRET = 'my secret key goes here'; 
     const token = req.cookies.accessToken;

     const decoded = jwt.verify(token, JWT_SECRET);
     const email = decoded.email;

     const accountData = getAccountDataFromDatabase(email);

     res.status(200).json(accountData)
})


// --------------------------------------------------- FORGOT PASSWORD ------------------------------------------------
/* 
	If the user has forgotten their password, we can create a reset token they can use to reset their password
 	The reset token must be stored in their account in the database, it will also have an expiration date.
  	We can use the crypto module to create the reset token.

   	The process will go like this.. we create the reset token and store it in the user's account in database.
    	We then send the user an email with the reset link. The reset link will take them to another page in 
     	the application where they can reset their password

      	Look at the nodemailer section of your Node.js notes for more info on sending emails
*/

const crypto = require('crypto');

app.put('/forgot_password', async (req, res) => {
	const resetToken = crypto.randomBytes(32).toString('hex');
	const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');		//we create the reset token
	const resetPasswordExpires = Date.now() + 10 * 60 * 1000;						//we set the expiration date for the token

	updateAccountDataInDatabase(resetPasswordToken, resetPasswordExpires);

	const resetPasswordLink = `http://localhost:3000/reset/${resetToken}`

	sendEmailToUserWithResetLink(resetPasswordLink);							//use nodemailer to send emails (go to node.js )

	res.status(200).send('Email sent successfully');
})




// --------------------------------------------------- RESET PASSWORD ------------------------------------------------
/* 
	Once the email has been sent to the user, the page in the application should be able to get the 
 	reset token from the URL and send it to the back-end
*/

app.put('/reset_password', (req, res) => {
	const {token, newPassword} = req.body;

	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
	const accountData = findUserAccountInDatabase({resetPasswordToken: hashedToken})	//we look for an account that has the value hashedToken and property resetPasswordToken
	const resetPasswordExpires = accountData.resetPasswordExpires;

	if(resetPasswordExpires < Data.now()){
		res.status(401).send('Token has expired');
		return;
	}
	
	accountData.password = newPassword;
	accountData.resetPasswordToken = null;
	accountData.resetPasswordExpires = null;

	updateUserAccountDataInDatabase(accountData)

	res.status(200).send('Password changed successfully')
	
})












