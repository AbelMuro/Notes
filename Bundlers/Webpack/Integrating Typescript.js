 
/*
   HOW TO INTEGRATE TYPESCRIPT WITH WEBPACK

    -Keep in mind, to import and export modules from .ts and .tsx files, you don't need to include the extention of the file

        import MyComponent from './SomeFile';              //SomeFile is either a .ts or .tsx file
     

            0) npm install ts-loader typescript -D

            1) Create a tsconfig.json file and put it in the root directory

                    {
                        "compilerOptions": {
                            "target": "ESNext",
                            "module": "ESNext",
                            "moduleResolution": "Node",
                            "jsx": "react-jsx",
                            "strict": true,
                            "allowJs": true,
                            "allowSyntheticDefaultImports": true,
                            "esModuleInterop": true,
                            "skipLibCheck": true,
                            "outDir": "./dist",
                            "rootDir": "./src"
                        },
                        "include": ["src"]
                    }
            
            2)  Then add the following lines of code to your webpack.config.js file
                  module.exports = {
                        module: {
                            rules: [    
                                {
                                  test: /\.tsx?$/,
                                  use: 'ts-loader',
                                  exclude: /node_modules/,
                                },                     
                            ]
                        },
                        resolve: {
                              extensions: ['.tsx', '.ts', '.js'],
                        },
                  }

*/
*/
