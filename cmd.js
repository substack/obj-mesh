var objmesh = require('./');
process.stdin.pipe(objmesh(function (obj) {
    console.log(obj);
}));
