//---------------------------------------- WEBSOCKET MODULE ----------------------------------------
/* 
	You can create a WEBSOCKET in your node.js app that creates a connection between the front-end and the back-end
	typically this connection is used to automatically send data between front-end and back-end when theres a changes in the
	database or an event that is triggered in the front end

	For both HTTP and HTTPS, you will need the 'upgrade' event to be defined. The upgrade event will
 	upgrade an HTTP request into a websocket connection

		httpsServer.on('upgrade', (request, socket, head) => {
		    const { pathname } = new URL(request.url, `http://${request.headers.host}`);         //will extract only the path portion of the url, (https://my-socket.com/query    ->     /query)
		    const wss = global.webSocketHandlers[pathname];      				// we access a list of websockets we already created
		    
		    if (wss) {						   				// if the request url already has a websocket
			wss.handleUpgrade(request, socket, head, (ws) => {
			    wss.emit('connection', ws, request);
			});
		    } else 
			socket.destroy();                                   				// Gracefully close invalid connections
		});
*/





//----------- CREATING WEBSOCKETS
/*
	You can use the Websocket.Server() constructor to create a websocket

	syntax:
 		const wss = new WebSocket.Server({noServer: true});

   		wss.on('connection', callback);						// 'connection' event will be triggered when front-end and back-end are connected

     		callback = (ws, req) => {						// 'ws' is an instance of a user that connected to the front-end, every user will have their own instance
											// 'req' is an object that represents the request sent by the front-end to the back-end
			ws methods:							// keep in mind, that 'ws' is an object that can store custom properties and methods 
				ws.send('JSON data');					// ws.send() will send data to the front-end (YOU have to call this function, its best to use it in some event handler)
				ws.close();				 		// ws.close() will close the websocket
				ws.on('message', (message) => {			        // 'message' event will be triggered when the front-end sends a message to the back-end
				     const messageFromFrontEnd = JSON.parse(message);
				})   				  
				ws.on('close', () => {})                                 // 'close' event will be triggered when the front-end disconnectsfrom the back-end
		  
			req methods:
				req.url,             					// The URL used to connect, including query params
				req.headers,     					// Contains request headers (req.headers.cookie) NOT HTTP-ONLY COOKIES
				req.method,       					// HTTP method (usually "GET" for WebSocket connections)
				req.connection, 					// Information about the TCP connection
				req.socket,       					// Raw socket instance
				req.socket.remoteAddress, 				// Client's IP address
				req.socket.remotePort 					// Client's port number
       
		};					
*/

	const WebSocket = require('ws');

	const createWebSocket = (path = 'queue') => {	
	        const wss = new WebSocket.Server({noServer: true});     	    // we use the same server that our node.js app is running on for the websocket

		global.webSocketHandlers[`/${path}`] = wss;			    // we save the websocketHandler in our global list
		
	        wss.on('connection', (ws, req) => {      
		    ws.custom = 'any data';				            // keep in mind that you can save custom properties for each specific instance of the websocket
	            ws.send('data must be in json format')                          
		    ws.close();				 			   
	            ws.on('message', (message) => {			           
			const messageFromFrontEnd = JSON.parse(message);
		    })   				  
	            ws.on('close', () => {                                         
	                console.log('Client disconnected')
	            })
		    wss.clients.map((client) => {				      // you can traverse through all the clients that are connected to this websocket
		     /* 
			 	client.readyState; 				      // Indicates the connection status. It can be WebSocket.OPEN, WebSocket.CLOSED, etc.			
				client.protocol; 				      // If the client specified a subprotocol during the handshake, it will be stored here.		
				client.url; 					      // Contains the URL the client connected to.		
				client.extensions; 				      // Lists any WebSocket extensions in use.		
				client.on(event, callback); 			      // Lets you handle events like "message", "close", "error", etc.
				client.send(data); 				      // Allows sending data to the client.	
				client.terminate();				      // Immediately terminates the connection.		
				client.close(code, 'reason'); 			      // Gracefully closes the connection with an optional code and reason.
			*/									// code is an integer 
		    })										// 1000 (normal closure)   			     1001 (Going away e.g., client navigating away)
		})										// 1006 (Abnormal closure cannot be set manually)    1011 (Server encountered an unexpected condition)


//------------ CLOSING WEBSOCKETS

	const CloseWebSocket = (path) => {
	    global.webSocketHandlers[`/${path}`].close();
	}

	const CloseAllWebSockets = () => {
		const websockets = global.webSocketHandlers;

	        for(let wss of Object.values(websockets)){
	            wss.clients.forEach((client) => {				// disconnecting any client connections, before we close the websockets
	                if(client.readyState === WebSocket.OPEN)		// const WebSocket = require('ws')
	                    client.close();
	            });  
	
	            wss.close();
	        }     
	        global.webSocketHandlers = {};
	}



//------------- CONNECTING TO THE WEBSOCKET FROM THE FRONT-END
/* 
	Keep in mind that the websocket url can be used with query parameters
 	This is another useful way for sending data to the back-end

 		wss//my-back-end-domain.com:443/queue?username=random
*/
				//development			//production (443 is the default port for https)
        const WEBSOCKET_URL = 'ws://localhost:8000/queue'  or   'wss//my-back-end-domain.com:443/queue'     

        const connectToWebSocket = () => {         
            const socket = new WebSocket(WEBSOCKET_URL);            	   // make sure the port is the same on the web socket in the back-end

	    socket.send('sending data to the back-end');		   // socket.send() will send data to the back-end

	    socket.close();						   // socket.close() will close the connection between the front-end and the back-end
		
            socket.onopen = () => {                                        // onopen() event will be triggered when the front-end has connected to the back-end
                console.log('Connected to WebSocket server');
            };
        
            socket.onmessage = (e) => {					   // onmessage() event will be triggered when the back-end sends data to the front-end 	
		const change = e.data;
	    };                          
        
            socket.onclose = () => {					   // onclose() event will be triggered when the front-end disconnects from the back-end
                console.log('Disconnected from WebSocket server');
            };
        
            socket.onerror = (error) => {				   // onerror() event will be triggered when an error occurred
                console.error('WebSocket error:', error);
            };
        }

