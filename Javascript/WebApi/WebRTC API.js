/* 
            Web Real Time Connection (webRTC) is a continuous connection between two clients(instances) of an application.
            You need a signaling mechanism that can be used to create a signal from one client to another one.
            Websockets are a good way to create a signaling mechanism, look in the Node.js notes for more info.        
*/

//---------------------------- RTCPeerConnection()
/* 
            In javascript, we have the RTCPeerConnection API that can be used to create a connection between two clients.
            You must instantiate this class by providing a STUN (Session Traversal Utilities for NAT) server url 
            and a TURN(Traversal Using Relays around NAT) server URL

                STUN: a server that helps devices discover their public IP address and port, which is useful when they are 
                      behind a NAT (Network Address Translation) router. These type of routers allow multiple devices to share
                      a single public IP address, and this will be a problem for the peer-to-peer communication. 
                      Peer-to-peer requires the unique public IP address of the device to create the connection.
    
                TURN: a server that steps in when direct peer-to-peer communication isn’t possible due to restrictive 
                      network conditions. It acts as an middle-man, relaying data between the two clients 
                      to ensure connectivity.
*/

        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },            // you can use the free public STUN server that is provided by google
                {
                    urls: process.env.TURN_SERVER,                   // you can create a free TURN server in    https://www.expressturn.com/#dashboard
                    username: process.env.TURN_USERNAME,
                    credential: process.env.TURN_CREDENTIAL
                }
            ]
        });





//---------------------------- Websocket()
/* 
      For the peer-to-peer connection to work, there must be some kind of signal mechanism that starts 
      the connection process. We can use a websocket for this. All clients that are connected to the
      websocket will receive a 'signal' or 'message' from the websocket that a specific client wants 
      to connect. The following function is how you can implement the websocket, but you need to make 
      changes to the function to ensure that the signal is received by a certain client and not ALL clients


                  function CreateWebSocket(path = 'signaling') {
                        try{
                            const wss = new WebSocket.Server({ noServer: true });
                            global.webSocketHandlers[`/${path}`] = wss;
                    
                            wss.on('connection', (ws) => {
                                console.log('Front-end and back-end are connected, waiting to initiate signal to clients');
                            
                                ws.on('message', (message) => {
                                    wss.clients.forEach(client => {
                                        if(client !== ws && client.readyState === WebSocket.OPEN)                //
                                            client.send(message);   
                                    })
                                })
                            });
                        }
                        catch(error){
                            const message = error.message;
                            console.log(message);
                        }
                    } 
*/

const signalingServer = new WebSocket('look in node.js notes for more info on websockets');






















