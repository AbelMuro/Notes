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







            -HOW TO CREATE A DATABASE IN MYSQL WORKBENCH (the workbench should be used development purposes only)

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









            -HOW TO MIGRATE A DATABASE USING MYSQL WORKBENCH

                1) Go to mySQL workbench and open up the connection/database that you want to migrate

                2) Click on Server -> Data Export

                3) Select the schemas that you want to export

                4) Select Dump structure and data

                5) Select Export to self contained file and choose a location for the file

                6) Click on Start Export. This will save the .sql file in your pc

                7) NEXT go to the connection/database where the migration will occur.

                8) Select 'import from self contained file' and find the file that was exported in step 5

                9) select dump structure and data

                10) Click on Start Import
                







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



//=============================================================== SQL COMMANDS ========================================================================






//=============================== DATABASE COMMANDS

//-------------- Creating a database
CREATE DATABASE company;


//-------------- Use a database to work with
USE company


//-------------- Delete a database
DROP DATABASE company;












//=============================== TABLE COMMANDS

//-------------- Creating a table with the specified columns
CREATE TABLE table_name (
  columne_one INT PRIMARY KEY,
  columne_two VARCHAR(50),
  columne_three VARCHAR(50),
  columne_four VARCHAR(50),
  columne_five DECIMAL(10, 2)
);


//-------------- Inserting a row into a table
INSERT INTO table_name (column_one, columne_two, columne_three, columne_four, columne_five)
VALUES
  (1, 'John', 'Doe', 'HR', 50000.00),
  (2, 'Jane', 'Smith', 'IT', 60000.00),
  (3, 'Alice', 'Johnson', 'Finance', 55000.00),
  (4, 'Bob', 'Williams', 'IT', 62000.00),
  (5, 'Emily', 'Brown', 'HR', 48000.00);


//-------------- Update a table with a new column
ALTER TABLE table_name
ADD COLUMN column_six INT;


//-------------- Deleting a table
DROP TABLE table_name;







    
//=============================== SELECTING ROW AND COLUMN COMMANDS

//-------------- selecting all rows within a table (returns all the rows from the table)
SELECT * FROM table_name;

//-------------- selecting the specified columns from a row (returns the values in the specified column)
SELECT column_one, column_two FROM account_images WHERE id = ?

//-------------- selecting all distinct values from a column (returns the values in the specified column)
SELECT DISTINCT column_two FROM table_name;

//-------------- selecting all rows that meet the specified condition (returns the rows)
SELECT * FROM table_name WHERE column_one > 55000.00;
    
//-------------- selecting all rows that meet the specified condition (returns the rows)
SELECT * FROM table_name LIMIT 3;

//-------------- selecting one rows that meet the specified condition (returns the row)
SELECT * FROM table_name WHERE column_two = 5;

//-------------- selecting all rows that meet the specified condition (returns the row)
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 60000;












//=============================== UPDATING ROW AND COLUMN COMMANDS

//-------------- updating a column within a row
UPDATE table_name SET column_three = 55000.00 WHERE column_one = 1;










//=============================== DELETING ROWS COMANDS

//-------------- deleting a row that meets the specified condition
DELETE FROM table_name WHERE column_three = 5;




















//=============================================================== MYSQL Module ========================================================================

/* 
            1) npm install mysql2

            2) In your 'db.js' file, write the following lines of code
    
                    const mysql = require('mysql2 or mysql2/promise');      
                    
    
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

//callback based
    db.execute(
        'SQL COMMAND',                //Commands
        ['new data'],              //data to send to database
        (err, results, fields) => {
        }
    );

//promised based
    await db.execute(
            'SELECT * FROM accounts WHERE email = ?',
            ['myEmail@gmail.com']);







        

//--------------- 'SELECT' COMMAND
/* 
    You can retrieve data from a database using the SELECT command with the .execute() method

    syntax: 

            SELECT * FROM table-name WHERE first-column-name = ? AND second-column-name = ?
            SELECT first-column-name, second-column-name FROM table-name
*/



// --------------------------- Callback based
    const db = require('./db.js');

    db.execute(
        'SELECT * FROM accounts WHERE email = ?', 
        ['myEmail@gmail.com'], 
        (err, results) => {
            results;  //an array of rows that match the query
        });



// --------------------------- Promise based
    const [accounts, columnMetaData] = await db.execute(
        'SELECT * FROM accounts WHERE email = ?',
        [email])

    accounts[0].name;
    accounts[0].otherData;










//--------------- 'INSERT INTO' COMMAND
/* 
    You can insert new data into a database using the INSERT INTO command with the .execute() method

            syntax:
        
                    INSERT INTO table-name (first-column-name, second-column-name) VALUES (?, ?), (?, ?)
        
                    VALUES = data can be inserted inside an array, the array is passed to the second argument
                             of .execute()
        
                    VALUES(?, ?) = ['email', 'password'];
        
                    VALUES (?, ?), (?, ?) = ['email', 'password', 'email', 'pasword']

            Return values: 
            
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


            Error Codes: 
            
                err.code = 'ER_DUP_ENTRY'      //the specific column already has the specified value
*/


// --------------------------- Callback based
    const db = require('./db.js');

    db.execute(
        'INSERT INTO accounts (email, password) VALUES (?, ?)', 
        [email, password], 
        (err, results) => {
           
        });

// --------------------------- Promise based
    try{
        const [results] = await db.execute(
            'INSERT INTO accounts (email, password, name) VALUE (?, ?, ?)',
            [email, password, name]);
    }
    catch(error){
        const message = error.code;
    }





















//--------------- 'UPDATE' COMMAND
/* 
    You can update data in a database by using the UPDATE command with the .execute() method

        syntax: 
    
            UPDATE table-name SET column-name = ? WHERE other-column-name = ?
    
        Return Values: 
    
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

    
*/


// --------------------------- Callback based
    const db = require('./db.js');

    db.execute(
        'UPDATE accounts SET password = ? WHERE email = ?', 
        ['newpassword', 'email'],
        (err, results) => {
            
        });

// --------------------------- Promise based

    try{
        const [results] = await db.execute(
            'UPDATE accounts SET reset_token = ?, reset_token_expiration = ? WHERE email = ?',
            [resetPasswordToken, resetPasswordExpires, email])   
    }
    catch(error){
        const code = error.code;
        
    }
 













//--------------- 'DELETE FROM' COMMAND
/* 
    You can delete data from a database using the DELETE FROM command with the .execute() method.

        syntax: 
    
             DELETE FROM table-name WHERE column-name = ?

        Return Values: 

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

*/


// --------------------------- Callback based
    const db = require('./db.js');

    db.execute(
        'DELETE FROM accounts WHERE email = ?', 
        ['someEmail@gmail.com'], 
        (err, results) => {
        });



// --------------------------- Promise based
    try{
        const [results] = await db.execute(
            'DELETE FROM accounts WHERE email = ?',
            [email])   
    }
    catch(error){
        const code = error.code;
    }




