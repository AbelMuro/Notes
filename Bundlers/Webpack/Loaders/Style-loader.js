
//------------------------------- style-loader
/* 
      You can use the style-loader to tell webpack to 'inject' all
      of your css files into the <head> tag of your HTML file with 
      the <style> tag
*/

//npm install style-loader --save-dev 


module.exports = {
  module: {
    rules: [
          {
              test: /\.css$/,
              use: [{loader: 'style-loader'}]         
          },
    ]
  }
}
