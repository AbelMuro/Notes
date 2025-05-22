/* 
            Web Real Time Connection (webRTC) is a continuous connection between two clients(instances) of an application.
            You need a signaling mechanism that can be used to create a signal from one client to another one.
            Websockets are a good way to create a signaling mechanism, look in the Node.js notes for more info on websockets

    
                                          STEPS FOR WEB RTC
           When the component first mounts, we connect all users to the signaling websocket. At this time, we also create an instance
           of RTCPeerConnection, which is an interface that represents the connection between the local client and the remote client.

           When the local client wants to connect to a remote client, they will first create a local data channel and send an offer to
           the remote client through the signaling websocket.


            

            The signaling websocket should look like this...
            the following websocket will send a 'signal' to all connected clients

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

function useWebRTC(){  
    const signalingServer = useRef();
    const peerConnection = useRef();
    const dataChannel = useRef();

/* 
   1) You will need to create a Data channel that connects the local client to the remote client
      then you create an 'offer' that you send to the signal websocket 

      KEEP IN MIND, only the local client should create a data channel.
      the remote client will connect to this same data channel on the 
      'ondatachannel' event in the peerConnection object
*/
    const sendOfferToRemoteClient = async (remoteClientUsername) => {
          dataChannel.current = peerConnection.current.createDataChannel('chat');            
          dataChannel.current.onopen = () => console.log('Local data channel open'); 
          dataChannel.current.onclose = () => console.log('Local data channel is closed');
          dataChannel.current.onerror = (error) => console.log('Local data channel error: ', error);              //if this event is triggered, then the remote client refreshed the page or pressed the back button
          dataChannel.current.onmessage = (e) => console.log('Local data channel message ', JSON.parse(e.data))   //receiving message from remote client

          const offer = await peerConnection.current.createOffer()
          await peerConnection.current.setLocalDescription(offer);
          signalingServer.current.send(JSON.stringify({ 
              type: 'offer', 
              offer: {sdp: offer.sdp, type: offer.type}, 
              username: remoteClientUsername, 
          }))            
    }



  
/* 
   2) The function below can be used to send messages between the two clients
      since we created a chat data channel, the data should be in strings (or JSON)
*/  

    const sendMessageToRemoteClient = (message) => {
        if(dataChannel.current?.readyState === 'open')
            dataChannel.current?.send(JSON.stringify(message));
    }
    
    const cancelConnection = () => {
        if(!peerConnection.current) return;
        dataChannel.current?.close();  
        setMessage(null);                           //removing any lingering past messages from the previous channel
    }


    useEffect(() => {
        signalingServer.current = new WebSocket('look in node.js notes for more info on websockets');
        peerConnection.current = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                {
                    urls: process.env.TURN_SERVER,
                    username: process.env.TURN_USERNAME,
                    credential: process.env.TURN_CREDENTIAL
                }
            ]
        });

        signalingServer.current.onmessage = async (message) => {
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
        signalingServer.current.onopen = () => console.log('connected to signaling websocket');
        peerConnection.current.onicecandidate = (e) => {                                                                        //WebRTC will collect all ice candidates from the local and remote client,  and select the best one
                                    if(e.candidate) 
                                        signalingServer.current.send(JSON.stringify({type: 'candidate', candidate: e.candidate}));
                                    else
                                        console.log('All ICE candidates have been collected');
        };                                           
        peerConnection.current.oniceconnectionstatechange = () => console.log(`ICE state: ${peerConnection.current.iceConnectionState}`);    //there are 5 states; checking, connected, disconnected, failed, closed... if the state is either (disconnected, failed, closed) then the remote client closed the session
        peerConnection.current.ondatachannel = (e) => {                                                                        //once the remote and the local client are connected, the remote client will receive the data channel from the local client
                                const receivedChannel = e.channel;
                                dataChannel.current = receivedChannel;                                                         //keep a reference to the remote client with a ref object
                    
                                receivedChannel.onmessage = (e) => {                                                           //receiving message from local client
                                    const data = JSON.parse(e.data);
                                    console.log('Received message from remote client ', data);              
                                }
                                receivedChannel.onopen = () => {
                                    console.log("Remote data channel is open!");
                                };
                            
                                receivedChannel.onclose = () => {
                                    console.log("Remote data channel closed");
                                };
                        
                                receivedChannel.onerror = (error) => {                                    //if this event is triggered, the
                                    console.log('Remote data channel error: ', error);
                                }
                            }

        return () => {
            signalingServer.current?.close();
            peerConnection.current?.close();
        }
    }, [])

    return [
        sendOfferToRemoteClient,
        sendMessageToRemoteClient,
        message,
        cancelConnection,
        connected
    ];
}
