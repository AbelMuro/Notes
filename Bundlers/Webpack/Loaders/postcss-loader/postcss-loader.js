//------------------------------- postcss-loader
/* 
    You can use the postcss loader to process CSS using PostCSS. PostCSS is a tool
    that can be used to transform CSS files using plugins 

    (you can extend the functionality of CSS with PostCSS, similar to SASS, but its not a pre-processor)

*/

//npm install postcss-loader --save-dev

module.exports = {
  module: {
    rules: [
          {
              test: /\.css$/,
              use: [{loader: 'postcss-loader'}]           
          },
    ]
  }
}
