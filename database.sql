-- -- First delete the existing database
-- DROP DATABASE better_change;
--
-- -- Then create a new database
-- CREATE DATABASE better_change;
--
-- -- If you prefer to simply delete the tables instead of the whole database, user the code below:
-- DROP TABLE biography;
-- DROP TABLE donation;
-- DROP TABLE donor;
-- DROP TABLE recipient;
-- DROP TABLE organisation;
--
--
-- -- Insert this code inside your better_change database
-- CREATE TABLE organisation(
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   username VARCHAR(200) UNIQUE,
--   password VARCHAR(200),
--   type VARCHAR(20)
-- );
--
-- CREATE TABLE recipient(
--   id SERIAL PRIMARY KEY,
--   first_name VARCHAR(100) NOT NULL,
--   last_name VARCHAR(100),
--   photo VARCHAR(500) NOT NULL UNIQUE,
--   tel VARCHAR(30) UNIQUE,
--   username VARCHAR(200) NOT NULL UNIQUE,
--   password VARCHAR(200) NOT NULL,
--   type VARCHAR(20),
--   organisation_id INT,
--   reason VARCHAR(500),
--   creation_date TIMESTAMP WITH TIME ZONE,
--   FOREIGN KEY (organisation_id) REFERENCES organisation(id)
-- );
