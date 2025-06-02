//----------------------------- autoprefixer
/* 
     You can use the autoprefixer to apply required prefixes for certain css properties.
      Some browsers can only use certain properties if the appropriate prefix has been used

      mask-image: 
      -webkit-mask-image:      // -webkit- will be automatically applied by autoprefixer
     
*/


//npm install autoprefixer --save-dev

module.exports = {
  module: {
    rules: [
          {
              test: /\.css$/,
              use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                            plugins: [
                                  require('postcss-preset-env')({
                                    browsers: 'last 2 versions',
                                  }),
                               ],
                            },
                        },
                    }
              ]           
          },
    ]
  }
}
