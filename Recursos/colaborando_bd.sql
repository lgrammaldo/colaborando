-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.8-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para colaborando_bd
DROP DATABASE IF EXISTS `colaborando_db`;
CREATE DATABASE IF NOT EXISTS `colaborando_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `colaborando_bd`;

-- Volcando estructura para tabla colaborando_bd.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `razon_social` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `cuit` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cuit` (`cuit`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.empresas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.personas
CREATE TABLE IF NOT EXISTS `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.personas: ~1 rows (aproximadamente)
INSERT INTO `personas` (`id`, `usuario_id`, `dni`, `nombre`, `apellido`, `telefono`) VALUES
	(1, 1, 12312312, 'uri', 'carva', '123123123');

-- Volcando estructura para tabla colaborando_bd.tblAsistencias
CREATE TABLE IF NOT EXISTS `tblAsistencias` (
  `idAsistencias` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `notificacion` varchar(45) DEFAULT NULL,
  `idColaboradorEmpleados` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idAsistencias`),
  KEY `FK_tblAsistencias_tblColaboradoresEmpleos` (`idColaboradorEmpleados`),
  CONSTRAINT `FK_tblAsistencias_tblColaboradoresEmpleos` FOREIGN KEY (`idColaboradorEmpleados`) REFERENCES `tblColaboradoresEmpleos` (`idlColaboradoresEmpleos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblAsistencias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblCiudad
CREATE TABLE IF NOT EXISTS `tblCiudad` (
  `idCiudad` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `idProvincia` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `FK_tblCiudad_tblProvincia` (`idProvincia`),
  CONSTRAINT `FK_tblCiudad_tblProvincia` FOREIGN KEY (`idProvincia`) REFERENCES `tblProvincia` (`idProvincia`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblCiudad: ~4 rows (aproximadamente)
INSERT INTO `tblCiudad` (`idCiudad`, `nombre`, `idProvincia`) VALUES
	(1, 'CABA', 1),
	(2, 'Merlo', 1),
	(3, 'Rosario', 2),
	(4, 'Moron', 1);

-- Volcando estructura para tabla colaborando_bd.tblColaboradores
CREATE TABLE IF NOT EXISTS `tblColaboradores` (
  `idColaboradores` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) DEFAULT NULL,
  `calificacion` varchar(45) DEFAULT NULL,
  `cuil` varchar(45) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `idUsuarios` int(10) unsigned DEFAULT NULL,
  `idTurnos` int(10) unsigned DEFAULT NULL,
  `idCiudad` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idColaboradores`),
  KEY `FK_tblColaboradores_tblUsuarios` (`idUsuarios`),
  KEY `FK_tblColaboradores_tblCiudad` (`idCiudad`),
  KEY `FK_tblColaboradores_tblTurnos` (`idTurnos`),
  CONSTRAINT `FK_tblColaboradores_tblCiudad` FOREIGN KEY (`idCiudad`) REFERENCES `tblCiudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblColaboradores_tblTurnos` FOREIGN KEY (`idTurnos`) REFERENCES `tblTurnos` (`idTurnos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblColaboradores_tblUsuarios` FOREIGN KEY (`idUsuarios`) REFERENCES `tblUsuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblColaboradores: ~1 rows (aproximadamente)
INSERT INTO `tblColaboradores` (`idColaboradores`, `dni`, `calificacion`, `cuil`, `nombre`, `apellido`, `telefono`, `idUsuarios`, `idTurnos`, `idCiudad`) VALUES
	(1, '38123123', NULL, NULL, 'Javier', 'Ledesma', '12344321', 1, NULL, NULL);

-- Volcando estructura para tabla colaborando_bd.tblColaboradoresEmpleos
CREATE TABLE IF NOT EXISTS `tblColaboradoresEmpleos` (
  `idlColaboradoresEmpleos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idEmpleos` int(10) unsigned DEFAULT NULL,
  `idColaboradores` int(10) unsigned DEFAULT NULL,
  `idstatus` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idlColaboradoresEmpleos`),
  KEY `FK_tblColaboradoresEmpleos_tblEmpleos` (`idEmpleos`),
  KEY `FK_tblColaboradoresEmpleos_tblColaboradores` (`idColaboradores`),
  KEY `FK_tblColaboradoresEmpleos_tblStatus` (`idstatus`),
  CONSTRAINT `FK_tblColaboradoresEmpleos_tblColaboradores` FOREIGN KEY (`idColaboradores`) REFERENCES `tblColaboradores` (`idColaboradores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblColaboradoresEmpleos_tblEmpleos` FOREIGN KEY (`idEmpleos`) REFERENCES `tblEmpleos` (`idEmpleos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblColaboradoresEmpleos_tblStatus` FOREIGN KEY (`idstatus`) REFERENCES `tblStatus` (`idStatus`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblColaboradoresEmpleos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblEmpleados
CREATE TABLE IF NOT EXISTS `tblEmpleados` (
  `idEmpleados` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `legajo` varchar(45) DEFAULT NULL,
  `idEstablecimientos` int(10) unsigned DEFAULT NULL,
  `idUsuarios` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idEmpleados`),
  KEY `FK_tblEmpleados_tblUsuarios` (`idUsuarios`),
  KEY `FK_tblEmpleados_tblEstablecimientos` (`idEstablecimientos`),
  CONSTRAINT `FK_tblEmpleados_tblEstablecimientos` FOREIGN KEY (`idEstablecimientos`) REFERENCES `tblEstablecimientos` (`idEstablecimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblEmpleados_tblUsuarios` FOREIGN KEY (`idUsuarios`) REFERENCES `tblUsuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblEmpleados: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblEmpleos
CREATE TABLE IF NOT EXISTS `tblEmpleos` (
  `idEmpleos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEmpleos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblEmpleos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblEstablecimientos
CREATE TABLE IF NOT EXISTS `tblEstablecimientos` (
  `idEstablecimientos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `razonsocial` varchar(45) DEFAULT NULL,
  `cuit` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `idCiudad` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`idEstablecimientos`) USING BTREE,
  KEY `FK_tblEstablecimientos_tblCiudad` (`idCiudad`),
  CONSTRAINT `FK_tblEstablecimientos_tblCiudad` FOREIGN KEY (`idCiudad`) REFERENCES `tblCiudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblEstablecimientos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblEventos
CREATE TABLE IF NOT EXISTS `tblEventos` (
  `idEventos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lugar` varchar(45) DEFAULT NULL,
  `fechaPublicacion` varchar(45) DEFAULT NULL,
  `fechaFinBusqueda` varchar(45) DEFAULT NULL,
  `fechaInicio` varchar(45) DEFAULT NULL,
  `fechaFin` varchar(45) DEFAULT NULL,
  `idTurnos` int(10) unsigned DEFAULT NULL,
  `idUsuarios` int(10) unsigned DEFAULT NULL,
  `idStatus` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idEventos`),
  KEY `FK_tblEventos_tblTurnos` (`idTurnos`),
  KEY `FK_tblEventos_tblUsuarios` (`idUsuarios`),
  KEY `FK_tblEventos_tblStatus` (`idStatus`),
  CONSTRAINT `FK_tblEventos_tblStatus` FOREIGN KEY (`idStatus`) REFERENCES `tblStatus` (`idStatus`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblEventos_tblTurnos` FOREIGN KEY (`idTurnos`) REFERENCES `tblTurnos` (`idTurnos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblEventos_tblUsuarios` FOREIGN KEY (`idUsuarios`) REFERENCES `tblUsuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblEventos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblListas
CREATE TABLE IF NOT EXISTS `tblListas` (
  `idListas` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` varchar(45) DEFAULT NULL,
  `notificado` varchar(45) DEFAULT NULL,
  `idEventos` int(10) unsigned DEFAULT NULL,
  `idEmpleos` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idListas`),
  KEY `FK_tblListas_tblEventos` (`idEventos`),
  KEY `FK_tblListas_tblEmpleos` (`idEmpleos`),
  CONSTRAINT `FK_tblListas_tblEmpleos` FOREIGN KEY (`idEmpleos`) REFERENCES `tblEmpleos` (`idEmpleos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblListas_tblEventos` FOREIGN KEY (`idEventos`) REFERENCES `tblEventos` (`idEventos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblListas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblProvincia
CREATE TABLE IF NOT EXISTS `tblProvincia` (
  `idProvincia` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProvincia`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblProvincia: ~19 rows (aproximadamente)
INSERT INTO `tblProvincia` (`idProvincia`, `nombre`) VALUES
	(1, 'Buenos Aires'),
	(2, 'Santa Fe'),
	(3, 'Cordoba'),
	(4, 'Entre Rios'),
	(5, 'Corrientes'),
	(6, 'Misiones'),
	(7, 'Chaco'),
	(8, 'Formosa'),
	(9, 'Catamarca'),
	(10, 'Jujuy'),
	(11, 'Salta'),
	(12, 'Santiago del Estero'),
	(13, 'San Juan'),
	(14, 'San Luis'),
	(15, 'Mendoza'),
	(16, 'La Pampa'),
	(17, 'Santa cruz'),
	(18, 'Chubut'),
	(19, 'Tierra del Fuego');

-- Volcando estructura para tabla colaborando_bd.tblStatus
CREATE TABLE IF NOT EXISTS `tblStatus` (
  `idStatus` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblStatus: ~9 rows (aproximadamente)
INSERT INTO `tblStatus` (`idStatus`, `nombre`, `categoria`) VALUES
	(1, 'Activo', 'usuarios'),
	(2, 'Deshabilitado', 'usuarios'),
	(3, 'Terminada', 'usuarios'),
	(4, 'Activo', 'eventos'),
	(5, 'Pausado', 'eventos'),
	(6, 'Finalizado', 'eventos'),
	(7, 'Cancelado', 'eventos'),
	(8, 'Activo', 'colaboradores'),
	(9, 'Inactivo', 'colaboradores');

-- Volcando estructura para tabla colaborando_bd.tblTermCondUsuario
CREATE TABLE IF NOT EXISTS `tblTermCondUsuario` (
  `idtblTermCondUsuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaAceptacion` date DEFAULT NULL,
  `idUsuarios` int(10) unsigned DEFAULT NULL,
  `idTermCondVersion` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idtblTermCondUsuario`),
  KEY `FK_tblTermCondUsuario_tblTermCondVersion` (`idTermCondVersion`),
  KEY `FK_tblTermCondUsuario_tblUsuarios` (`idUsuarios`),
  CONSTRAINT `FK_tblTermCondUsuario_tblTermCondVersion` FOREIGN KEY (`idTermCondVersion`) REFERENCES `tblTermCondVersion` (`idTermCondVersion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblTermCondUsuario_tblUsuarios` FOREIGN KEY (`idUsuarios`) REFERENCES `tblUsuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblTermCondUsuario: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblTermCondVersion
CREATE TABLE IF NOT EXISTS `tblTermCondVersion` (
  `idTermCondVersion` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(45) DEFAULT NULL,
  `texto` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`idTermCondVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblTermCondVersion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblTipoUsuario
CREATE TABLE IF NOT EXISTS `tblTipoUsuario` (
  `idTipoUsuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblTipoUsuario: ~3 rows (aproximadamente)
INSERT INTO `tblTipoUsuario` (`idTipoUsuario`, `nombre`) VALUES
	(1, 'Colaborador'),
	(2, 'Organizador'),
	(3, 'Administrador');

-- Volcando estructura para tabla colaborando_bd.tblTurnos
CREATE TABLE IF NOT EXISTS `tblTurnos` (
  `idTurnos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `horario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idTurnos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblTurnos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla colaborando_bd.tblUsuarios
CREATE TABLE IF NOT EXISTS `tblUsuarios` (
  `idUsuarios` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) DEFAULT NULL,
  `idTipoUsuario` int(10) unsigned DEFAULT NULL,
  `idStatus` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`),
  KEY `FK_tblUsuarios_tblTipoUsuario` (`idTipoUsuario`),
  KEY `FK_tblUsuarios_tblStatus` (`idStatus`),
  CONSTRAINT `FK_tblUsuarios_tblStatus` FOREIGN KEY (`idStatus`) REFERENCES `tblStatus` (`idStatus`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tblUsuarios_tblTipoUsuario` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tblTipoUsuario` (`idTipoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.tblUsuarios: ~1 rows (aproximadamente)
INSERT INTO `tblUsuarios` (`idUsuarios`, `nombre`, `mail`, `contraseña`, `idTipoUsuario`, `idStatus`) VALUES
	(1, 'jledesma', 'jledesma@gmail.com', '1234', 1, 1);

-- Volcando estructura para tabla colaborando_bd.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `tipo_usuario` enum('Persona','Empresa') NOT NULL,
  `fecha_creacion` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla colaborando_bd.usuarios: ~1 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `email`, `password`, `tipo_usuario`, `fecha_creacion`) VALUES
	(1, 'ucarvallo@gmail.com', '123', 'Persona', '2024-08-31');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
