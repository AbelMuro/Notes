/* 
            Web Real Time Connection (webRTC) is a continuous connection between two clients(instances) of an application.
            You need a signaling mechanism that can be used to create a signal from one client to another one.
            Websockets are a good way to create a signaling mechanism, look in the Node.js notes for more info.     



                                                HANDSHAKE
            
                                                

            1) The local client creates a RTCPeerConnection() object

            2) The local client calls the .createDataChannel() method to create a channel that can be 
               used between two clients to connect to each other

            3) The local client calls .createOffer() method to generate its SDP 

            4) The local client calls .setLocalDescription() method to declare that the SDP belongs to the local client.

            5) The local client sends the SDP object returned from .createOffer() through the websocket.

            6) The remote client receives the SDP object and calls the .setRemoteDescription() method to declare that 
               the received SDP object belongs to the local client.

            7) The remote client calls the .createAnswer() method to generate its SDP

            8) The remote client calls the .setLocalDescription() method to declare that the SDP belongs to the remote client.

            9) The remote client sends the SDP object returned from .createAnswer() through the websocket

            10) The local client receives the SDP object and calls the .setRemoteDescription() method to declare that
               the received SDP object belongs to the remote client

            11) Once both clients have exchanges SDP information, each client will begin gathering ICE candidates

            12) Both clients will send their ICE candidates to each other through the websocket
                and each candidate will be checked to see if the candidate can be used for
                the clients to connect to each other
                
            
*/








//---------------------------- RTCPeerConnection()
/* 
            In javascript, we have the RTCPeerConnection API that can be used to create a connection between two clients.
            You must instantiate this class by providing a STUN (Session Traversal Utilities for NAT) server url 
            and a TURN (Traversal Using Relays around NAT) server URL

                STUN: a server that helps devices discover their public IP address and port, which is useful when they are 
                      behind a NAT (Network Address Translation) router. These type of routers allow multiple devices to share
                      a single public IP address, and this will be a problem for the peer-to-peer communication. 
                      Peer-to-peer requires the unique public IP address of the device to create the connection.
    
                TURN: a server that steps in when direct peer-to-peer communication isn’t possible due to restrictive 
                      network conditions. It acts as an middle-man, relaying data between the two clients 
                      to ensure connectivity.

            Methods and properties of RTCPeerConnection:


                        .createOffer()                           
                        .setLocalDescription()                  // this method will set the Session Description Protocol(SDP) of the local client. 
                                                                   The SDP contains information about the media capabilities (audio, video, resolutions, bandwidth limits),
                                                                   connection details (IP address and port), and network settings of the local client
                                                                   
                        
                        .setRemoteDescription()                 // this method will configure the connection of the local client based on the SDP of the remote client
                        .createAnswer()
                        
                        .addIceCandidate()
                
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









//---------------------------- Signaling Mechanism
/* 
      For the peer-to-peer connection to work, there must be some kind of signal mechanism that starts 
      the connection process. We can use a websocket for this. All clients that are connected to the
      websocket will receive a 'signal' or 'message' from the websocket that a specific client wants 
      to connect. The following function is how you can implement the websocket, but you need to make 
      changes to the function to ensure that the signal is received by a certain client and not ALL clients.

                  function CreateWebSocket(path = 'signaling') {
                        try{
                            const wss = new WebSocket.Server({ noServer: true });
                            global.webSocketHandlers[`/${path}`] = wss;
                    
                            wss.on('connection', (ws) => {
                                console.log('Front-end and back-end are connected, waiting to initiate signal to clients');
                            
                                ws.on('message', (message) => {
                                    wss.clients.forEach(client => {
                                        if(client !== ws && client.readyState === WebSocket.OPEN)               
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

signalingServer.onmessage = async (message) => {
              const text = await message.data.text();
              const data = JSON.parse(text);
          
              if(data.type === 'offer' && peerConnection.signalingState === 'stable') {               //we handle a connection here (when a local client wants to connect to a remote client)
                  await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));       //we create a remote description of the offer  (remote description are the connection settings of the OTHER peer)
                  const answer = await peerConnection.createAnswer();                                     //we create an answer in response to the offer
                  await peerConnection.setLocalDescription(answer);                                       //we create a local description of the answer we created
                  signalingServer.send(JSON.stringify({ type: 'answer', answer }));                       //we send the answer to the websocket
              } 
              else if(data.type === 'answer' && peerConnection.signalingState === 'have-local-offer'){ //we finalize the connection here, the remote client will send an answer to the local client, enabling the connection
                  await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));      //we create a remote description of the answer from another peer
              } 
                  
              else if(data.type === 'candidate' && peerConnection.signalingState !== 'closed')          //we handle all ice candidates here
                  await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));               //we add an ice candidate (a potential network path) to the connection                  
      };   









