DROP DATABASE IF EXISTS TaskManager;

CREATE DATABASE TaskManager;

USE TaskManager;

CREATE TABLE tasks (
  id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (name, status) VALUES
  ('Fazer almoço', 'pronto'),
  ('Arrumar o quarto', 'em andamento'),
  ('Dar banho no cachorro', 'pendente');

GRANT ALL PRIVILEGES ON database_name.TaskManager TO 'root'@'localhost';