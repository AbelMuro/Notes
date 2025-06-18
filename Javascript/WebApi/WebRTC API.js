/* 
            Web Real Time Connection (webRTC) is a continuous connection between two clients(instances) of an application.
            You need a signaling mechanism that can be used to create a signal from one client to another one.
            Websockets are a good way to create a signaling mechanism, look in the Node.js notes for more info.     



                                                HANDSHAKE   
                                                
            For two clients to connect, they must exchange their Session Description Protocol (SDP). 
            SDP is a format that describes the media capabilities (video, audio, resolutions, bandwidth), 
            the IP address, ports, and network settings of the client. The SDP format looks like the following

                                    v=0
                                    o=- 123456 654321 IN IP4 192.168.1.10            // session ID
                                    s=WebRTC Call                                   
                                    c=IN IP4 203.0.113.1                             // public IP address
                                    t=0 0                                                
                                    m=audio 49152 RTP/AVP 96                         // media details (audio/video, port, codec)
                                    a=rtpmap:96 opus/48000/2                         // atttributes (codec details like opus)

            1) The local client creates a RTCPeerConnection() object and connects to the websocket in the same callstack.
               Once the connection to the websocket has been established, you can proceed to step 2 
               (Keep in mind, for every object you send through the websocket, there should be a 'from' and 'to' property)

                        const signalingServer = new WebSocket();
                        const peerConnection = new RTCPeerConnection();
                        signalingServer.onmessage = () => {}
                        signalingServer.onopen = () => {}
                        peerConnection.onicecandidate = () => {}
                        peerConnection.oniceconnectionstatechange = () => {}
                        peerConnection.current.ondatachannel = () => {}

            2) The local client calls the .createDataChannel() method. Keep in mind, that only one client
                should call .createDataChannel(). All the steps below should happen synchronously.
            
                        const dataChannel = peerConnection.createDataChannel('chat');
                        dataChannel.onopen = () => {}
                        dataChannel.onclose = () => {}
                        dataChannel.onerror = () => {}
                        dataChannel.onmessage = () => {}

            3) The local client calls .createOffer() method to generate its SDP 
            
                        const offer = await peerConnection.createOffer()

            4) The local client calls .setLocalDescription() method.

                        await peerConnection.setLocalDescription(offer);

            5) The local client sends the SDP object returned from .createOffer() through the websocket.

                        signalingServer.send(JSON.stringify({ 
                             type: 'offer', 
                             offer: {sdp: offer.sdp, type: offer.type}, 
                             to: remoteClientUsername, 
                             from: localClientUsername
                        })) 

            6) The remote client receives the SDP object and calls the .setRemoteDescription() method

                         signalingServer.onmessage = (data) => {
                                if(data.type === 'offer' && peerConnection.signalingState === 'stable'){
                                     await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                                     //make sure to store the remote clients username somewhere 
                                }
                                     
                         }

            7) The remote client calls the .createAnswer() method to generate its SDP

                        signalingServer.onmessage = () => {
                              if(data.type === 'offer' && peerConnection.signalingState === 'stable')
                                    const answer = await peerConnection.createAnswer()
                        }

            8) The remote client calls the .setLocalDescription() method to declare that the SDP belongs to the remote client.

                        signalingServer.onmessage = () => {
                               if(data.type === 'offer' && peerConnection.signalingState === 'stable')
                                     await peerConnection.setLocalDescription(answer)
                        }

            9) The remote client sends the SDP object returned from .createAnswer() through the websocket

                        signalingServer.onmessage = () => {
                               if(data.type === 'offer' && peerConnection.signalingState === 'stable')
                                     signalingServer.send(JSON.stringify({ type: 'answer', answer })); 
                        }

            10) The local client receives the SDP object and calls the .setRemoteDescription() method to declare that
               the received SDP object belongs to the remote client.
               
                        signalingServer.onmessage = (data) => {
                             if(data.type === 'answer' && peerConnection.signalingState === 'have-local-offer')
                                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
                        }

            11) Once both clients have exchangec SDP information, each client will begin gathering ICE candidates



                                                ICE candidate gathering
                                                
             Once the initial handshake is done and both clients exchanged SDP information,  they will exchange
             Interactive Connectivity Establishment (ICE) candidate information. Each candidate is a potential 
             network path that both clients can use to create a connection with each other. Below are some examples 
             of ICE candidates.

                         Local Network (private IP address)                  // device was able to find its own IP address
                         STUN server (public IP discovery)                   // device was NOT able to find its own IP address, so the STUN server helps find it
                         TURN server (relay if connection fails)             // a server that is used as a middleman between the two clients, it receives the message from one client and sends it to the other client

            1) The local client and the remote client will start gathering ICE candidates and sends them through the websocket

                        peerConnection.onicecandidate = (e) => {
                             signalingServer.send(JSON.stringify({
                                    type: 'candidate', 
                                    candidate: e.candidate,
                                    to: remoteClientUsername,
                                    from: localClientUsername
                             }));
                        }

            2) Both clients will receive the ICE candidates from each other and use the .addIceCandidate() method
               to perform connectivity checks for each ICE candidate 

                        signalingServer.onmessage = (data) => {
                             await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                        }

            3) Once the best ICE candidate has been choosen, the remote client will receive the data channel created 
               by the local client and both clients can finally connect.

                            peerConnection.ondatachannel = (e) => {
                               if(data.type === 'candidate' && peerConnection.signalingState !== 'closed')
                                    const receivedDataChannel = e.channel;
                            }
                            
            4) The local client can send data to the remote client
            
                        dataChannel.send(JSON.stringify(message));

            4.5) The local client can receive data from the remote client

                         dataChannel.onmessage = () => {}
                                    
            5) The remote client can send data to the local client
                        
                          peerConnection.ondatachannel = (e) => {
                                    const receivedDataChannel = e.channel;
                                    receivedDataChannel.send(JSON.stringify(message))
                          }

            5.5) The remote client can receive data from the local client

                        peerConnection.ondatachannel = (e) => {
                                    receivedDataChannel.onmessage = () => {}
                          }
*/








