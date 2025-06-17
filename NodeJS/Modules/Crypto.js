//---------------------------------------- CRYPTO MODULE ----------------------------------------
/* 
	The Crypto module lets you use cryptographic features such as hashing, encryption and 
 	decryption.

  	Hexadecimal String: a string that represents binary data
   
	    Binary: 01000101 0100111010 01001010 10011001 
	    Hexadecimal String: 48 65 62 3F
	    English: Hello
*/

//-------------- Hashing
/* 
	Hashing is the process of obscuring a sequence of characters 
 	with a different set of characters. This is particularly useful
  	for securing a password in a database. You can use the .createHash()
   	method to do this.
*/

	app.post('/hash', () => {
		const message = 'Hello World'
    		const hashObject = crypto.createHash('sha256')				// we create a hash object (instance of the crypto.Hash() class) and specify the 'sha256' hashing algorithm
		const updatedHashObject = hashObject.update(message);     		// we update the hash object with the data we want to hash
		const hashedMessage = updatedHashObject.digest('hex');			// we finalize the hashing process by converting the hash object into a Hexadecimal string
	})

//-------------- Generating tokens
/* 
	Tokens can be generated with the randomBytes() method.
 	This method generates random bytes and stores them in a 
  	buffer. You will then need to convert the buffer into a 
   	hexadecimal string
*/

	app.post('/token', () => {
		const buffer = crypto.randomBytes(32).toString('hex');			// we create a buffer (raw binary data) that has 32 random bytes
		const token = buffer.toString('hex');					// we convert the buffer into a Hexadecimal string
	})
	
