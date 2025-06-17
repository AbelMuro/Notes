//---------------------------------------- BCRYPT MODULE ----------------------------------------
/* 
	The bcrypt module also lets you use cryptographic features, but is designed more for password hashing
*/



//------------- Salts
/* 
	Salts are random generated values that can be added to a set of data 
 	during the hashing process. This ensures that the hashed value will
  	be unique and secure. you can create a Salt by using the genSalt() method
*/

	app.post('/salt', () => {
		const data = 'data123'
		const salt = await bcrypt.genSalt(10);			// we create a salt of random generated values
		const hashedData = await bcrypt.hash(data, salt);	// the password is then hashed with the generated salt to ensure security and uniqueness.
	})



//-------------- Hashing passwords
/* 
	You can securely hash passwords with salts by using the .hash() method.
 	you can also use the compare() method to compare a hashedPassword with 
  	any string, useful for authenticating a user
*/

	app.post('/hash', async () => {
		const password = 'password123'
		const salt = await bcrypt.genSalt(10);				// we create a salt of random generated values
		const hashedPassword = await bcrypt.hash(password, salt);	// the password is then hashed with the generated salt to ensure security and uniqueness.
		const match = await bcrypt.compare(hashedPassword, password)	// the compare() method can compare a hashed password with a JS string (hashedPassword will be decoded automatically)
	})
	
