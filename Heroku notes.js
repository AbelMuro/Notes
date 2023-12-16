//Heroku is a web host you have use to deploy your app, however you will need to develop a server that can host the static files for your app

//  1)  First create a server.js file with the following lines of code


          const express = require ('express');
          const path = require ('path');
          const app = express ();
          const port = process.env.PORT || 3000;
          
          app.use (express.json ());
          
          // Your static post-build assets folder
          app.use (express.static (path.join(__dirname, '..', 'dist')));
          
          // Root Redirects to the pre-build assets
          app.get ('/', function (req,res) {
            res.sendFile (path.join(__dirname, '..', 'src/index.html'));
          });
          
          // Any Page Redirects to the pre-build assets folder index.html that
          // will load the react app
          app.get ('*', function (req,res) {
            res.sendFile (path.join(__dirname, '..', 'src/index.html'));
          });
          
          app.listen (port, () => {
            console.log ("Server is running on port: ", port)
          })


//    2) Second, run the script 'npm run build' to build the application

//    3) create a .env and create the variable PORT=3000

//    4) create a Procfile and set the following line of code... (this has to point to the file we defined above)

          web: node server/server.js

//    5) Push the changes to your repository
