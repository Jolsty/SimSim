module.exports = function(app) {

	var logs = require('../controllers/logs.controller.js');

	app.get('/api/logs/view', logs.viewAllLogs);

	app.get('/api/logs/viewByNumeroTessera/:numeroTessera', logs.viewLogsByNumeroTessera);

	app.get('/api/logs/viewByNomeCognome/:nome/:cognome', logs.viewLogsByNomeCognome);

	app.get('/api/logs/viewByDate/:data', logs.viewLogsByDate);

	app.get('/api/logs/viewByTipo/:tipo', logs.viewLogsByTipo);

	app.post('/api/logs/add', logs.addLog); // per Arduino

	// dobbiamo cancellare log per causa spazio?

}
