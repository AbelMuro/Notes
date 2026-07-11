 
/*
   HOW TO INTEGRATE TYPESCRIPT WITH WEBPACK

    -Keep in mind, to import and export modules from .ts and .tsx files, you don't need to include the extention of the file

        import MyComponent from './SomeFile';              //SomeFile is either a .ts or .tsx file
     

            0) npm install @types/react @types/react-dom ts-loader typescript -D

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
*/
