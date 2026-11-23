/* 
                              STREAMS

              Streams enable node.js to process data piece by piece (or chunk) instead of processing everything at once.
              There are 4 types of streams...

                Readable      - req is a readable stream
                Writable      - res is a writable stream
                Duplex
                Transform

                Streams are mostly used for downloading and uploading data to and from the server
*/  


/* 
    Downloading a file from the servers disk and sending it to the client

        node-project/
            server.js
            movie.mp4
*/

const fs = require('fs');

app.get('/download-movie', (req, res) => {
    res.setHeader(
      'Content-Type',
      'video/mp4'
    );
  
    fs.createReadStream('movie.mp4').pipe(res);
})




/* 
    Uploading a file to the server's disk from the client
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
