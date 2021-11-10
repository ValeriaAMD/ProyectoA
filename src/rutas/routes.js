const express = require ('express');
const router = express.Router();
const salaController = require('../controladores/salaControlador');

router.get('/',salaController.listPape);
//router.post('/addReser', salaController.saveReser);
router.post('/addSala', salaController.saveSala);
router.get('/delete/:ID', salaController.delete);




module.exports = router;