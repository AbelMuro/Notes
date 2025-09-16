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

*/


//=============================================================== MYSQL Module ========================================================================

/* 
            1) npm install mysql

            2) In your 'db.js' file, write the following lines of code
    
                    const mysql = require('mysql');
    
                    const pool = mysql.createPool({
                          host: 'localhost',            
                          user: 'your_user',
                          password: 'your_password',
                          database: 'your_database',
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


