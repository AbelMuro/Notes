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
