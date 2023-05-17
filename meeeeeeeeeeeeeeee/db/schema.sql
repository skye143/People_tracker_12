CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
    -- department_id INT NOT NULL,
    -- CONSTRAINT FOREIGN KEY (department_id)
    -- REFERENCES department (id) ON DELETE CASCADE
);


CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
    -- role_id INT NOT NULL,
    --  CONSTRAINT FOREIGN KEY (role_id)
    -- REFERENCES role(id) ON DELETE CASCADE,
    -- manager_id INT,
    -- FOREIGN KEY (manager_id)
    -- REFERENCES employee(id)
);







