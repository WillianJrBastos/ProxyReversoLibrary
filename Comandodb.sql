CREATE DATABASE biblioteca;

CREATE USER root WITH PASSWORD 'root123#';

GRANT ALL PRIVILEGES ON DATABASE biblioteca TO root;

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano_publicacao INT,
    disponivel BOOLEAN DEFAULT TRUE
);

GRANT ALL PRIVILEGES ON TABLE livros TO root;
GRANT USAGE, SELECT ON SEQUENCE livros_id_seq TO root;

INSERT INTO livros (titulo, autor, ano_publicacao) VALUES
('Livros 1', 'Autor 1', 2000),
('Livros 2', 'Autor 2', 1990);