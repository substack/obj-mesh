# obj-mesh

convert an
[obj file](http://people.sc.fsu.edu/~jburkardt/data/obj/obj.html)
into the format that
[mesh-viewer](https://npmjs.org/package/mesh-viewer)
understands

The format that mesh-viewer understands is the same object format that the
[bunny](https://npmjs.org/package/bunny) and
[stanford-dragon](https://npmjs.org/package/stanford-dragon) packages use.

# example

``` js
var xhr = require('xhr');
var objmesh = require('obj-mesh');
var through = require('through2');
var viewer = require('mesh-viewer');

var shell = viewer();
var meshes = [];

shell.on('gl-init', function () {
    xhr('/teapot.obj', function (err, res, body) {
        var obj = objmesh();
        obj.pipe(through.obj(function (mesh, enc, next) {
            meshes.push(shell.createMesh(mesh));
            next();
        }));
        obj.end(body);
    });
});

shell.on('gl-render', function () {
    for (var i = 0; i < meshes.length; i++) {
        meshes[i].draw();
    }
});
```
