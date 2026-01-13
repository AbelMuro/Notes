//---------------------------------------- MULTER MODULE ----------------------------------------
/* 
	Multer module is used for uploading files from the front-end
	(look at your 'express' notes for REAL-URL ROUTE on how to send the image file from the database to the front end)

	You can use the multer module to get a file(image) from the front end
 	and store it as a buffer in memory.

	multer.memoryStorage();					// this method will temporarily save the file in RAM
	multer.diskStorage(					// this method will save the file in the servers disk
 	    destination: './uploads/',					// first argument is the location of the folder that will store the file
	    filename: (req, file, cb) => {				// second argument is the name of the file being uploaded to the ./uploads folder in your node.js app	
		cb(null, `${Date.now()}-${file.originalname}`)	
	    });		
 	
*/

	const multer = require('multer');
	const storage = multer.memoryStorage();				    // you can use the diskStorage() function here as well		       	  
	const upload = multer({ storage: storage}); 		      
	
	app.put('/upload_file', upload.single('image'), (req, res) => {      // in upload.single('image'), it will look for the property 'image' in the FormData object that you created on the front-end
	    const {username, email, password} = req.body;	
	    const image = req.file;					    
		/* 
		  req.file = {
			fieldname,			The name of the form field <input name='image'>
			originalname,			The original name of the uploaded file
			encoding,			The encoding type (7bit or base64)
			mimetype,			The file's MIME type (e.g., 'image/png', 'image/jpeg')
			size,				The size of the file in bytes
			buffer,				The raw binary data as an object
		    }
		*/
	});
