/* ORIGINAL
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


<<<<<<< HEAD:database.txt
-- insert into usuarios (email, password, tipo_usuario, fecha_creacion)
-- values ("ucarvallo@gmail.com","123","Persona",'2024-08-31');
=======
insert into usuarios (email, password, tipo_usuario, fecha_creacion) 
 values ("ucarvallo@gmail.com","123","Persona",'2024-08-31');
>>>>>>> main:Recursos/database.sql

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
*/

CREATE TABLE Usuarios (
    Id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(32) NOT NULL,
    Tipo_usuario ENUM('Persona', 'Empresa') NOT NULL,
    Fecha_creacion DATE,
    Id_tipo_empleo INTEGER,
    Id_empresa INTEGER

);

CREATE TABLE Empresas (
    Id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(100) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Cuit VARCHAR(15) UNIQUE
);

CREATE TABLE Eventos (
Id_evento INTEGER AUTO_INCREMENT PRIMARY KEY,
Nombre VARCHAR(100),
Fecha DATE,
Id_establecimiento INTEGER,
Cantidad_personal INTEGER,
Especificaciones VARCHAR (500),
Mensaje_predeterminado VARCHAR (500)
);

CREATE TABLE Eventos_contratados (
Id_evento INTEGER,
Id_usuario INTEGER,
Id_establecimiento INTEGER
);

CREATE TABLE Disponibilidad(
Id_usuario INTEGER,
Dia_de_la_semana VARCHAR(15),
Disponibilidad_total BOOLEAN,
Id_turno INTEGER
);

CREATE TABLE Turnos(
Id_turno INTEGER AUTO_INCREMENT PRIMARY KEY,
Descripcion VARCHAR(50)
);

CREATE TABLE Usuario_agenda(
Id_usuario INTEGER,
Fecha DATE
);

CREATE TABLE Tipo_empleo(
Id_tipo_empleo INTEGER AUTO_INCREMENT PRIMARY KEY,
Desc_tipo_empleo VARCHAR(50)
);

CREATE TABLE Establecimiento_usuario(
Id_usuario INTEGER,
Id_establecimiento INTEGER,
Fecha_inicio DATE,
Fecha_fin DATE
);

CREATE TABLE Rel_Usuario_Empleo(
ID_USUARIO INTEGER,
ID_TIPO_EMPLEO INTEGER
);


/*ESTAS ULTIMAS DOS VEMOS SI LAS AGREGAMOS*/
CREATE TABLE Term_cond_usuario (
Id_usuario INTEGER,
Id_version INTEGER,
Fecha_aceptacion DATE
);

CREATE TABLE Terminos_condiciiones_version (
Id_version INTEGER,
Texto TEXT,
Fecha_aceptacion DATE
);