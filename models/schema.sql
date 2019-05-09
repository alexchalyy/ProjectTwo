DROP DATABASE IF EXISTS delidb;
CREATE DATABASE delidb;

use delidb;

insert into Dishes (text, description, ready, pickup, createdAt, updatedAt) values ("Ruben", "Ruben", false, false, CURRENT_TIME(), CURRENT_TIME());
insert into Dishes (text, description, ready, pickup, createdAt, updatedAt) values ("Ruben", "Ruben", true, false, CURRENT_TIME(), CURRENT_TIME());
insert into Dishes (text, description, ready, pickup, createdAt, updatedAt) values ("Ruben", "Ruben", false, false, CURRENT_TIME(), CURRENT_TIME());
insert into Dishes (text, description, ready, pickup, createdAt, updatedAt) values ("Ruben", "Ruben", true, false, CURRENT_TIME(), CURRENT_TIME());

select * from Dishes;