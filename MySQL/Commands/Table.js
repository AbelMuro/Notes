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
