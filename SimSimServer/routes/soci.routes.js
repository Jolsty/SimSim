module.exports = function(app) {

	var soci = require('../controllers/soci.controller.js');

	app.get('/api/soci/search/:term', soci.fullTableSearch);

	app.get('/api/soci/view', soci.viewAllSoci);

	//app.get('/api/soci/view/:id', soci.viewSocioById)

	// app.get('/api/soci/viewByNumeroTessera/:numeroTessera', soci.viewSocioByNumeroTessera);

	// app.get('/api/soci/viewByNomeCognome/:nome/:cognome', soci.viewSociByNomeCognome);

	// app.get('/api/soci/viewByRuolo/:ruolo', soci.viewSociByRuolo);

	// app.get('/api/soci/viewByRegione/:regione', soci.viewSociByRegione);

	// app.get('/api/soci/viewByProvincia/:provincia', soci.viewSociByProvincia);

	// app.get('/api/soci/viewByCitta/:citta', soci.viewSociByCitta);

	// app.get('/api/soci/viewBySesso/:sesso', soci.viewSociBySesso);

	app.get('/api/soci/create', soci.createSocio);

	app.get('/api/soci/update/:id', soci.updateSocio)

  	app.post('/api/soci/add', soci.addSocio);

	app.put('/api/soci/update/:id', soci.updateById);

	app.delete('/api/soci/delete/:id', soci.deleteSocio);

}
