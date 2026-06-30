/*

Steps to initialize React in your application

            0) npx create-react-app my-app
            
            1) npm init -y                                                          //creates package.json
                   make sure to add "homepage": ".",                                //this will tell react to start looking for the deployed files at the '/' directory

            2) npm install react                                                    //installs the react library
               npm install react-dom                                                //installs the react dom library 
            
             3) npm install webpack --save-dev                                      //installs webpack core
               npm install webpack-cli --save-dev                                   //install webpack command line interface (terminal stuff)
               npm install webpack-dev-server --save-dev 
               
             4) npm install @babel/core --save-dev                                  //installs the core files for babel (@ means that the package comes in modules)
                npm install babel-loader --save-dev                                 //installs a loader that webpack uses to transpile JS code into valid JS code
                npm install @babel/preset-react --save-dev                          //installs a group of plugins that will transpile JSX into valid JS
                npm install @babel/preset-env --save-dev                            //installs a group of plugins that will transpile all the new features of JS 
                npm install postcss-loader --save-dev                               //installs a loader that will automatically transform your selector and styles
                npm install autoprefixer --save-dev                                 //installs a package that will be used with postcss-loader, autoprefixer will automatically apply any prefix vendors to your selectors in css (-webkit-, moz, etc..)
               
              5) npm install html-webpack-plugin --save-dev                          //installs a plugin that will create an html file in the /dist folder based on a template we have in /src
               
              6) npm install css-loader --save-dev                                   //installs the loaders for css files and <style> tags
                 npm install style-loader --save-dev                                 

              7) npm install babel-plugin-root-import --save-dev                    //enables you to create flags like '~/' to represent a specific directory like './src'                    
                                                                                    //check .babelrc notes for more info
              7) configure webpack   (look at webpack notes for more info)
              
              8) In your package.json file, write the following scripts
                     "start": "webpack-dev-server --mode development --open",
                     "build": "webpack --mode production"
              
              8) create /src folder with index.js and index.html (index.html must have <div id="root"> </div>)
                 make sure to implement your <meta/> tags for SEO (DONT FORGET TO ADD A FAVICON!)
                            <meta name="author" content="Abel Muro"/>       
                            <meta name="keywords" content="front-end quiz, html quiz, css quiz, javascript quiz, accessibility quiz"/>
                            <meta name="description" content="Front-end quiz that will test your skills in HTML, CSS, Javascript and Accessibility!"/> 
                            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F6FA" />                           //you can remove the media attribute if you just want ONE custom theme
                            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#313E51" />
                            <base href="/" />                                                                    //this will set the base url to '/'    this will force all relative urls to resolve to '/'     profile/overview will resolve to  /profile/overview
              
              9) generally, index.js will have..

                 import ReactDOM from 'react-dom/client';
                 import {App} from './components/App.js';
                 const root = ReactDOM.createRoot(document.getElementById('root'));
                 root.render(<App/ >)
                 
               10) then you should create a /components folder that will have all the functions and classes that are exported


*/
