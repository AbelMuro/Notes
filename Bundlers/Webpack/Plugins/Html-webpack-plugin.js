
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
