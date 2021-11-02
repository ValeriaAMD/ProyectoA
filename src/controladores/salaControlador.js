
const controller = {};

controller.listReser = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reservacion', (err, rese) => {//Obtener los datos de la tabla reservacion
            if (err) {
                res.json(err);
                return;
            }
            conn.query('SELECT * FROM sala', (err, salas) => {//Obtener los datos de la tabla sala
                if (err) {
                    res.json(err);
                    return;
                }
                res.render('salas', {
                    dataSala: salas,
                    dataReser: rese
                });
            });

        });


    });
};


controller.saveReser = (req, res) => {//Controlador para dar de alta una sala
    var hora_ini = new Date(req.body.hora_inicial);
    var hora_fin = new Date(req.body.hora_final);
    const diffTime = Math.abs(hora_fin - hora_ini);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));//Calculamos la diferencia de horas entre la fecha inicial y la final
    if (hora_fin > hora_ini) {
        if (diffHours <= 2) {//Si la diferencia es menor o igual a 2 (horas) entonces prosigue
            req.getConnection((err, conn) => {
                conn.query("SELECT * FROM reservacion WHERE\
            hora_inicial BETWEEN ? AND\
            ? OR hora_final BETWEEN ? AND\
            ?", [req.body.hora_inicial, req.body.hora_final, req.body.hora_inicial, req.body.hora_final], (err, rows) => {//Revisa si el horario en el que se reserva no esta ocupado
                    if (err) {
                        res.json(err);
                        return;
                    }
                    if (rows.length == 0) {
                        conn.query("INSERT INTO `reservacion` (`ID_sala`, `hora_inicial`, `hora_final`)\
                VALUES (?,?,?) ", [req.body.IDSala, req.body.hora_inicial + ':00', req.body.hora_final + ':00'], (err, rows) => { //Insertamos la reservacion 
                            console.log(err);
                            res.redirect('/');

                        });
                    }
                    else {
                        console.log(rows);
                        console.log("Ingrese un horario que no este ocupado");
                        res.redirect('/');
                    }


                });


            })
        }
    } else {
        console.log("Ingrese un lapso entre dos horas");
        res.redirect('/');
    }
};

controller.saveSala = (req, res) => {//Controlador para dar de alta una sala
    req.getConnection((err, conn) => {

        conn.query("INSERT INTO `sala` (`nombre_sala`) VALUES (?) ", [req.body.nombre_sala], (err, rows) => {//Insertamos la sala con el query
            console.log(err);
            res.redirect('/');
        });
    })

};

controller.autoBorrado = (req, res) => {//Controlador encargado de borrar las reservaciones caducadas.
    var hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    req.getConnection((err, conn) => {

        conn.query("DELETE FROM reservacion WHERE  id_sala in (select id_sala from reservacion where hora_final < ?)", [fechaYHora], (err, rows) => {//Borra las esiones que ya se hayan pasado de su hora final
            console.log(err);
            console.log(rows);
            res.redirect('/');
        });
    })

};


controller.delete = (req, res) => {//Controlador para borrar una reservacion
    const { id } = req.params;//Obtenemos el id de salas.ejs
    req.getConnection((err, conn) => {
        //console.log()
        conn.query("DELETE FROM reservacion WHERE ID =?", [id], (err, rows) => {//Ejecuta la query para borrar la sala
            res.redirect('/');

        });

    })
};


module.exports = controller;