//====================================== RTCPeerConnection() ======================================
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


        peerConnection.close();                                    // calling the close() method will close the connection, the RTCPeerConnection() will have to be instantiated again




//---------------------------- .createDataChannel()
/* 
      You can use the .createDataChannel() to create a data channel that enables two clients
      to send text/data messages to each other. The .createDataChannel() also has event handlers
      that can be assign callbacks that will be called when the event is triggered

                  onopen:    will be triggered when the data channel has both clients connected to each other
                  onclose:   will be triggered when the local client closed the connection with dataChannel.close()
                  onerror:   will be triggered when one of the clients loses connection (most likely the client left the session by refreshing or click on the back button)
                  onmessage: will be triggered when the remote client sends a text/data message to the local client
                  close():   will close the data channel and the connection
*/

          const dataChannel = peerConnection.createDataChannel('chat');            
          dataChannel.onopen = () => console.log('Local data channel open'); 
          dataChannel.onclose = () => console.log('Local data channel is closed');
          dataChannel.onerror = (error) => console.log('Local data channel error: ', error);             
          dataChannel.onmessage = (e) => {
                      console.log('Local data channel message ', JSON.parse(e.data)                   
            })   
          dataChannel.close()





//---------------------------- .ondatachannel
/* 
            The ondatachannel property is an event handler that accepts a callback
            that will be called when the local client has connected to the remote client.
            The local client will have access to the datachannel that the remote client 
            created with .createDataChannel(). The received data channel in the callback
            can have the following event handlers

                  onopen:    will be triggered when the data channel has both clients connected to each other
                  onclose:   will be triggered when the local client closed the connection with dataChannel.close()
                  onerror:   will be triggered when one of the clients loses connection (most likely the client left the session by refreshing or click on the back button)
                  onmessage: will be triggered when the remote client sends a text/data message to the local client
                  close():   will close the data channel and the connection
*/


        peerConnection.ondatachannel = (e) => {                                                                      
                    const receivedChannel = e.channel;
        
                    receivedChannel.onmessage = (e) => {                                                          
                        const data = JSON.parse(e.data);
                        console.log('Received message from remote client ', data);              
                    }
                    receivedChannel.onopen = () => {
                        console.log("Remote data channel is open!");
                    };
                
                    receivedChannel.onclose = () => {
                        console.log("Remote data channel closed");
                    };
            
                    receivedChannel.onerror = (error) => {                                    
                        console.log('Remote data channel error: ', error);
                    }

                    receivedChannel.close()
                }

                 


//---------------------------- .createOffer()
/* 
            You can use the .createOffer() method to generate the SDP of the local client.
            SDP is a format that describes the media capabilities (video, audio, resolutions, bandwidth), 
            the IP address, ports, and network settings of the client. The SDP format looks like the following

                        v=0
                        o=- 123456 654321 IN IP4 192.168.1.10            // session ID
                        s=WebRTC Call                                   
                        c=IN IP4 203.0.113.1                             // public IP address
                        t=0 0                                                
                        m=audio 49152 RTP/AVP 96                         // media details (audio/video, port, codec)
                        a=rtpmap:96 opus/48000/2                         // atttributes (codec details like opus)

            The SDP object returned from .createOffer() has two properties that must be sent through the websocket
*/                       

 const offer = await peerConnection.createOffer()

 offer.sdp;                        
 offer.type;







//---------------------------- .createAnswer()
/* 
            You can use the .createAnswer method to generate the SDP of the local client
            based off of the SDP that was sent by the remote client
*/

const answer = await peerConnection.createAnswer()
                      




            

