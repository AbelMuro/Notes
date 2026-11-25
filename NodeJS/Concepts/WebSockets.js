/* 
                                        WEBSOCKETS
    
    Websockets are a persitent 2-way connection between the client and the server. This connection can be used by 
    chat apps, collaborator apps, multiplayer games.

        npm install ws
*/

    const express = require('express');
    const WebSocket = require('ws');
    
    const app = express();
    const server = app.listen(3000);
    const wss = new WebSocket.Server({server});
    
    wss.on('connection', socket => {
        console.log('Client connected');
      
        socket.on('message', message => {
            console.log(message.toString());
            socket.send('Message received');
        });

        wss.clients.forEach((client) => {                  // Send message to every connected client
          if (client.readyState === WebSocket.OPEN) 
            client.send(JSON.stringify({type: 'chat', username: data.username, message: data.message}));
        });
    });



