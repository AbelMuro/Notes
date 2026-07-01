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

