/* 
   -HOW TO DEPLOY A MYSQL DATABASE WITH AIVEN

                1) Log into Aiven and go to the console

                2) Click on create service on the top right corner

                3) Select MySQL and fill out the appropriate fields

                4) Open up the MySQL service and make sure that its running

                5) Go to Connection Information and get the host, port, database name, ca.pem file, etc...
                   and update your node.js app with the following code...

                            const pool = mysql.createPool({
                                host: 'aiven host',
                                port: 'aiven port',
                                user: 'aiven username',                   
                                password: 'aiven password',                        // Use the password that you entered when you installed mySQL
                                database: 'aiven database',                        // The name of the schema/database
                                connectionLimit: 10,
                                ssl: {
                                    rejectUnauthorized: true,
                                    ca: fs.readFileSync(path.join(__dirname, '../SSL/ca.pem'))
                                }
                            });

                6) Open up MySQL workshop and create a new connection

                7) Use the connection information that you got from step 5 and put it
                   in the new connection, also dont forget about the ca.pem file

                8) Click on test connection

                9) Now you can create the tables and columns for the database



*/
