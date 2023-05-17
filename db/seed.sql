-- Inserts names of departments into department table
INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');





-- Inserts roles of employee into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 85000, 1),
  ('Salesperson', 75000, 2),
  ('Accountant', 125000, 3),
  ('Lawyer', 200000, 4);




-- Inserts employee information into employee table
INSERT INTO employee
  (    first_name, last_name, role_id, manager_id, manager_confirm)
VALUES
  ('Juan', 'Garcia', 1, 4),
  ('Jonathan', 'Villcapoma', 2, 3),
  ('Jesus', 'Meraz', 3, 1),
  ('Estefany', 'Munoz', 4, 5);

  
-- MANAGERS --
INSERT INTO manager (first_name, last_name)
    SELECT first_name, last_name 
    FROM employee
    WHERE manager_confirm = 1
;

