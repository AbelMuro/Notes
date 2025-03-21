/* 

    --------------------------------------DEPLOYING NODE.JS servers with Docker------------------------------------

    Docker uses containers, they are an isolated environment that can be used to run any code
    We create a container by first creating an image, which is a blueprint on how the container will 'look like'

    1) First install the docker desktop      (https://docs.docker.com/get-started/get-docker/)

    2) Then create a Dockerfile file in your root directory of your app (Dockerfile has no extention)

                # Use the Node.js base image
                FROM node:16-alpine
                
                # Set the working directory
                WORKDIR /app
                
                # Copy package files and install dependencies
                COPY package*.json ./
                RUN npm install

                # Environment variables
                ENV api_key=123456789
                ENV another_api_key=23412341234
                
                # Copy the rest of the app’s files
                COPY . .
                
                # Expose the port your app runs on
                EXPOSE 4000                                        //make sure this port is the same port that you use in the app.listen() method of your node.js app
                
                # Run the app
                CMD ["node", "src/index.js"]

    3) run the following command (the following command will create an image)

                docker build -t name-of-image .    

    4) Once you have an image, you can use it to create a container with the following command

                docker run -p 3000:3000 my-node-app

        
        
*/
