/* 
                    Webpack is a bundler that is used to bundle all of the dependecies of an application/website 
                    into one file, bundle.js. This file is then served by the server to the client.


                                                        BUNDLING PROCESS      
                      1) File Analysis 
                              The bundler will look for the entry point of the application (index.js) and will analyze all 
                              imports and dependencies used in the application. The bundler will also check for syntax errors 
                      
                      2) Dependency Graph:
                              Then the bundler starts a dependency graph by linking all the modules and
                              assets together. 
                      
                      3) Transpilation: 
                              Once the dependency graph is completed, the bundler will use babel to transpile any
                              JSX code used in the files. 
                      
                      4) Optimization: 
                               The bundler will implement tree-shaking, this is a process of removing any unused code
                               in the application. All whitespaces will be removed and variable names will be shortened to 
                               optimize the size of the file.

                      5) Bundling: 
                                Once the steps above have been completed, the bundle will bundle all the files into one 
                                file, bundle.js. If the developer implemented lazy-loading, the bundler will split the bundle.js
                                into multiple files, each file will be loaded on the browser when necessary


                    You can configure webpack by exporting an object with the following properties

                    webpack = {
                        entry: ''                            // entry is the directory of the index.js file. Webpack will start its dependency graph based on this file, and will automatically figure out which modules depend on this file   
                        output: {                            // output defines the details of the bundle.js file
                            path: ''                                 // path is the actual directory of the bundle.js
                            filename: ''                             // filename is the name of the bundle.js (can be any name)
                            publicPath: ''                           // publicPath is the base path for all assets. This tells webpack where to look when you reference files (images, fonts, ect..) inside import statements
                            clean: true                              // clean accepts a boolean value that tells webpack to remove old files in the output directory before generating new ones
                            assetModuleFilename: ''                  // assetModuleFilename defines the naming convention for all files that are processed by webpack. [name][ext]
                        },
                        plugins: [],                          // all webpack plugins go here
                        devServer: {                          // devServer is the configuration for the development server
                            port: 3000,                               // port is the actual port where our development server will run
                            historyApiFallback: true,                 // historyApiFallback sets the index.html as a fallback file when the browser makes a request to the development server for a file that doesnt exist (http://localhost:3000/aboutus   ->   browsers sends a request for aboutus.html)
                            proxy: {                                  // proxy is used to forward all fetch requests from one port to another (this is typically used if you are developing a restful API on the same local machine as your front-end)
                                '/': {                                          // forwarding all requests that start at the root '/'
                                    target: 'http://localhost:3000',            // the port that has your front-end application that is making the fetch requests   ->     fetch('/aboutus')
                                    router: () => 'http://localhost:5000'       // the port that has your restful API that will receive all forwaded fetch requests 
                                }
                            }
                        },
                        module: {                                      // module will define how different file types will be processed in webpack
                            rules: [                                   // rules accepts an array of objects. Each object defines how a specific file type will be processed
                                {                                     
                                    test: /\.js$/,                     // test accepts a regular expression that describes the file type we want to process
                                    use: {                             // use will define how we will process the file type
                                        loader: 'babel-loader',        // loader will load the babel transpiler to transpile javascript
                                        options: {                     // options for the transpiler
                                            presets: [                 
                                                '@babel/preset-env',   // this will transpile all ES6 JS syntax into JS that the browser can understand
                                                '@babel/preset-react'  // this will transpile all JSX code into react.createElement()
                                            ]} 
                                    }                                                                
                                }
                            ]
                        },
                    }
*/



//------------------------------- Initializing Webpack
/* 
    You can initialize webpack by creating a file named webpack with the extention
    config.js. In this file, you must export an object with the module.exports. The
    exported objects has all the properties that will configure webpack. 
    This file should always be at the root path of your project.
*/

module.exports = {}




//------------------------------- Entry
/* 
    Entry is the directory of the index.js file. Webpack will start its 
    dependency graph based on this file, and will automatically figure 
    out which modules depend on this file. You can also pass an object 
    to specify multiple entry points, this is useful for multi-page applications
*/

module.exports = {
  entry: './src/index.js',
  entry: {
      about: './src/about.js',
      contact: './src/contact.js',
  }
}




//------------------------------- Output
/* 
    Output describes the details of the bundle.js file that is
    generated by webpack after we start the bundling process.
    The output property accepts an object with the following properties

              path:     path is the directory of the bundle.js
              filename:   filename is the name of the bundle.js (can be any name)
              publicPath:  publicPath is the base path for all assets. This tells webpack where to look when you reference files (images, fonts, ect..) within import statements
              clean:     clean accepts a boolean value that tells webpack to remove old files in the output directory before generating new ones
              assetModuleFilename:   assetModuleFilename defines the naming convention for all files that are processed by webpack. [name][ext]
*/

const path = require('path');    

