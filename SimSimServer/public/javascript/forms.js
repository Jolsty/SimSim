var indirizzo = "http://192.168.1.107:3000";

// addTesseraForm

const addTesseraForm = $("#addTesseraForm");
addTesseraForm.on('submit', function(e) {
    e.preventDefault();

    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
        if (xHttp.readyState == 4) {
            alert(xHttp.responseText);
            if (xHttp.status === 200) window.location.href = indirizzo + "/api/tessere/view";
        }
    };

    let numero_tessera = $('#numero_tessera')[0].value;
    let seriale = $('#seriale')[0].value;
    let stato = $('input[name=stato]:checked')[0].value;

    let data = JSON.stringify(
        {
            "numero_tessera": numero_tessera,
            "seriale": seriale,
            "stato": stato
        }
    );
    // Clear the form
    $('#numero_tessera').val('');
    $('#seriale').val('');
    // Send the data to the specified URL
    xHttp.open("POST", "/api/tessere/add", true);
    xHttp.setRequestHeader("Content-Type", "text/plain");
    xHttp.send(data);
});

// addSocioForm

const addSocioForm = $("#addSocioForm");
addSocioForm.on('submit', function(e) {
    e.preventDefault();

    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
        if (xHttp.readyState == 4) {
            alert(xHttp.responseText);
            if (xHttp.status === 200) window.location.href = indirizzo + "/api/soci/view";
        }
    };

    let nome = $('#nome')[0].value;
    let cognome = $('#cognome')[0].value;
    let numero_tessera = $('#numero_tessera')[0].value;
    let sesso = $('input[name=sesso]:checked')[0].value;
    let nascita = $('#nascita')[0].value;
    let email = $('#email')[0].value;
    let nazionalita = $('#nazionalita')[0].value;
    let ruolo = $('#ruolo')[0].value;
    let regione = $('#regione')[0].value;
    let provincia = $('#provincia')[0].value;
    let citta = $('#citta')[0].value;
    let cap = $('#cap')[0].value;
    let via = $('#via')[0].value;
    let civico = $('#civico')[0].value;
    let telefono1 = $('#telefono1')[0].value;
    let telefono2 = $('#telefono2')[0].value;
    let professione = $('#professione')[0].value;
    let interesse1 = $('#interesse1')[0].value;
    let interesse2 = $('#interesse2')[0].value;
    let note = $('#note')[0].value;
    let prima_iscrizione = $('#prima_iscrizione')[0].value;
    let ultimo_rinnovo_iscrizione = $('#ultimo_rinnovo_iscrizione')[0].value;

    let data = JSON.stringify(
        {
            "nome": nome,
            "cognome": cognome,
            "numero_tessera": numero_tessera,
            "sesso": sesso,
            "nascita": nascita,
            "email": email,
            "nazionalita": nazionalita,
            "ruolo": ruolo,
            "indirizzo":
            {
                "regione": regione,
                "provincia": provincia,
                "citta": citta,
                "cap": cap,
                "via": via,
                "civico": civico
            },
            "telefoni":
            {
                "telefono1": telefono1,
                "telefono2": telefono2
            },
            "professione": professione,
            "interessi":
            {
                "interesse1": interesse1,
                "interesse2": interesse2
            },
            "note": note,
            "prima_iscrizione": prima_iscrizione,
            "ultimo_rinnovo_iscrizione": ultimo_rinnovo_iscrizione
        }
    );

    // Send the data to the specified URL
    xHttp.open("POST", "/api/soci/add", true);
    xHttp.setRequestHeader("Content-Type", "text/plain");
    xHttp.send(data);
});

// aggiornaSocioForm

