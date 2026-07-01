/* 
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

*/
