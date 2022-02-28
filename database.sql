CREATE DATABASE perntodo;

\c perntodo

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE todo(
    todo_uid UUID NOT NULL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);