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





            HOW TO CREATE A DATABASE IN MYSQL WORKBENCH

                1) Click on the 'Create Schema' button on the top left corner
                   and choose a name for the schema. Then click 'apply'

                2) Then on the left hand side, right click on Tables and select 'Create Table'

                3) You can create the columns of the Table. Each column will represent a piece of data.
                   Each column must have a name, and a data type.

                4) Then right click on the table and select 'Select Rows'

                5) A list of all the data in the schema will be displayed


*/


//=============================================================== MYSQL Module ========================================================================

/* 
            1) npm install mysql2

            2) In your 'db.js' file, write the following lines of code
    
                    const mysql = require('mysql2');
    
                    const pool = mysql.createPool({
                          host: '',                            // Administration -> Client Connections -> Copy the host
                          user: '',                            // Administration -> Users and Privileges -> Copy the user name
                          password: '',                        // Use the password that you entered when you installed mySQL
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








