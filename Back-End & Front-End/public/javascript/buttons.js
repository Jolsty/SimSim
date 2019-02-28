var indirizzo = "http://192.168.1.107:3000";

// rimuoviTesseraButton

const rimuoviTesseraButton = $(".rimuoviTesseraButton");
rimuoviTesseraButton.on('click', function(e) {
    e.preventDefault();
    if (!confirm("Confermi di voler rimuovere la tessera?")) return false;
    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
        if (xHttp.readyState == 4) {
            alert(xHttp.responseText);
            if (xHttp.status === 200) window.location.href = indirizzo + "/api/tessere/view";
        }
    };
    let id = this.value;
    xHttp.open("DELETE", "/api/tessere/delete/" + id, true);
    xHttp.send();
});

// cambiaStatoTesseraButton

const cambiaStatoTesseraButton = $(".cambiaStatoTesseraButton");
cambiaStatoTesseraButton.on('click', function(e) {
    e.preventDefault();

    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
        if (xHttp.readyState == 4) {
            alert(xHttp.responseText);
            if (xHttp.status === 200) window.location.href = indirizzo + "/api/tessere/view";
        }
    }

    let stato;
    if (this.innerHTML === 'Disattiva') {
        if (!confirm("Confermi di voler disattivare la tessera?")) return false;
        stato = "disattivata";
    } else if (this.innerHTML === 'Attiva') {
        if (!confirm("Confermi di voler attivare la tessera?")) return false;
        stato ="attivata";
    }

    let data = JSON.stringify(
        {
            "stato": stato
        }
    );

    let id = this.value;
    xHttp.open("PUT", "/api/tessere/update/" + id, true);
    xHttp.send(data);
});

// rimuoviSocioButton

const rimuoviSocioButton = $(".rimuoviSocioButton");
rimuoviSocioButton.on('click', function(e) {
    e.preventDefault();
    if (!confirm("Confermi di voler rimuovere il socio?")) return false;
    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
        if (xHttp.readyState == 4) {
            alert(xHttp.responseText);
            if (xHttp.status === 200) window.location.href = indirizzo + "/api/soci/view";
        }
    };
    let id = this.value;
    xHttp.open("DELETE", "/api/soci/delete/" + id, true);
    xHttp.send();
});
