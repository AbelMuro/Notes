/* 

        Vite is a bundler that puts together all the files in a project into a single file, bundle.js. This file
        is then served to the browser by a server when a client requests to visit a webpage or web app.
        Keep in mind that Vite uses esbuild as the transpiler.


                                                  BUNDLING PROCESS
        
          1) File Analysys 
                The bundler will look for the entry point of the application (index.html in the directory specified in root property) 
                and will analyze all imports and dependencies used in the application. The bundler will also check for syntax errors 
        
          2) Dependency Graph:
                Then the bundler starts a dependency graph by linking all the modules and
                assets together. 
        
          3) Transpilation: 
                  3.1)  Vue Templates:
                        Once the dependency graph is completed, the bundler will transpile the templates into
                        javascript render functions. T
  
                  3.2) Script Tags:
                       Bundler will use esbuild to transpile any Javascript code in the script tags (Typescript, ES6+ syntax)
  
                  3.3) Style Tags
                       The Style tags are checked to see if they need further transpilation (if using a pre-processor like SASS)
                       The developer will need to install the necessary pre-processor compilers (PostCSS, node-sass, etc...)
        
          4) Optimization: 
                 The bundler will then implement tree-shaking, which is a process of removing any unused code
                 in the application. All whitespaces will be removed and variable names will be shortened to 
                 optimize the size of the file.
  
          5) Bundling: 
                  Once the steps above have been completed, the bundle will bundle all the files into one 
                  file, bundle.js. If the developer implemented lazy-loading, the bundler will split the bundle.js
                  into multiple files, each file will be loaded on the browser when necessary
*/



//----------------------------- Initializing Vite
/* 
    You can initialize vite by importing the defineConfig and invoking. 
    The object it returns must be exported as default. This must be within 
    the config file for vite

    ./vite.config.js
*/

//npm install vite --save-dev


import { defineConfig } from 'vite'

export default defineConfig({})







//----------------------------- root
/* 
    You can use the root property in the defineConfig() function
    to define the root directory of your project. This property will 
    default to the directory that you use to run the command 'npm start'
*/


export default defineConfig({
  root: '/'                        //vite will look for the index.html file in the root directory
})





//----------------------------- build
/* 
        The build property is used to specify the directory that will be
        used to place the bundle.js file

                  build: {
                        outDir: 'dist'                  // Defines the output directory for the build. (/dist)
                        assetsDir: 'assets'             // Sets the directory for static assets within the output folder.        
                        target: 'esnext', 'es2015'      // Specifies the version of javascript that Vite will compile too (esnext is default)
                        minify: true,                   // allows your source code to be minified ('terser', 'esbuild', or Boolean).
                        manifest: true,                 // Generates a manifest file that contains a mapping between the file names to their corresponding hashed file names. (this is useful for helping browsers detect changes to the file, some browsers have aggressive caching that makes it difficult to display updates to the file)                                                                       
                        polyfillModulePreload: true,    // Defines if our project should use pollyfills (a pollyfill is code that implements a certain feature if the browser doesnt support it)
                        cssCodeSplit: true              // Defines if the css should also be code splitted with the JS (each css file will be bundled with the JS file that use it) 
                        chunkSizeWarningLimit: 1200,    // Sets the chunk size warning limit (in KB).    
                        emptyOutDir: true,              // Clears the output directory before building (true or false). 
                        sourcemap: '',                  // Enables source maps, source maps are files that map the original code to the bundled code (true (generates separate .map files), 'inline' (embeds the source maps in the output), 'hidden' (does not embed the source maps in the output)).
                        terserOptions: {                // Configures Terser minification options. (minify property must be assigned 'terser')  
                                compress: {
                                        drop_console: true,  // Removes console.log and similar statements.
                                        drop_debugger: true, // Eliminates debugger statements.
                                        booleans: true,      // Optimizes boolean expressions (!!a ? b : c   →   a ? b : c).
                                        dead_code: true      // Removes unreachable code.
                                        conditionals: true   // Simplifies if statements and ternary expressions.
                                        unused: true         // Eliminates unused variables and functions. 
                                },
                                mangle: {
                                        properties: true     // Shortens property names
                                        keep_fnames: true    // Prevents function names from being shortened.    
                                        reserved: ['myVariable']  // Specifies variable names to exclude from being shortened.
                                },
                                format: {
                                        beautify: true,      // Keeps the output readable.
                                        comments: false      // If false, then we remove all comments.
                                        quote_style: 1       // Defines how strings are quoted (1 means always use single quotes, 2 means always use double quotes, 3 means preserve the original quote).
                                }
                                
                        }                    
                        rollupOptions: {                // Allows customization of the Rollup bundler. (Vite is built on top of the rollup bundler)
                                input: {                // Creates a chunk for each page in the application.
                                     main: './src/index.html',    // the main chunk is for the index.html
                                     admin: './src/admin.html',   // the admin chunk is for the admin.html
                                },
                                output: {                // Configures output settings like format, file names, and chunk splitting.
                                     format: 'es',       // Sets module format ('es' (ECMAscript), 'cjs' (COMMONjs for Node.js), 'umd' (univeral format, ECMAscript and COMMONjs))
                                     entryFileNames: '[name].[hash].js',         // Defines the naming pattern for entry files like index.js (hash is a unique identifier for the file, everytime the file changes, the hash is generated, this forces the browser to update the file instead of relying on cache)
                                     chunkFileNames: '[name].[hash].js',         // Defines the naming pattern for chunk files (any file that is being lazy-loaded)
                                     assetFileNames: 'assets/[name].[hash].[ext]', // Defines the naming pattern for assets files (images, fonts, and other static files) in the assets folder of the build directory
                                },
                                external: ['axios', 'react-virtualization'],      // Defines dependencies that should not be bundled.
                                treeshake: true,                                  // true will enable treeshaking, false will disabled treeshaking, 'smallest' is an aggresive treeshaking mode that produces the smallest possible bundle
                                manualChunks(pathname) {                               // the manualChunks method can be used for separating the bundle into different chunks (vite will evaluate every module and check its pathname)
                                     if (pathname.includes('node_modules'))            // if the pathname of the module includes 'node_modules'...
                                           return 'chunk_One';                         // chunk_One will be the name of the chunk that contains all assets within node_modules (manualChunks will not be called for the assets within node_modules)
                                     
                                },                                
                                watch: {                                        // Defines how vite will 'watch' the files in the project for changes, and will update the dev server accordingly
                                   include: 'src/**',                                 // Watches all files inside "src"
                                   exclude: 'node_modules/**',                        // Doesn't watch all files inside node_modules
                              }                                             
                        }                  
                  }                               
*/


