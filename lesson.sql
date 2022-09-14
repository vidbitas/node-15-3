-- CREATE USERS
CREATE TABLE users (
	id INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
  role ENUM('USER','ADMIN') DEFAULT 'USER',
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

-- ADD USERS
INSERT INTO `users`( `email`, `password`) VALUES
('user1@gmail.com','Vilnius123'),
('user2@gmail.com','Vilnius123'),
('user3@gmail.com','Vilnius123'),
('user4@gmail.com','Vilnius123'),
('user5@gmail.com','Vilnius123'),
('user6@gmail.com','Vilnius123');