module.exports = {
      output: {                                             
        path: path.join(__dirname, '/dist'),  
        filename: 'bundle.js',                
        publicPath: '/',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
}







//------------------------------- DevServer
/* 
    The devServer property can be used to configure the development server
    used by webpack

          static: ''                    static defines the directory where files should be included in your dev server (public folder or any folder that has files that are not explicitly imported in your project)
          compress: boolean             compress enables the compression of files in the project for faster load times.         
          port: ''                      port specifies the port number for the server.         
          hot: boolean                  hot enables Hot Module Replacement (HMR) for live updates everytime there is a change in one of the files.        
          open: boolean                 open automatically opens the browser when the server starts.       
          historyApiFallback:           historyApiFallback helps with routing in our react app, everytime we refresh the page, react router will send a request to the dev server, but this property will make sure it searches for an index file first              
          allowedHosts: ['locahost', 'myDomain.com', 'all']   allowedHosts lets certain domains access the dev server (if you type http://'myDomain.com in the browser, you will be able to visit the website from the dev server)
          watchFiles: ['src/**/*.html']              Watches specific files for changes and triggers reloads.    ** means all folders in between, * means all file names    
/*        proxy: {                      proxy will forward all API requests made to an endpoint to a different URL
              '/': {                                          http://localhost:3000/login
                  target: 'http://localhost:3000',            will only forward requests that are send from this port
                  router: () => 'http://localhost:5000'       all requests will be forwarded to this port
              }
          }                              
          https: {                      https can enable the dev server to connect to back end services with https, instead of http (setting this value to true will create a self-signed certificate, passing an object will create a trusted certificate) 
              key: fs.readFileSync('path/to/key.pem'),
              cert: fs.readFileSync('path/to/cert.pem'),
              ca: fs.readFileSync('path/to/ca.pem'),
          }      
          client: {                     Configures how console-logging is done by webpack (error messages, warning messages, etc..)
              logging: ''                  Defines which type of logs will be shown in the browser console ('verbose' (detailed), 'info', 'warn', 'error', or 'none').    
              progress: boolean            Displays the build progress in the browser.           
              overlay: {                   Shows the console-logs done by webpack directly in the browser as an overlay. 
                  error: true,                    will show error messages in the overlay
                  warnings: true                  will show warning messages in the overlay
              }                             
              webSocketURL: {              Configures the websocket used by webpack for live reloading (you should use this property if you are running webpack in a non-localhost enviroment)
                  hostname: "localhost",          hostname can be a custom domain (myexample.com),    defaults to 'localhost'
                  port: 8080,                     port used by webpack,    defaults to the same port as the dev server
                  pathname: "/ws",                specifying endpoint used for the websocket,    defaults to '/ws'
                  protocol: "ws"                  ws or wss,    defaults to the protocol used by the dev server (http or https)
                } 
          }    
         setupMiddlewares: (middlewares, devServer) => {    You can create a mock Restfull API with this property
                  const express = require('express');
    
                  devServer.app.use(express.json())
             
                  devServer.app.get("/api/items", (_, res) => {
                        res.json({mockData: 'mock'});
                  });
            
                  devServer.app.post("/api/items", (req, res) => {           
                        const body = req.body;
                        res.json({ message: "Item added", success: true });
                  });
            
                  devServer.app.delete("/api/items/:id", (req, res) => {
                    res.json({ message: `Item ${req.params.id} deleted`, success: true });
                  });
            
                  middlewares.push((req, res, next) => {                        creating middleware for every request made to /api
                    console.log(`Request received: ${req.url}`);
                    next();
                  });
            
                  return middlewares;
            }
  }            
*/


devServer: {                              //configuration property for the development server
    port: 3000,                           //the devServer will start in port 3000
    historyApiFallback: true,             //this property helps with routing in our react app, everytime we refresh the page, react router will send a request to a server, but this property will make sure it searches for an index file first
    proxy: {                              //the proxy will forward all requests to the specified port
        '/': {                                     //http://localhost:3000/login
            target: 'http://localhost:3000',            //will only forward requests that are send from this port
            router: () => 'http://localhost:5000'       //all requests will be forwarded to this port
        }
    }
},




//------------------------------- Plugins
/* 
     Plugins property will accept an array of objects that each
     give additional functionality to webpack
*/

module.exports = {
  plugins: []
}




//------------------------------- modules
/* 
    The module property allows you to set rules on how certain files are loaded, 
    and you can apply transformations to those files (typescript to javascript, sass to css)
    The module property accepts an object with the rules property. The rules property accepts
    an array of object that has the following properties

        test:              test is a regular expression that matches a specific file 
        exclude: ''        exclude can ignore certain files 
        use: {             use will let us apply a transformation (can be an object or array of objects)
            loader: ''     the name of the loader (can be a string or array)
            options: ''    you can specify which loaders will be used by the loader (some loaders have plugins that each have its own functionality)
        }

*/

module.exports = {
  module: {
    rules: []
  }
}





//------------------------------ asset/resources
/* 
      The asset/resource can enable webpack to load assets (images, videos, audio) as resources
      in the output directory. In other words, webpack will automatically make a copy of
      all assets and move these copies to the /dist folder

*/

  module: {
      rules: [                               
          {
              test: /\.(png|jpg|webp|mp4|wav|svg)$/,
              type: 'asset/resource'                                           
          }
      ]
  },