export default defineConfig({
     build: {
        outputDir: 'dist',
     }
})







//----------------------------- base
/* 
    You can use the base property in the defineConfig() function
    to give a prefix to all URLS resolved in the project. This includes all 
    css files, images, js files, and text files as well. The base value will
    be relative to the directory of the vite config file
*/

export default defineConfig({
  base: './myApp/'                      // if i import an image from '/icons/my-icon.png', the url will be resolved to './myApp/icons/my-icon.png'
})







//----------------------------- resolve
/* 
     You can use the resolve property in the defineConfig() function
     to create a flag that represents a certain directory.

*/

export default defineConfig({
  resolve: {
    alias: {
      '@': './src',                // everytime @ is used in a url of an import statement, it will resolve to './src'
    },
  },
)






//----------------------------- plugins
/* 
        You can use the plugins property in the defineConfig function to define 
        the plugins for vue. Plugins are additional functionality that can be 
        used in a vite application
*/


export default defineConfig({
  plugins: []                     
})








//----------------------------- server
/* 
        You can use the server property in the defineConfig() function to 
        configure the development server of your vite application.
        The server property accepts an object that has the following properties.


                host: '192.168.1.100'    Defines the ip-address of the devices on the same network that can access the dev server (the device can view the website on the dev server by typing http://192.168.1.100:5173 on the browser url)
                port:                    Specifies the port number for the development server.      
                strictPort:              If set to true, Vite will not use the next available port if the port specified above is unavailable. (vite will not start the dev server at all)      
                https: {                 Enables HTTPS for the development server.   
                      key: fs.readFileSync('server.key'),
                      cert: fs.readFileSync('server.crt'),
                      ca: fs.readFileSync('ca.pem'),
                      pfx: fs.readFileSync('SSL-config.pfx'), 
                      passphrase: 'Passphrase for encrypted private keys.'
                },                   
                proxy: {                   Configures proxy settings for API requests. 
                      '/api': {            Forwarding all requests made in the dev server (/api) to (http://localhost:5000/api)
                             target: 'http://localhost:5000',                target is the domain that will receive the requests
                             changeOrigin: true,                             changeOrigin will change the host header of the request being made, ensuring that the request is proxied to http://localhost:5000
                             secure: false,                                  secure will enable Vite to check for a valid SSL certificate from http://localhost:5000
                             rewrite: (path) => path.replace(/^\/api/, ''),  rewrite is a callback that is used to change the path of the URL being used in the fetch request (/api/users   ->   /users)
                             ws: true,                                       ws enables websocket live connections and forwards these connection to http://localhost:5000
                             configure: (proxy, options) => {                configure accepts a callback that accepts an object that represents the proxied request
                                  proxy.on('proxyReq', (proxyReq, req, res) => {
                                    console.log(`Proxying request to: ${req.url}`);
                                    proxyReq.setHeader('X-Custom-Header', 'my-value');         you can modify the headers of the request before its sent to the proxy
                                  });
                        
                                  proxy.on('error', (err, req, res) => {
                                    console.error('Proxy error:', err);
                                    res.end('Something went wrong.');
                                  });
                                }
                        },          
                }                               
                cors: boolean              Enables CORS for the dev server (this is typically used if you are developing a restfull api with vite )              
                headers: {                 Allows setting custom headers for pre-flight responses sent by the dev server (usefull for setting up CORS).      
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }        
                open: boolean              Automatically opens the browser when the server starts.      
                allowedHosts: ['myDomain.com', 'otherDomain.net']                    Defines a list of domains that can view the website being developed in the dev server (byu default, it allows ALL domains to view the website)
*/

export default defineConfig(  
        server: {
            port: 3000,                        
            open: true,                         
        }
)











