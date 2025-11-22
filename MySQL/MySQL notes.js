/* 
    MySQL is a relational database system that can be installed on any computer. Keep in mind that if you run a MySQL server on your local machine,
    any node.js app that wants to make queries to the schemas within the server must be done within the same computer

    If you want to use a remote database within a MySQL server, then you should use AWS RDS or Google Cloud SQL
    
            For windows users:
        
                1) You must install mySQL using the following link
        
                        https://dev.mysql.com/downloads/installer/
        
                2) Then you can install mySQL workbench, its a software that visualizes the management of a database/schema
        
                        https://dev.mysql.com/downloads/workbench/
        
            For macOS users:
        
                1) You must install mySQL using the following link
        
                        https://dev.mysql.com/downloads/mysql/
        
                2) Then you can install mySQL workbench using the following link
        
                        https://dev.mysql.com/downloads/workbench/

                3) Installing the mysql command line (this will install mysql command line globally)

                        brew install mysql
                        brew services start mysql
                        mysql_secure_installation





            HOW TO CREATE A DATABASE IN MYSQL WORKBENCH (the workbench should be used development purposes only)

                0) Keep in mind that Mysql must be running on the local machine.
                    windows - open services.msc and start MYSQL80 
                    iOS - open settings and start MYSQL

                1) Click on the 'Create Schema' button on the top left corner
                   and choose a name for the schema. Then click 'apply'

                2) Then on the left hand side, right click on Tables and select 'Create Table'

                3) You can create the columns of the Table. Each column will represent a piece of data.
                   Each column must have a name, and a data type.

                4) Then right click on the table and select 'Select Rows'

                5) A list of all the data in the schema will be displayed


            HOW TO CREATE A SQL DATABASE IN AWS RDS

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

                                hostname: endpoint url
    
                                port: 3306
    
                                username: the username that you used when you created the database
    
                                password: the password that you used when you created the database

                    11) To create queries in a node.js app, you will need to use the endpoint as the hostname
                        and the username and password that you specified when you created the database

                                const pool = mysql.createPool({
                                      host: '',                            // endpoint url
                                      user: '',                            // username of the database in AWS RDS
                                      password: '',                        // password of the database in AWS RDS
                                      database: '',                        // The name of the schema/database
                                      connectionLimit: 10,                
                                });    
*/    








//=============================================================== MYSQL Module ========================================================================

/* 
            1) npm install mysql2

            2) In your 'db.js' file, write the following lines of code
    
                    const mysql = require('mysql2');
    
                    const pool = mysql.createPool({
                          host: '',                            // Go to Administration -> Users and privileges -> select a user and host
                          user: '',                            // Go to Administration -> Users and privileges -> select a user and host
                          password: '',                        // Go to Administration -> Users and privileges -> select a user and create a password
                          database: '',                        // The name of the schema/database
                          connectionLimit: 10,
                    });
                    
                    module.exports = pool;
*/




//--------------- EXECUTE METHOD
/* 
    The execute method allows developers to run a command that can update a database
    
*/

   const db = require('./db.js');

    db.execute(
        '',                //Commands
        [''],              //data to send to database
        (err, results, fields) => {
        }
    )




        

//--------------- 'SELECT' COMMAND
/* 
    You can retrieve data from a database using the SELECT command with the .execute() method

    syntax: 

            SELECT * FROM table-name WHERE first-column-name = ? AND second-column-name = ?
            SELECT first-column-name, second-column-name FROM table-name
*/

    const db = require('./db.js');

    db.execute(
        'SELECT * FROM accounts WHERE email = ?', 
        ['myEmail@gmail.com'], 
        (err, results) => {
            results;  //an array of rows that match the query
        });








//--------------- 'INSERT INTO' COMMAND
/* 
    You can insert new data into a database using the INSERT INTO command with the .execute() method

    syntax:

        INSERT INTO table-name (first-column-name, second-column-name) VALUES (?, ?), (?, ?)

            VALUES = data can be inserted inside an array, the array is passed to the second argument
                     of .execute()

            VALUES(?, ?) = ['email', 'password'];

            VALUES (?, ?), (?, ?) = ['email', 'password', 'email', 'pasword']
*/

    const db = require('./db.js');

    db.execute(
        'INSERT INTO accounts (email, password) VALUES (?, ?)', 
        [email, password], 
        (err, results) => {
                err.code = 'ER_DUP_ENTRY'  //the specific column already has the specified value
                
                results = {
                  fieldCount: 0,          //number of columns that were selected by the query
                  affectedRows: 1,        //number of rows that were deleted/updated somehow
                  insertId: 42,           //id that identifies the action performed by the .execute method()
                  serverStatus: 2,        //the status of the server
                  warningCount: 0,        //the number of warnings
                  message: '',            //status message from the server
                  protocol41: true,       //indicates the protocol version that the server is using
                  changedRows: 0,         //number of rows that were updated
                }; 
        });



//--------------- 'UPDATE' COMMAND
/* 
    You can update data in a database by using the UPDATE command with the .execute() method

    syntax: 

        UPDATE table-name SET column-name = ? WHERE other-column-name = ?
*/


    const db = require('./db.js');

    db.execute(
        'UPDATE accounts SET password = ? WHERE email = ?', 
        ['newpassword', 'email'],
        (err, results) => {
                results = {
                  fieldCount: 0,          //number of columns that were selected by the query
                - affectedRows: 1,        //number of rows that were deleted/updated somehow
                  insertId: 42,           //id that identifies the action performed by the .execute method()
                  serverStatus: 2,        //the status of the server
                  warningCount: 0,        //the number of warnings
                  message: '',            //status message from the server
                  protocol41: true,       //indicates the protocol version that the server is using
                  changedRows: 0,         //number of rows that were updated
                }; 
        });



//--------------- 'DELETE FROM' COMMAND
/* 
    You can delete data from a database using the DELETE FROM command with the .execute() method.

    syntax: 

         DELETE FROM table-name WHERE column-name = ?

*/

    const db = require('./db.js');

    db.execute(
        'DELETE FROM accounts WHERE email = ?', 
        ['someEmail@gmail.com'], 
        (err, results) => {
                results = {
                  fieldCount: 0,          //number of columns that were selected by the query
                - affectedRows: 1,        //number of rows that were deleted/updated somehow
                  insertId: 42,           //id that identifies the action performed by the .execute method()
                  serverStatus: 2,        //the status of the server
                  warningCount: 0,        //the number of warnings
                  message: '',            //status message from the server
                  protocol41: true,       //indicates the protocol version that the server is using
                  changedRows: 0,         //number of rows that were updated
                }; 
        });








