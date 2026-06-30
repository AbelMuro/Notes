/*
   HOW TO INTEGRATE TYPESCRIPT INTO A REACT APP

            0) npm install @types/react @types/react-dom ts-loader

            1) Create a tsconfig.json file and put it in the root directory

                  {
                    "compilerOptions": {
                        "allowSyntheticDefaultImports": true,
                        "outDir": "./dist/",
                        "noImplicitAny": true,
                        "module": "es6",
                        "jsx": "react",
                        "rootDir": "/",
                        "allowJs": true,
                    },
                      "include": ["src", "global.d.ts"]
                  }
      
            2) Create a global.d.ts file and also put it in the root directory
               The code below will enable the following syntax
               import * as styles from './styles.module.css';

                  declare module '*.module.css' {
                        const classes: { [key: string]: string };
                        export = classes;
                  }

            
            3)  Then add the following lines of code to your webpack.config.js file
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
