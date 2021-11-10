
const controller = {};

controller.listPape = (req, art) => {
    req.getConnection((err, conn) => {
            conn.query('SELECT * FROM papeleria', (err, papeleria) => {//Obtener los datos de la tabla papeleria
                if (err) {
                    art.json(err);
                    return;
                }
                art.render('salas', {
                    dataPape: papeleria
                    
                });
            });

        });


    };



controller.saveSala = (req, art) => {//Controlador para dar de alta una articulo
    req.getConnection((err, conn) => {

        conn.query("INSERT INTO `papeleria` (`articulo`,`tipo`,`cantidad`) VALUES (?,?,?) ", [req.body.articulo, req.body.tipo, req.body.cantidad], (err, rows) => {//Insertamos el articulov con el query
            console.log(err);
            art.redirect('/');
        });
    })

};




controller.delete = (req, art) => {//Controlador para borrar una reservacion
    const { ID } = req.params;//Obtenemos el id de articulo.ejs
    req.getConnection((err, conn) => {
        //console.log()
        conn.query("DELETE FROM papeleria WHERE ID =?", [ID], (err, rows) => {//Ejecuta la query para borrar articulo
            res.redirect('/');

        });

    })
};


module.exports = controller;