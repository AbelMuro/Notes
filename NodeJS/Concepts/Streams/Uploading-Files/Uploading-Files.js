/* 
        Uploading files using streams

        node-project/
                server.js
                /uploads
*/

const multer = require('multer');
const upload = multer({dest: 'uploads/'});                   

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
