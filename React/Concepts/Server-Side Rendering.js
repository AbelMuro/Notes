/* 
                                                                SERVER SIDE RENDERING
                                                                
                       Server side rendering is the process of rendering your application on the server and sending 
                       it to the client as fully rendered HTML pages 
                       
                                1. First, we fetch data from the server for the entire application.                      
                                2. Then we render the HTML for the entire application in the server and send it to the client
                                3. Load javascript to the client for the entire application
                                4. Then Hydrate the page for the entire application (rendering components and attaching event handlers)     
                                
                        In React 18, suspense on the server (server-side rendering) is implemented by using the 'renderToPipeableStream' API
                        renderToPipeableStream() is a new API that allows you to render a React tree to a pipeable Node.js stream, 
                        which can improve the performance and user experience of server-side rendering     

*/


import ReactDOM, {hydrateRoot} 'react-dom/client';             //importing methods from built in packages in react
import App from './components';

const root = document.getElementById('root')                                 

//For server-side rendering            
const hydrateRoot = hydrateRoot(root);     // Create a root and attach React to the existing HTML
hydrateRoot.render(<App />);
