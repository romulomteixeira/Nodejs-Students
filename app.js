var app = require('./config/express')();
var http = require('http').Server(app);


var porta = process.env.PORT || 80;
var server = http.listen(porta, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Running in http:/localhost:80');

});
