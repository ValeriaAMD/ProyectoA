
const controller = {};

controller.listReser = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM articulo', (err, rese) => {//Obtener los datos de la tabla reservacion
            if (err) {
                res.json(err);
                return;
            }
            conn.query('SELECT * FROM papeleria', (err, salas) => {//Obtener los datos de la tabla sala
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


controller.saveSala = (req, res) => {//Controlador para dar de alta una sala
    req.getConnection((err, conn) => {

        conn.query("INSERT INTO `sala` (`nombre_sala`) VALUES (?) ", [req.body.nombre_sala], (err, rows) => {//Insertamos la sala con el query
            console.log(err);
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