var xhr = require('xhr');
var objmesh = require('../');
var through = require('through2');
var viewer = require('mesh-viewer');

var shell = viewer();
var meshes = [];

shell.on('gl-render', function () {
    for (var i = 0; i < meshes.length; i++) {
        meshes[i].draw();
    }
});

xhr('/teapot.obj', function (err, res, body) {
    var obj = objmesh();
    obj.pipe(through.obj(function (mesh, enc, next) {
        meshes.push(shell.createMesh(mesh));
        next();
    }));
    obj.end(body);
});
