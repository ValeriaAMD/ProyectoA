
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Estructura de tabla para la tabla `reservacion`

CREATE TABLE `reservacion` (
  `ID` int(11) NOT NULL,
  `ID_sala` int(11) NOT NULL,
  `hora_inicial` timestamp NULL DEFAULT NULL,
  `hora_final` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Estructura de tabla para la tabla `sala`

CREATE TABLE `sala` (
  `ID` int(11) NOT NULL,
  `nombre_sala` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Indices de la tabla `reservacion`

ALTER TABLE `reservacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_sala` (`ID_sala`);

-- Indices de la tabla `sala`
ALTER TABLE `sala`
  ADD PRIMARY KEY (`ID`);


-- AUTO_INCREMENT de las tablas volcadas



-- AUTO_INCREMENT de la tabla `reservacion`

ALTER TABLE `reservacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;


-- AUTO_INCREMENT de la tabla `sala`

ALTER TABLE `sala`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;


-- Restricciones para tablas volcadas



-- Filtros para la tabla `reservacion`

ALTER TABLE `reservacion`
  ADD CONSTRAINT `reservacion_ibfk_1` FOREIGN KEY (`ID_sala`) REFERENCES `sala` (`ID`);
COMMIT;
