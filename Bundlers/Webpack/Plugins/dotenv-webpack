
//------------------------------- dotenv-webpack plugin
/* 
    This plugin can enable the use of env variables in our project.
    The DotEnv() constructor accepts an object with the following properties

          path: './.env')         Specifies the path to your environment variables file.
          safe: boolean           If true, it loads .env.example to verify that all required variables are set in your .env file.         
          systemvars: boolean     If true, it allows access to the servers' environment variables.     
          silent: boolean         If true, it suppresses warnings when missing environment variables.     
          expand: boolean         If true, it enables variable expansion within .env files.    
          defaults: './.env.defaults'     Specifies a path to a .env.defaults file for default env values.    
          prefix: 'CUSTOM'        Allows you to define a prefix for environment variables. (process.env.ACCOUNT_SECRET   ->    process.env.CUSTOM_ACCOUNT_SECRET)
*/

const DotEnv = require("dotenv-webpack")                     // npm install dotenv-webpack -D

exports.module = {
  plugins = [
       new DotEnv({systemvars: true}), //this enables the use of env variables, you must use process.env.name_of_variable (systemvars tells us that any env variable defined in a web-host(netlify) is a system variable, and MUST be used for the app)
  ]
}  
