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