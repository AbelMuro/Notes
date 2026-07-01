/*
        STEPS TO IMPLEMENT TYPESCRIPT IN YOUR VUE APP

                1) npm install -D typescript vue-tsc @types/node
        
                2) create a tsconfig.json file in the root directory
        
                        {
                          "compilerOptions": {
                            "target": "ESNext",
                            "module": "ESNext",
                            "moduleResolution": "Node",
                            "strict": true,
                            "jsx": "preserve",
                            "types": ["vite/client"]
                          }
                        }
        
                3) In your single file components, you must use the following syntax to enable TS
        
                        <script setup lang="ts">
                            const x : number = 1
                        </script>

    */
