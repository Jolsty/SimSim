var indirizzo = "http://192.168.1.107:3000";
const infoSocio = $(".w3-round.w3-btn.soci");
const sociDiv = $("#soci-hidden");
const dettagliSocio = $(".w3-margin-left.dettagliSocio")
const namePlaceholder = $(".w3-dark-grey.w3-xlarge.w3-padding-32.w3-center.w3-namePlaceholder");
const displayDettagli = $(".w3-twothird.displayDettagli");

if (infoSocio) {
    infoSocio.click(function () {
        let container = $(this);
        let id = this.value;
        let soci = JSON.parse(sociDiv[0].innerHTML);

        for (i=0; i<soci.length; i++) {
            if (soci[i]._id === id) {
                namePlaceholder[0].innerHTML = "<b>" + soci[i].nome + " " + soci[i].cognome + "</b>";
                dettagliSocio.children()[0].innerHTML = "<b>Numero tessera: </b>" + soci[i].numero_tessera;
                dettagliSocio.children()[1].innerHTML = "<b>Sesso: </b>" + soci[i].sesso;
                dettagliSocio.children()[2].innerHTML = "<b>Nascita: </b>" + dateFormat(soci[i].nascita.toLocaleString("it-IT", { "year": "numeric", "month": "2-digit", "day": "2-digit" }))
                dettagliSocio.children()[3].innerHTML = "<b>Mail: </b>" + soci[i].email;
                dettagliSocio.children()[4].innerHTML = "<b>Nazionalità: </b>" + soci[i].nazionalita;
                dettagliSocio.children()[5].innerHTML = "<b>Ruolo: </b>" + soci[i].ruolo;
                dettagliSocio.children()[6].innerHTML = "<b>Regione: </b>" + soci[i].indirizzo.regione;
                dettagliSocio.children()[7].innerHTML = "<b>Provincia: </b>" + soci[i].indirizzo.provincia;
                dettagliSocio.children()[8].innerHTML = "<b>Città: </b>" + soci[i].indirizzo.citta;
                dettagliSocio.children()[9].innerHTML = "<b>CAP: </b>" + soci[i].indirizzo.cap;
                dettagliSocio.children()[10].innerHTML = "<b>Via: </b>" + soci[i].indirizzo.via;
                dettagliSocio.children()[11].innerHTML = "<b>Civico: </b>" + soci[i].indirizzo.civico;
                dettagliSocio.children()[12].innerHTML = "<b>Tel. (main): </b>" + soci[i].telefoni.telefono1;
                dettagliSocio.children()[13].innerHTML = "<b>Tel. (alt): </b>" + soci[i].telefoni.telefono2;
                dettagliSocio.children()[14].innerHTML = "<b>Professione: </b>" + soci[i].professione;
                dettagliSocio.children()[15].innerHTML = "<b>Interesse 1: </b>" + soci[i].interessi.interesse1;
                dettagliSocio.children()[16].innerHTML = "<b>Interesse 2: </b>" + soci[i].interessi.interesse2;
                dettagliSocio.children()[17].innerHTML = "<b>Note: </b>" + soci[i].note;
                dettagliSocio.children()[18].innerHTML = "<b>Data iscrizione:  </b>" + dateFormat(soci[i].prima_iscrizione.toLocaleString("it-IT", { "year": "numeric", "month": "2-digit", "day": "2-digit" }));
                dettagliSocio.children()[19].innerHTML = "<b>Data ultimo rinnovo: </b>" + dateFormat(soci[i].ultimo_rinnovo_iscrizione.toLocaleString("it-IT", { "year": "numeric", "month": "2-digit", "day": "2-digit" }));
            }
        }

    displayDettagli.show();

    });
}

dateFormat = function(date) {
    let data = date.split("-");
    let year = data[0];
    let month = data[1];
    let day = data[2].substring(0,2);
    return "" + day + "-" + month + "-" + year;
}
