/* 
        Uploading files using streams

        node-project/
                server.js
                /uploads
*/

const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({dest: 'uploads/'} or {storage});              // if you want to preserve the original name of the file, use {storage}             
                                                                     // otherwise, mutler will generate a name for the file
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);

    res.status(200).json({message: 'Upload successful', filename: req.file.filename, originalName: req.file.originalname});
  }
);




//front end

<form action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form>
