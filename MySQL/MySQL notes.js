/* 
    MySQL is a relational database system that can be installed on any computer

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








            HOW TO ENABLE REMOTE ACCESS FOR MYSQL (WINDOWS)


                1) Open the 'my.ini' file, C:\ProgramData\MySQL\MySQL Server X.X\my and change the following option

                    bind-address = 0.0.0.0

                2) ?



            

                1) Open MYSQL workbench home page and go to the connection that you want to access remotely

                2) On the query tab, write the following commands

                        Create user 'root'@'%' identified by 'Darkness33!';
                        grant all privileges on *.* to 'root'@'%' with grant option;
                        flush privileges;

                3) Then go back to the home page again and right click on the connection, then click on Edit Connection

                4) On the parameters tab, 
                    Hostname = ipv4 address of your computer (open command line and enter 'ipconfig' as the command)
                    port = 3306 
                    Password = click on 'store in Vault' and enter the password specifed on step 2

                5) You will need to configure the firewall of your computer. Go to firewall ->  Advanced Settings.

                    For inbound rules, make sure port 3306 is there and allows access to all programs
                    For Outbound rules, create a rule that allows traffic on Port 3306 (rule must apply to TCP)
                   

                5) Click on test connection

                

            HOW TO ENABLE REMOTE ACCESS FOR MYSQL (MACOS)

                1) Open MYSQL workbench home page and open the connection you want to have remote access for

                2) Click on the query tab and write the following commands       
                
                        Create user 'root'@'%' identified by 'Darkness33!';
                        grant all privileges on *.* to 'root'@'%' with grant option;
                        flush privileges;
                        
                3) Go back to the home page and click on 'Edit Connections'. Then click on the parameters tab

                       Host: the ipv4 address of your computer, open command prompt and run 'ipconfig getifaddr en0'
                       port: 3306
                       password: click on 'store in Vault' and enter the password specifed on step 2

                4) Open firewall, click on Options, Click on the plus sign and add the mySQL binary file
                   located in this directory

                       /usr/local/mysql/bin/mysqld
                       
                5) Click on test connection
        
*/


//=============================================================== MYSQL Module ========================================================================

/* 
            1) npm install mysql2

            2) In your 'db.js' file, write the following lines of code
    
                    const mysql = require('mysql');
    
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








