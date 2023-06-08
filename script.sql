CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(80) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    domain VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(30) NOT NULL
);

CREATE TABLE publications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    authors VARCHAR(200) NOT NULL,
    date_published DATETIME NOT NULL,
    link VARCHAR(100),
    review VARCHAR(100),
    conference VARCHAR(50),
    book VARCHAR(100),
    volume VARCHAR(30),
    number VARCHAR(30),
    pages INT(10),
    editor VARCHAR(50),
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (type_id) REFERENCES types(id)
);

INSERT INTO types (id, label) VALUES (1, "Revue"), (2, "Conférence"), (3, "Livre");
