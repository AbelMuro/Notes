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
    const JWT_SECRET = 'my secret key goes here';   
    const {email, password} = req.body;
    const {hashedPassword} = getAccountDataFromDatabase(email);					        // 1) we get the hashed password from the database	
	
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);			// 2) we compare the hashed password with the password the user entered
    if(!passwordsMatch){									
    	 res.status(401).send('Password is invalid');
    	 return;
    }

    const token = jwt.sign({email: email, otherAccountData: {}}, JWT_SECRET);			// 3) we create a JSON web token and store the account data in it	
    res.cookies('accessToken', token, {httpOnly: true, secure: true, sameSite: 'None'});	// 4) we can use http-only cookies to securely store the json web token
    res.status(200).send('User has successfully logged in');					            // 5) or we can send the token to the front-end to be stored in some global state
})
