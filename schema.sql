-- Schema para guendolina (nombre de la base: app-guendolina)
CREATE DATABASE IF NOT EXISTS `app-guendolina` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `app-guendolina`;

CREATE TABLE IF NOT EXISTS `users` (
  `idusers` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user-name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `styles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name-style` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `image` VARCHAR(255),
  `status` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario_id` INT UNSIGNED,
  `detalles` TEXT,
  `total` DECIMAL(10,2) DEFAULT 0,
  `estado` VARCHAR(50) DEFAULT 'pendiente',
  `fecha_pedido` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pedido`),
  INDEX (`usuario_id`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`idusers`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
