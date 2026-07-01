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



                        
*/    



//=============================================================== SQL COMMANDS ========================================================================





















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




