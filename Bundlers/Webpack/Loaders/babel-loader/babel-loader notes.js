//------------------------------- babel-loader
/* 
      You can use the babel-loader to transpile JS files.
      This loader has plugins that you can use transform a 
      specific type of JS so that the browser can understand it.

            @babel/preset-env          transforms ES6 syntax into a browser compatable JS
            @babel/preset-react        transforms React JSX into React.createElement
*/

//npm install @babel/core --save-dev                                  //installs the core files for babel (@ means that the package comes in modules)
//npm install babel-loader --save-dev                                 //installs a loader that webpack uses to transpile JS code into valid JS code
//npm install @babel/preset-react --save-dev                          //installs a group of plugins that will transpile JSX into valid JS
//npm install @babel/preset-env --save-dev                            //installs a group of plugins that will transpile all the new features of JS 

module.exports = {
  module: {
    rules: [
          {                                  
              test: /\.js$/,                      
              use: {
                  loader: 'babel-loader',    
                  options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                  } 
              }                                                                
          },
    ]
  }
}
