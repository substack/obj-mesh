var http = require('http');
var ecstatic = require('ecstatic');

var st = ecstatic(__dirname + '/static');
var server = http.createServer(st);
server.listen(8000);
