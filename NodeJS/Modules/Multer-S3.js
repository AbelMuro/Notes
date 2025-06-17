//---------------------------------------- MULTER-S3 MODULE ----------------------------------------
/* 
	You can also use the multer module to upload files into an S3 Bucket
	Go to the AWS Console and create an S3 bucket. Then go to your 
 	account on the top right corner and click on Security Credentials.
  	Create a new access key, and then copy the secret access key that is 
   	also generated. The signature version should be v4

	Make sure that the IAM user that is using the S3 bucket has full access
 	to that bucket
 
	npm install @aws-sdk/client-s3
	npm install multer
	npm install aws-sdk
 	npm install multer-s3

*/    
	const aws = require('aws-sdk');
	const multer = require('multer')
	const multerS3 = require('multer-s3')

	const s3 = new aws.S3({
	    region: 'us-west-1',
	    accessKeyId: process.env.ACCESS_KEY_ID,
	    secretAccessKey: process.env.SECRET_ACCESS_KEY,
	    signatureVersion: process.env.SIGNATURE_VERSION,
	});
	
	const upload = multer({
	    storage: mutlerS3({
		s3: s3,
		bucket: 'personal-finance-app',
		key: (req, file, cb) => {
		    cb(null, `${Date.now()}-${file.originalname}`);
		}
	    })
	});

	app.post('/add_transaction', upload.single('image'), (req, res) => {		
		const image = req.file									
			/* 
			  req.file = {
     				location			The URL of the uploaded file in S3
				fieldname,			The name of the form field <input name='image'>
				originalname,			The original name of the uploaded file
				encoding,			The encoding type (7bit or base64)
				mimetype,			The file's MIME type (e.g., 'image/png', 'image/jpeg')
				size,				The size of the file in bytes
				bucket,				The name of the s3 bucket used to store the file
    				key,				The unique file name assigned to the file in S3
				acl,				The access control level (public read, private)
    				metadata,			The meta data of the file uploaded
				etag,				A unique hash representing the uploaded file in S3.
			    }
			*/
	})

