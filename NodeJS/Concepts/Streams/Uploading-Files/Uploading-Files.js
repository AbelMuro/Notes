/* 
        Uploading files using streams
*/


const fs = require('fs');

app.post('/upload', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', 'upload.zip');
    const writeStream = fs.createWriteStream(filepath);
  
    req.pipe(writeStream);                        // this only works if the client sends the raw bytes of the file in the request body
  
    writeStream.on('finish', () => {
      res.status(200).send('Upload complete');
    });
  
    writeStream.on('error', err => {
      console.error(err);
      res.status(500).send('Upload failed');
    });
});
