/* 
        Downloading a file from the servers disk and sending it to the client

        node-project/
            server.js
            uploads/
                    movie.mp4
*/

const path = require('path');

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath);
});
