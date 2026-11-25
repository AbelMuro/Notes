/* 
                              STREAMS

              Streams enable node.js to process data piece by piece (or chunk) instead of processing everything at once.
              There are 4 types of streams...
*/

/* 
              - Readable 
                    A readable stream is data that can be read. This type of stream has an origin (client, file)
                    and the stream will contain the contents of this origin and can be read by the back-end
*/

                    app.post('/login', (req, res) => {
                        const body = req.body;            //the req object is a readable stream
                        console.log(body)
                    });

/* 
                - Writable      
                    A writable stream can be used to write data to. This type of stream is used to write
                    data into, then it can be sent to a destination (client, file)
*/

            
                    app.post('/login', (req, res) => {
                       return res.status(200).send('User has logged in');     //the res object is a writable stream
                    })

/* 

               - Duplex  
                   A duplex stream can be used to write AND read data.
                   Websockets are a perfect example of duplex streams
*/

                  const WebSocket = require('ws');
                  const wss = new WebSocket.Server({server});
          
                  wss.on('connection', socket => {
                      socket.on('message', message => {
                          console.log(message.toString());
                          socket.send('Message received');
                      });
                  });


  /* 
            - Transform     
                    A transform stream reads data, changes the data somehow and then outputs the transformed 
                    version. The example below will read the contents of a file, change the content, and
                    then output the new content to a new file 
                    (keep in mind that this stream will not update the original file)
  */
    
            const fs = require('fs');
            const { Transform } = require('stream');
            
            const uppercaseTransform = new Transform({
                  transform(chunk, encoding, callback) {
                    const uppercased =
                      chunk.toString().toUpperCase();
                
                    callback(null, uppercased);
                  }
            });


            const readStream = fs.createReadStream('input.txt');
            const writeStream = fs.createWriteStream('output.txt');
            
            readStream.pipe(uppercaseTransform).pipe(writeStream);
              

