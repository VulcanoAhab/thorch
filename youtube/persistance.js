var exports = module.exports;


var dbES= require('../torch/esPersistance.js');

var YouES=dbES;
YouES.doctype='youtube';

//api
exports.DBS={"elasticsearch":YouES, "cassandra":undefined};
