//------------------------------- postcss-loader
/* 
    You can use the postcss loader to autoprefix css selectors and properties with the 
    proper prefix. Some browsers can only use certain css properties with a certain prefix 

        mask-image: url('');
        -webkit-mask-image: url('')          -webkit- is automatically added to the css in the bundle.js file
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
