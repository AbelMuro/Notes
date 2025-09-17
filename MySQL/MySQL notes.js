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
            1) npm install mysql

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







//---------------------------------------------------- Creating a query
/* 
    A query is a request to either update or retrieve data from a database.
    You can create a query by using the query() method.
*/


//--------------- Retrieving Data from a database
/* 
    You can retrieve data from a database using a SELECT query
*/

        const db = require('./db.js');

        db.query('SELECT * FROM users', (err, results) => {               
              if (err) {
                console.error('Query error:', err);
                return;
              }
              console.log('Results:', results);
        });


