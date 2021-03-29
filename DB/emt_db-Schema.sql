DROP DATABASE IF EXISTS emt_db;
CREATE DATABASE emt_db;

USE emt_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    INDEX dep_ind (department_id),
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id),   
    INDEX role_ind (role_id),
    FOREIGN KEY (role_id)
        REFERENCES role(id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
);


