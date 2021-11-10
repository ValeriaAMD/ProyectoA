
//Para ejecutar con nodemon, el comando a ejecutar es "npm run dev"
//Los modulos utilizados para ejecutar este proyecto son:
    //"ejs": "^3.1.6",
    //"express": "^4.17.1",
    //"express-myconnection": "^1.0.4",
    //"mysql": "^2.18.1",
    //"request": "^2.88.2"
    //"nodemon": "^2.0.13"
    

setInterval(borradoAutomatico,30000);  //La funcion borradoAutomatico() se ejecuta cada 30 segundos.
                                                                                                             

const express = require('express');
const main = express();
const path = require('path');
const mysql = require('mysql');
const connection = require('express-myconnection');
const request = require('request');

//Config
main.set('port', process.env.PORT || 3000)//Extablecemos el puerto del servidor.
main.set('view engine', 'ejs');//Utilizaremos ejs como motor de plantilla.
main.set('views', path.join(__dirname, 'vistas')); //Establecemos la ruta para nuestars views con el modulo path.

//Importamos rutas
const salaRoutes = require('./rutas/routes.js');



//Middleware

main.use(connection(mysql, { //Configuracion del servidor mysql
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306', //El puerto de mi localhost es el 3306, si el tuyo es diferente cambia este valor por el puerto de tu mysql
    database: 'almacenITPA' //Nombre de la base de datos

}, 'single'));

main.use(express.urlencoded({extended:false})); 

//Rutas
main.use('/', salaRoutes);

main.listen(main.get('port'), () => {
    console.log("Server iniciado en puerto 3000");
});

function borradoAutomatico(){//Esta funcion ejecuta el controlador de borrado automatico la cual borra las sesion es caducadas
    request('http://localhost:3000/borrarAuto');
}
