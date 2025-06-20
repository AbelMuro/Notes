//======================================================== COOKIE-PARSER ==============================================================
/* 
    Cookies are a type of storage that is send with every request and response. 
    To use cookies, the fetch requests that set and get cookies must have the credentials: 'include'
    in the options argument.

      	    fetch('/login', {
      	        method: 'POST',
      	        credentials: 'include'
      	    })

     To enable cookies in a node.js app, you will need to parse the cookies with cookie-parser module
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
    const accessToken = req.cookies.accessToken;		    
	
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

