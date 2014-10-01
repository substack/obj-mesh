var objmesh = require('./');
var stringify = require('JSONStream').stringify;
process.stdin.pipe(objmesh())
    .pipe(stringify())
    .pipe(process.stdout)
;
