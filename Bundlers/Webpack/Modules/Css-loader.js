
//------------------------------- css-loader
/* 
    You can use the css-loader to enable webpack to intepret CSS
    files and allows it to bundle the css with the JS.
    It also allows webpack to process @import statements and
    url() functions within a css file
*/

//npm install css-loader --save-dev 

module.exports = {
  module: {
    rules: [
          {
              test: /\.css$/,
              use: [{loader: 'css-loader'}]           
          },
    ]
  }
}
