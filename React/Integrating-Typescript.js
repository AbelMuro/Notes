/*
   HOW TO INTEGRATE TYPESCRIPT INTO A REACT APP

            0) Follow the instructions for integrating typescript with webpack

            1) npm install @types/react @types/react-dom

      
            2) Create a global.d.ts file and also put it in the root directory
               The code below will enable the following syntax
               -import * as styles from './styles.module.css';

                  declare module '*.module.css' {
                        const classes: { [key: string]: string };
                        export = classes;
                  }

            
            3)  In your tsconfig.json file, add the following lines of code

               {
                "compilerOptions": {
                     ...
                },
                "include": ["src", "global.d.ts"]   
            }

*/