//---------------------------- .setLocalDescription()
/* 
            You can use the .setLocalDescription() to 'declare' that an SDP object 
            belongs to the local client. The argument passed to this method must be an
            object returned from .createOffer() or .createAnswer()
*/

await peerConnection.setLocalDescription(offer);


                                  



//---------------------------- .setRemoteDescription()
/* 
            You can use the .setRemoteDescription() method to 'declare' that an SDP object
            belongs to the remote client. This is typically done when the remote client sends 
            their SDP to the local client. This method accepts an instance of the RTCSessionDescription()
            class.
*/
         
await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))





//---------------------------- .addIceCandidate()
/*
            You can use the .addIceCandidate() method to receive an ICE candidate from
            the remote client. This method will perform a connectivity check on the candidate
            and see if both clients can establish a connection. This method accepts an
            instance of the RTCIceCandidate() class and you must pass the ICE candidate object
            that was sent by the remote client using .onicecandidate.
*/

await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))


                  




//---------------------------- .onicecandidate
/* 
             You can use the .onicecandidate property to create an event handler
             that will be triggered when the client detects a ICE candidate. The
             property accepts a callback that will have access to the ICE candidate object.
             Once we detect an ICE candidate, we send it through the websocket.
             Below are some example of ICE candidates

                         Local Network (private IP address)                  // device was able to find its own IP address
                         STUN server (public IP discovery)                   // device was NOT able to find its own IP address, so the STUN server helps find it
                         TURN server (relay if connection fails)             // a server that is used as a middleman between the two clients, it receives the message from one client and sends it to the other client
*/

peerConnection.onicecandidate = (e) => {                                                        
            if(e.candidate) 
                signalingServer.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
            else
                console.log('All ICE candidates have been collected');
}


                      




//---------------------------- .oniceconnnectionstatechange
/* 
            You can use .oniceconnectionstatechange to create an event handler
            that will be triggered when there is a change in the connection 
            between both clients. Below are the 5 possible states for the 
            connection

            checking, connected, disconnected, failed, closed  (if the state is either disconnected, failed, closed; then the remote client closed the session)
*/

                      
peerConnection.oniceconnectionstatechange = () => {
       console.log(`ICE state: ${peerConnection.iceConnectionState}`)     
}






                      

//---------------------------- signalingState
/*
            You can use the signalingState property to check the current
            state of the peer connection. The property has the following 
            possible values.


            stable	            No active SDP exchange; connection is established or awaiting initiation.
            have-local-offer	Local peer has created an SDP offer but hasn’t received an answer yet.
            have-remote-offer	Remote peer has sent an SDP offer, waiting for a response.
            have-local-pranswer	Local peer has sent a provisional answer (partial response).
            have-remote-pranswer	Remote peer has sent a provisional answer.
            closed	            The connection has been closed and cannot be used anymore.

            
            
*/

peerConnection.signalingState

                      















            

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




//---------------------------- Initializing signaling websocket
/* 
            Look in node.js notes for more info on websockets
*/
                      
const signalingServer = new WebSocket('look in node.js notes for more info on websockets');






                      
//---------------------------- Handling handshake and ICE candidates
/* 
            We can handle the initial handshake and potential ICE candidates with 
            the .onmessage event handler.
*/
signalingServer.onmessage = async (message) => {
              const text = await message.data.text();
              const data = JSON.parse(text);
          
              if(data.type === 'offer' && peerConnection.signalingState === 'stable') {                   //we handle a connection here (when a local client wants to connect to a remote client)
                  await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));       
                  const answer = await peerConnection.createAnswer();                                     
                  await peerConnection.setLocalDescription(answer);                                       
                  signalingServer.send(JSON.stringify({ type: 'answer', answer }));                      
              } 
              else if(data.type === 'answer' && peerConnection.signalingState === 'have-local-offer'){ //we finalize the connection here, the remote client will send an answer to the local client, enabling the connection
                  await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));      //we create a remote description of the answer from another peer
              } 
                  
              else if(data.type === 'candidate' && peerConnection.signalingState !== 'closed')          //we handle all ice candidates here
                  await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));               //we add an ice candidate (a potential network path) to the connection                  
      };   




//---------------------------- Sending Offer to remote client via websocket
/* 
        We can use the send() method to send an offer that contains the SDP 
        of the local client to the remote client
*/
                      
signalingServer.send(JSON.stringify({ 
  type: 'offer', 
  offer: {sdp: offer.sdp, type: offer.type}, 
}))  





//---------------------------- Sending answer to remote client via websocket
/* 
        We can use the send() method to send an answer that contains the SDP
        of the local client to the remote client. This is typically done after
        the remote client sent an initial offer to the local client
*/

 signalingServer.send(JSON.stringify({             
       type: 'answer', 
       answer 
 }));   







                      



