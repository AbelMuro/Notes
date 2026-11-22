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
