DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE manager (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    manager_confirm BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES roles(id) ON DELETE
    SET NULL
);