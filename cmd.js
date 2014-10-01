//var objmesh = require('./');
var parseobj = require('parse-obj');
var triangulate = require('delaunay-triangulate');
var has = require('has');

parseobj(process.stdin, function (err, res) {
    var fp = res.facePositions;
    var vp = res.vertexPositions;
    
    var cells = [];
    var points = [], ptMap = {};
    
    for (var i = 0; i < fp.length; i++) {
        var fpoints = fp[i].map(function (p) {
            return vp[p];
        });
        var tri = triangulate(fpoints);
        for (var j = 0; j < tri.length; j++) {
            var itri = [];
            for (var k = 0; k < tri[j].length; k++) {
                var pt = tri[j].join(',');
                var ix = -1;
                if (has(ptMap, pt)) {
                    itri.push(ptMap[pt]);
                }
                else {
                    points.push(tri[j]);
                    itri.push(points.length);
                    ptMap[pt] = points.length;
                }
            }
            for (var k = 3; k <= itri.length; k++) {
                cells.push(itri.slice(k-3,k));
            }
        }
    }
    
    console.log(JSON.stringify([ {
        positions: points,
        cells: cells
    } ]));
});
