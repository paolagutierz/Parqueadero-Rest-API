CREATE DATABASE parqueadero;
USE parqueadero;

CREATE TABLE vehiculos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(6) NOT NULL,
    hora_entrada datetime,
    hora_salida datetime,
    estado VARCHAR(10),
    total decimal
);

CREATE TABLE app_parametros (
	id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(25) NOT NULL,
    value_of NUMERIC NOT NULL
);

INSERT INTO app_parametros (key_name, value_of) VALUES ('capacity', 30);