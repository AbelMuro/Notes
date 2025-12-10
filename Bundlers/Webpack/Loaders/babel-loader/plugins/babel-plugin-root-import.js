//---------------------------- babel-plugin-root-import
/* 
      You can use the babel-plugin-root-import to create flags that represents certain
      directories. This plugin will transform the import statements of JS files

      ~/     can represent    ./src


      For typescript support, you will need to do the following additional steps

            1) add the following code to your webpack.config.js file

                    resolve: {
                      alias: {
                        '~': path.resolve(__dirname, 'src')
                      }
                    }

            2) In your tsconfig.js file, add the following lines of code
            
                  compilerOptions: {
                        "baseUrl": "./src",
                            "paths": {
                              "~/*": ["*"]
                              "!/*": ["Pages/Home/*"]            //this will resolve to ./src/Pages/Home/*
                            }             
                  }

            3) npm install @babel/preset-typescript and update your webpack.config.js file again

                  module.exports = {
                        module: {
                              rules: [
                                    {                                 
                                        test: /\.js?$/, 
                                        use: {
                                            loader: 'babel-loader',  
                                            options: {
                                                presets: ['@babel/preset-typescript'],                  //just add the preset that supports typescript
                                                plugins: []  
                                            }  
                                        }                                                                 
                                    },
                              ]
                        }
                  }


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
        resolve: {                                                                        // this property is specifically for typescript support only
          alias: {
            '~': path.resolve(__dirname, 'src')
          }
  }
};
