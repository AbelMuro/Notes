/* 

            -HOW TO CREATE A SQL DATABASE IN AWS RDS

                    1) Go to the AWS console and click on Aurora and RDS

                    2) CLick on Dashboard on the right hand side of the page and then click on Create Database

                    3) Click on the following options

                                Engine Options: 'MySQL'
    
                                Settings: Enter a name for the database
    
                                Credentials management: set the username and the password for your database
    
                                Templates: 'Free tier' for development, 'Production' for production
    
                                Connectivity: 'Public access'
    
                                Click on 'create database'

                    4) Next click on 'Databases' on the left hand side and click on the database you want to use

                    5) On the Connectivity & Security tab, click on the VPC security groups

                    6) Click on the inbound rules tab, and then click on Edit Inbound rules, then click on Add rule.
                       Keep in mind that if you are planning on making queries to the database through a node.js app
                       that is deployed on a different machine, you will need the IP address of that machine

                    7) Select the following options

                                Protocol: TCP
        
                                Port: 3306
        
                                Source: Select the IP address of the computer that is making the queries to the database
        
                                click on 'Save Rules'

                    8) Go back to the home page of AWS RDS and click on databases on the left hand side
                       and select the database you want to use.

                    9) On the Connectivity & Security tab, copy the Endpoint URL


                    10) You can open up workbench and create a new connection that connects to the database created in AWS RDS
                        At this point, you will need to create a schema for queries

                                hostname: 'endpoint url'
    
                                port: 3306
    
                                username: 'the username that you used when you created the database'
    
                                password: 'the password that you used when you created the database'
    
                     11) To create queries in a node.js app, you will need to use the endpoint as the hostname
                        and the username and password that you specified when you created the database
    
                                const pool = mysql.createPool({
                                      host: '',                            // endpoint url
                                      user: '',                            // username of the database in AWS RDS
                                      password: '',                        // password of the database in AWS RDS
                                      database: '',                        // The name of the schema/database
                                      connectionLimit: 10,                
                                });    

                     12) Exporting database from Workbench and importing database into AWS

                            -If you have been using MySQL workbench to design a database, you can export a 
                            schema by doing the following steps
                            
                                1) Connect to the database that you want to export in workbench
        
                                2) Click on Database on the top left corner
        
                                3) Click on Schema Transfer Wizard
        
                                4) Follow the steps to transfer the schema to AWS RDS

*/
