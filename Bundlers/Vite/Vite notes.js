/* 

        Vite is a bundler that puts together all the files in a project into a single file, bundle.js. This file
        is then served to the browser by a server when a client requests to visit a webpage or web app.


                                                  BUNDLING PROCESS
        
          1) File Analysys 
                The bundler will look for the entry point of the application (index.vue) and will analyze all 
                imports and dependencies used in the application. The bundler will also check for syntax errors 
        
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
  root: '/'
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
                cors: boolean              Enables CORS for all requests          
                open: boolean              Automatically opens the browser when the server starts.          
                headers:                   Allows setting custom headers for responses.          
                allowedHosts:              Defines which hosts the server can respond to.
*/

export default defineConfig(  
        server: {
            port: 3000,                        
            open: true,                         
        }
)














import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})



