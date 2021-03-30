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
    departments_id INT NOT NULL,
    PRIMARY KEY(id),
    INDEX dep_ind (departments_id),
    FOREIGN KEY (departments_id)
        REFERENCES departments(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INT NOT NULL,
    managers_id INT NULL,
    PRIMARY KEY(id),   
    INDEX roles_ind (roles_id),
    FOREIGN KEY (roles_id)
        REFERENCES roles(id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
);