const aggiornaSocioForm = $("#aggiornaSocioForm");
aggiornaSocioForm.on('submit', function(e) {
    e.preventDefault();

    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
        if (xHttp.readyState == 4) {
            alert(xHttp.responseText);
            if (xHttp.status === 200) window.location.href = indirizzo + "/api/soci/view";
        }
    };

    let nome = $('#nomeAgg')[0].value;
    let cognome = $('#cognomeAgg')[0].value;
    let numero_tessera = $('#numero_tesseraAgg')[0].value;
    let sesso = $('input[name=sessoAgg]:checked')[0].value;
    let nascita = $('#nascitaAgg')[0].value;
    let email = $('#emailAgg')[0].value;
    let nazionalita = $('#nazionalitaAgg')[0].value;
    let ruolo = $('#ruoloAgg')[0].value;
    let regione = $('#regioneAgg')[0].value;
    let provincia = $('#provinciaAgg')[0].value;
    let citta = $('#cittaAgg')[0].value;
    let cap = $('#capAgg')[0].value;
    let via = $('#viaAgg')[0].value;
    let civico = $('#civicoAgg')[0].value;
    let telefono1 = $('#telefono1Agg')[0].value;
    let telefono2 = $('#telefono2Agg')[0].value;
    let professione = $('#professioneAgg')[0].value;
    let interesse1 = $('#interesse1Agg')[0].value;
    let interesse2 = $('#interesse2Agg')[0].value;
    let note = $('#noteAgg')[0].value;
    let prima_iscrizione = $('#prima_iscrizioneAgg')[0].value;
    let ultimo_rinnovo_iscrizione = $('#ultimo_rinnovo_iscrizioneAgg')[0].value;
    let id = $('#socioId')[0].value;

    let data = JSON.stringify(
        {
            "nome": nome,
            "cognome": cognome,
            "numero_tessera": numero_tessera,
            "sesso": sesso,
            "nascita": nascita,
            "email": email,
            "nazionalita": nazionalita,
            "ruolo": ruolo,
            "indirizzo":
            {
                "regione": regione,
                "provincia": provincia,
                "citta": citta,
                "cap": cap,
                "via": via,
                "civico": civico
            },
            "telefoni":
            {
                "telefono1": telefono1,
                "telefono2": telefono2
            },
            "professione": professione,
            "interessi":
            {
                "interesse1": interesse1,
                "interesse2": interesse2
            },
            "note": note,
            "prima_iscrizione": prima_iscrizione,
            "ultimo_rinnovo_iscrizione": ultimo_rinnovo_iscrizione
        }
    );

    // Send the data to the specified URL
    xHttp.open("PUT", "/api/soci/update/" + id, true);
    xHttp.setRequestHeader("Content-Type", "text/plain");
    xHttp.send(data);
});

// ricercaSoci

const ricercaSoci = $("#ricercaSoci");

ricercaSoci.on('submit', function(e) {
    e.preventDefault();
    let searchTerm = $('#cercaSoci')[0].value;
    window.location.href = indirizzo + "/api/soci/search/" + searchTerm;

});

// ricercaLogs

const ricercaLogs = $("#ricercaLogs");

ricercaLogs.on('submit', function(e) {
    e.preventDefault();
    let searchTerm = $('#cercaLogs')[0].value;
    window.location.href = indirizzo + "/api/logs/search/" + searchTerm;

});

// validateData form

const cercaPerDataForm = $("#cercaPerDataForm");

cercaPerDataForm.on('submit', function(e) {
    e.preventDefault();
    let url = indirizzo + "/api/logs/viewByDate/";
    let anno = $("#anno")[0].value;
    let mese = $("#mese")[0].value;
    let giorno = $("#giorno")[0].value;

    if (mese === '' && giorno !== '') {
        alert("Se hai inserito il giorno devi inserire anche il mese!");
        return false;
    }

    var currentYear = new Date().getFullYear();
    if (anno < 1970 || anno > currentYear) {
        alert("L'anno deve essere compreso tra 1970 e " + currentYear);
        return false;
    }

    if (mese !== '' && (mese < 1 || mese > 12)) {
        alert("Il mese deve essere compreso tra 1 e 12");
        return false;
    }

    if (giorno !== '' && (giorno < 1 || giorno > 31)) {
        alert("Il giorno deve essere compreso tra 1 e 31");
        return false;
    }

    url = url + anno;
    if (mese !== '') {
        url = url + "-" + mese;
        if (giorno !== '') url = url + "-" + giorno;
    }

    window.location.href = url;
});

/*function validateData() {
    let url = indirizzo + "/api/logs/viewByDate/";
    let form = $("#cercaPerDataForm");
    let anno = $("#anno")[0].value;
    let mese = $("#mese")[0].value;
    let giorno = $("#giorno")[0].value;

    if (mese === '' && giorno !== '') {
        alert("Se hai inserito il giorno devi inserire anche il mese!");
        return false;
    }

    var currentYear = new Date().getFullYear();
    if (anno < 1970 || anno > currentYear) {
        alert("L'anno deve essere compreso tra 1970 e " + currentYear);
        return false;
    }

    if (mese !== '' && (mese < 1 || mese > 12)) {
        alert("Il mese deve essere compreso tra 1 e 12");
        return false;
    }

    if (giorno !== '' && (giorno < 1 || giorno > 31)) {
        alert("Il giorno deve essere compreso tra 1 e 31");
        return false;
    }

    url = url + anno;
    if (mese !== '') {
        url = url + "-" + mese;
        if (giorno !== '') url = url + "-" + giorno;
    }

    form.attr('action', url);
    form.attr('method', 'GET');
}*/
