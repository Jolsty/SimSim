// cron job

var Tessera = require('../models/tessera.model.js');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.month = 0; // gennaio - 0
rule.date = 30; // giorno 15
rule.hour = 18; // ore 18
rule.minute = 30; // minuti 0
rule.second = 0; // secondi 0

var j = schedule.scheduleJob(rule, function(){
    nowYear = new Date().getFullYear();
    console.log("Cron-job avviato: disattivo tutte le tessere con l'ultimo anno di rinnovo < " + (nowYear));
    Tessera.find( (err, tessere) => {
        if (err) console.error(err);
        else {
            for (i=0; i<tessere.length; i++) {
                tessera = tessere[i];
                if ( (nowYear !== tessera.ultimo_rinnovo.getFullYear()) && (tessera.stato == "ATTIVATA") ) { // e.g a Gennaio 2019 disattiva le tessere con ultimo_rinnovo <= 2017 e lascia stare le altre
                    tessera.stato="DISATTIVATA";
                    tessera.save( (err, tessera) => {
						if (err) console.error(err);
                        else console.log("Tessera con numero tessera " + tessera.numero_tessera + " disattivata per mancanza iscrizione");
					});
                }
            }
            console.log("Cron-job terminato: ci vediamo l'anno prossimo");
        }
    });
});
