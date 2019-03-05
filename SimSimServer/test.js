var DateFunctions = require('./helpers/date.functions.js');

var date1 = new Date("2018-12-31T23:59:59Z");
var hour = 1000*60*60;

console.log(date1.toString());
date1.setHours(date1.getHours() - 1);
console.log(date1.toString());
