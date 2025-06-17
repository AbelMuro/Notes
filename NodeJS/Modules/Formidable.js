//---------------------------------------- FORMIDABLE MODULE ----------------------------------------
/* 
	Formidable module is used for parsing incoming Form data. The form fields will be temporarily
 	stored in RAM, but the files will be stored in the servers' disk storage. If you are not planning
  	on keeping the files that were uploaded from the front-end, then you can delete the files by using
        fs.unlink(). The directory of the file is set with form.uploadDir.

 	The Front-end can send form data in two ways; Inside a <form/> tag or with a fetch request

		Using the Form tag:
		    	<form action="/upload" method="POST" enctype="multipart/form-data">
			    <input type="text" name="username" placeholder="Enter your name">
			    <input type="file" name="profilePic">
			    <button type="submit">Upload</button>
			</form>
	
		Using a Fetch Request:
	  		const formData = new FormData();
			formData.append("username", "Abel");
			formData.append("profilePic", document.querySelector("#fileInput").files[0]);
			
			fetch("/upload", {
			    method: "POST",					   //no need to specify headers here
			    body: formData
			})
*/

var formidable = require('formidable');                                     //npm install formidable

app.post("/upload", (req, res) => {
    const form = new formidable.IncomingForm();				   // Parses the incoming Form from the front-end and extracts the form fields
    form.uploadDir = path.join(__dirname, "uploads"); 			   // Set upload directory
    form.keepExtensions = true; 					   // Keep file extensions

    form.parse(req, (err, fields, files) => {				   // files can be an array if uploading multiple files
        if (err) {							   // Remember to delete the files that were uploaded, use fs.unlink() to delete them
            res.status(400).json({ error: "Error processing upload" });
            return;
        }
        /* 
	  fields = {
	      name: 'Carlos',
	      age: 34,
	   }	
    
  	   files = {
      		filepath, 		Full path where the uploaded file is temporarily stored.
		originalFilename,  	The original name of the file as submitted by the user.
		mimeType,		The MIME type of the file (e.g., "image/png", "application/pdf").
		size, 			File size in bytes.
		newFilename, 		Generated name for the file when stored.
		hash, 			Hash of the file (if hashing is enabled).
		lastModifiedDate,	Timestamp of when the file was last modified.
	   }
	 */
    });
});

