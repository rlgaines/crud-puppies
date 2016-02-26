
DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\connect puppies;

CREATE TABLE dogs(
	id serial PRIMARY KEY,
	breed varchar(255),
	name varchar(255),
	alive boolean,
	age integer
); 

INSERT INTO dogs (breed, name, alive, age)
VALUES ('Lab', 'Kaiso', 'false', '5'),
('Bulldog', 'Chaz', 'True', '2');

