//---------------------------- babel-plugin-root-import
/* 
      You can use the babel-plugin-root-import to create flags that represents certain
      directories. This plugin will transform the import statements of JS files

      ~/     can represent    ./src

*/

// npm install babel-plugin-root-import

module.exports = {
  module: {
      rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                'babel-plugin-root-import',
                                {
                                    rootPathSuffix: "./src",             
                                    rootPathPrefix: "~/"              
                                }, 
                                'src directory'                                              // if you are defining multiple directories under a flag, you need to assign a unique 'key' 
                            ], 
                            [
                                'babel-plugin-root-import',
                                {
                                    rootPathSuffix: "./src/Store/Reducers",
                                    rootPathPrefix: "!/"
                                },
                                'reducers directory'
                            ],
                        ]
                    }
                }
            }
        ]
      },
};
