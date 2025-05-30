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






  
//------------------------------- html-webpack-plugin
/* 
     This plugin can help us configure the html files in our project.
     More specifically, this plugin will be mostly used to configure the 
     index.html file in the project. Keep in mind, you can make a multi-page 
     application with this plugin. Every page in the application must have a 
     corresponding object of the html-webpack-plugin constructor. The plugin 
     is a function constructor that accepts an object with the following properties...

              filename:                                Defines the name of the html file (default is index.html). 
              favicon:                                 Specifies the directory of a favicon for the HTML file.       
              template:                                Specifies the directory of the template index.html file.
              inject:                                  Determines where scripts are injected 
                                                              true:  by default, scripts are set in body
                                                              false: we manually set the scripts, 
                                                              'head': all scripts are loaded in the <head> tag 
                                                              'body': all scripts are loaded in the <body> tag        
              title:                                   Sets the <title> of the generated HTML.     
              meta: {                                  Allows you to define the meta tags dynamically. Each property defines the name attribute and the value defines the content attribute of the meta tag
                  viewport: 'width=device-width, initial-scale=1',            <meta name="viewport" content="width=device-width, initial-scale=1">       
                  description: 'This is a sample description for SEO',        <meta name="description" content="This is a sample description for SEO">
                  author: 'Your Name',                                        <meta name="author" content="Your Name">
                  'theme-color': '#ffffff',                                   <meta name="theme-color" content="#ffffff">
                  'og:image': 'https://example.com/image.jpg',                <meta property="og:image" content="https://example.com/image.jpg">
              }
              minify: {                                 Enables HTML minification (useful for production).   
                  collapseWhitespace: true,
                  removeComments: true,
                  removeRedundantAttributes: true,      removes attributes that don't do anything to the tag
                  useShortDoctype: true,                converts the <!DOCTYPE html> into lower case, can be used to save of a few bytes
                  removeEmptyAttributes: true,
                  minifyCSS: true,
                  minifyJS: true,
                  keepClosingSlash: true,              keeps or removes the ending slash for self-closing tags <img/>
              }     
              hash: true                              Appends a unique hash to the html file (index.a1b2c3d4.html). Everytime webpack re-bundles, the hash will change and force the browser to fetch the updated version of the file instead of relying on the browser cache     
              chunks: ['about.js', 'contact.js']      Specifies which JS files should be injected into the html file, this is useful for multi-page applications. 
                                                              <script src="about.js"></script>   will be injected into the html file
                                                              <script src="contact.js"></script>  will be injected into the html file
              chunksSortMode:''                       Specifies the order of the JS files being injected to the html file. This is usefull if one JS file depends on another JS file being loaded first. 
                                                              'none': chunks are injected in their original order, 
                                                              'auto': Automatically sorts chunks based on Webpack’s internal order, 
                                                              'dependency': Sorts chunks based on their dependencies, ensuring parent chunks are loaded before child chunks, 
                                                              'manual': Allows manual sorting by specifying the order in the chunks array.)          
                                                               Custom Function: You can provide a custom sorting function.   
              scriptLoading:                          Defines how the JS files are loaded 
                                                             'blocking': JS files are loaded synchronously, 
                                                             'defer': JS files are loaded after the document has been loaded, 
                                                             'module': loads the JS files as ES modules.  
              publicPath:                             Sets the root path for assets. This tells webpack where to look when we reference files in the html file
*/

const HtmlWebpackPlugin = require("html-webpack-plugin");     //npm install html-webpack-plugin -D

module.exports = {
  plugins: [
        new HtmlWebpackPlugin({               
            filename: 'index.html',           
            template: './src/index.html'      
        })
  ]
}







//------------------------------- dotenv-webpack plugin
/* 
    This plugin can enable the use of env variables in our project.
    The DotEnv() constructor accepts an object with the following properties

          path: './.env')         Specifies the path to your environment variables file.
          safe: boolean           If true, it loads .env.example to verify that all required variables are set in your .env file.         
          systemvars: boolean     If true, it allows access to the servers' environment variables.     
          silent: boolean         If true, it suppresses warnings when missing environment variables.     
          expand: boolean         If true, it enables variable expansion within .env files.    
          defaults: './.env.defaults'     Specifies a path to a .env.defaults file for default env values.    
          prefix: 'CUSTOM'        Allows you to define a prefix for environment variables. (process.env.ACCOUNT_SECRET   ->    process.env.CUSTOM_ACCOUNT_SECRET)
*/

