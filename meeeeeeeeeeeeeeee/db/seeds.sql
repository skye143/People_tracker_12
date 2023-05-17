USE tracker_db;

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Legal'),
    ('Finance'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES 

    ('Salesperson', 85000, 1),
    ('Accountant', 135000, 2),
    ('Lawyer', 200000, 3),
    ('Software Engineer', 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 

    ('Stephan','Grace', 1, 4),
    ('Matt','Hunter', 2, 3),
    ('Marty','McFly', 3, 1),
    ('Adam','Ficmically', 4, 5);






