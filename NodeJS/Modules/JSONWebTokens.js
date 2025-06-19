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
    const payload = {email: email, username: username}
    const options = {
        algorithm: 'HS256',         // Specifies the signing algorithm. HS256 (default) is for better perfomance, RS256 is for improved security (requires a private key to sign, and a public key to verify)
        expiresIn: '1h',            // Sets expiration time, e.g. '1h', '7d', or a numeric value in seconds. 
        notBefore: '20s',           // Sets a time before which the token is not valid. Can be a string like '20s' or a number.
        audience: 'for-login-route',// Sets a unique ID that is used to specify who the token is intended for. The verify method() may include the audience property with the specified string in the third argument if you want your system to be strict
        issuer: 'my-auth-service',   // Sets a unique ID that is used to specify who sent the token. The verify method() may include the issuer property with the specified string in the third argument if you want your system to be strict
        jwtid: 'my-jwt-id',          // Sets a unique ID that is used to identity the actual JSON web token. The verify method() may include the jwtid property with the specified string in the third argument if you want your system to be strict
        subject: 'login-token',      // Sets a unique ID that is used to specify what the token is about. The verify method() may include the subject property with the specified string in the third argument if you want your system to be strict
        noTimestamp: false,          // If true, the iat (issued at) property won't be added to the resulting token.
        header: {                    // Custom values for the JWT header. You can add custom properties to the header property of the returned object of verify()
          customHeader: '123'
        },                 
        keyid: '123',                 // Adds a kid (key ID) to the header.
        mutatePayload: true           // If true, the payload object will be updated with ALL the properties that was included in the third argument
    }

        
    const token = jwt.sign({payload, JWT_SECRET, options);
    const decoded = jwt.verify(token, JWT_SECRET);
})