const DotEnv = require("dotenv-webpack")                     // npm install dotenv-webpack -D

exports.module = {
  plugins = [
       new DotEnv({systemvars: true}), //this enables the use of env variables, you must use process.env.name_of_variable (systemvars tells us that any env variable defined in a web-host(netlify) is a system variable, and MUST be used for the app)
  ]
}  







//------------------------------- copy-webpack-plugin
/* 
    This plugin is used to copy all assets from a folder to the bundled file.
    You will typically need this to include files that are NOT explicitly 
    imported in your project. The CopyWebpackPlugin() constructor accepts 
    an object with one property, patterns. The patterns property accepts an
    array of objects. Each of these objects will copy all files in one directory to another
    directory. These objects have the following properties


           from: '':             Specifies the directory of the folder we want to copy assets from.
           to: '':               Specifies the directory in the /dist folder where the copied files will be placed.
           context: ''           Specifies the root directory for the 'from' property 
//         toType:               Defines whether the 'to' property is a directory or file.  ('dir' or 'file')      
//         force: true           Forces overwriting of existing files. (if the 'to' directory has a file that already exists in the 'from' directory, then it will be overwritten)      
//         priority:             Accepts an integer that specifies which pattern object will have its directory copied first. (higher values means higher priority) 
/*         globOptions: [        Allows filtering files using glob patterns.
               ignore: ['**/excludedfolder/**', '**/*.md'],     // ** means anything in between,     * means any file name
//             dot: true,         Filters any file that starts with a dot (.env)
//             nocase: true,      If true, then matching will be case-insensitive (example.TXT will be the same as example.txt)
//             matchBase: true    If true, then it allows a pattern like "*.txt" to match any .txt file across all directories instead of requiring a full path match.
//         ]   
/*         filter: (directory) => {    A function to exclude certain files.
                return true or false
            }       
*/
/*         transform: (content, absolutePath) => {       Modifies file contents before copying.
                 return content.toString().replace('oldText', 'newText')
           }
*/            
*/*/*/

const CopyWebpackPlugin = require('copy-webpack-plugin');    // npm install copy-webpack-plugin -D        

module.exports = {
    plugins: [
        new CopyWebpackPlugin({patterns: [{ from: 'public', to: '' }]})                  //this will copy all the files from the public folder to the build root directory
    ]
}










  



const path = require('path');              
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv-webpack")                     // npm install dotenv-webpack -D
const CopyWebpackPlugin = require('copy-webpack-plugin');    // npm install copy-webpack-plugin -D         you will NEED this if you are planning on having a /public folder


module.exports = {
    entry: './src/index.js',                           
    output: {                                             
        path: path.join(__dirname, '/dist'),  
        filename: 'bundle.js',                
        publicPath: '/',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    plugins: [                      
        new HtmlWebpackPlugin({               //this plugin will help us generate the production html file in our /dist
            filename: 'index.html',           //our production html file will be named index.html
            favicon: './src/favicon.ico',     //loading a favicon in our html template
            template: './src/index.html'      //this is a template for our production html file, we are defining how the html will look like before we make our production html file
        }),
        new dotenv({systemvars: true}),        //this enables the use of env variables, you must use process.env.name_of_variable (systemvars tells us that any env variable defined in a web-host(netlify) is a system variable, and MUST be used for the app)
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: '' }],        //this will copy all the files from the public folder to the build directory
          }),
    ],
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
    
    module: {
        rules: [                               
            {                                   //loaders are transformations that are applied to files (typescript to javascript, sass to css)
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',  //for all .js files, we will load the babel transpiler
                    options: {presets: ['@babel/preset-env', '@babel/preset-react']} //preset-env is a group of babel plugins that will transpile all the new features of javascript 
                    }                                                                 //preset-react is also a group of babel plugins, but it will transpile jsx with other new features of javascript
            },
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader'}]             //using style loader and css loader to load css onto application
            },
            {
                test: /\.(png|jpg|webp|mp4|wav)$/,
                type: 'asset/resource'                                              //asset/resource loads files such as images, audio and videos
            }
        ]
    },
}
