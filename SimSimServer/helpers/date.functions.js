// Restituisce il numero di giorni in una specifica data

exports.getDaysInMonth = function(year, month) {
    return new Date(year, month+1, 0).getDate();
}
