module.exports = function(app) {

	var tessere = require('../controllers/tessere.controller.js');

	app.get('/api/tessere/view', tessere.viewAllTessere);

	app.get('/api/tessere/create', tessere.createTessera);

	app.get('/api/tessere/viewByNumeroTessera/:numeroTessera', tessere.viewTesseraByNumeroTessera);

	app.post('/api/tessere/check', tessere.checkTesseraBySeriale); // per Arduino

    app.post('/api/tessere/add', tessere.addTessera);

	app.put('/api/tessere/update/:id', tessere.updateTessera);

    app.delete('/api/tessere/delete/:id', tessere.deleteTessera);

}
