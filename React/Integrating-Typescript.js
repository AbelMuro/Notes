/*
   HOW TO INTEGRATE TYPESCRIPT INTO A REACT APP

            0) Follow the instructions for integrating typescript with webpack

            1) npm install @types/react @types/react-dom ts-loader 

      
            2) Create a global.d.ts file and also put it in the root directory
               The code below will enable the following syntax (import * as styles from './styles.module.css';)

                  declare module '*.module.css' {
                        const classes: { [key: string]: string };
                        export = classes;
                  }

            
            3)  In your tsconfig.json file, add the following lines of code

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
                       "rootDir": "./src",
                       "paths": {
                           "~/*": ["./src/*"],
                           "!/*": ["./src/Pages/*"]
                       }  
                   },
                   "include": ["src", "global.d.ts"]
               }

*/
