USE tracker_db;

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Legal'),
    ('Finance'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES 

    ('Sales Lead', 100000, 1),
    ('Salesperson', 100000, 1),
    ('Lead Engineer', 100000, 1),
    ('Software Engineer', 100000, 1),
    ('Account Manager', 100000, 1),
    ('Lawyer', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES 

    ('Kevin','Tracey', 1, NULL),
    ('Happy','GoLucky', 2, 1),
    ('Stephan','Grace', 3, 1),
    ('Matt','Hunter', 4, 1),
    ('Marty','McFly', 5, 1),
    ('Adam','Ficmically', 6, 1);






