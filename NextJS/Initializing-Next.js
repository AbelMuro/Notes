/* 
    Steps for initializing Next.js
    
        1) npm init -y
        
        2) npm install --save react react-dom next
        
        3) use the following scripts for package.json
        
              "dev": "next dev",
              "build": "next build",
              "start": "next start",
              "lint": "next lint"
              
        4) create a /src folder in the root directory, and create a /pages folder inside the /src folder. 
           Then create an index.js and _app.js file inside the /pages folder
        
               /src
                  /pages
                     index.js               // entry to your app
                     _app.js                // used for client-side routing
    
        5)  The index.js file typically looks like this...
    
                import React from 'react';
    
                function App() {
                    return(<> hello world </>)
                }
    
                export default App;
    
         6) The _app.js file typically looks like this...
            (Next.js will use the _app.js to pass every page as props to this file)
    
                import '../common/styles.css';
                
                export default function MyApp({Component, pageProps}) {         //Component is the page that is passed down to this component
                    return(                                                     //pageProps is the getStaticProps() or getServerSideProps() from the page
                        <Component {...pageProps} />        
                    )
                }
    
    
         7) create a public folder in the root of the directory (this will be used for static files, images, icons, etc..)
    
         8) Next.js will follow the same process that React takes to develop an application
*/





*/
