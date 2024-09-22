CREATE DATABASE colaborando_bd;
use colaborando_bd;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(32) NOT NULL,
    tipo_usuario ENUM('Persona', 'Empresa') NOT NULL,
    fecha_creacion DATE
);

CREATE TABLE personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
     usuario_id int,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    dni INT UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
	usuario_id int,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    razon_social VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    cuit VARCHAR(15) UNIQUE
);


insert into usuarios (email, password, tipo_usuario, fecha_creacion) 
 values ("ucarvallo@gmail.com","123","Persona",'2024-08-31');

insert into  personas (usuario_id,dni, nombre,apellido, telefono)
 values (1,12312312, "uri","carva","123123123");

select * from usuarios;
select * from personas;
select * from empresas;

ALTER TABLE personas DROP FOREIGN KEY personas_ibfk_1;
ALTER TABLE empresas DROP FOREIGN KEY empresas_ibfk_1;
DROP TABLE usuarios;
DROP TABLE personas;
DROP TABLE empresas;





