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
