var split = require('split');
var through = require('through2');
var combine = require('stream-combiner2');

module.exports = function () {
    var current = { name: '_root', positions: [], cells: [] };
    return combine([ split(), through.obj(write, end) ]);
    
    function write (buf, enc, next) {
        var line = buf.toString('utf8');
        if (/^o\s+/.test(line)) {
            flush.call(this);
            var name = line.replace(/^o\s+/, '');
            current = { name: name, positions: [], cells: [] };
        }
        else if (/^v\s+/.test(line)) {
            var pts = line.split(/\s+/).slice(1).map(Number);
            current.positions.push(pts);
        }
        else if (/^f\s+/.test(line)) {
            var cells = line.split(/\s+/).slice(1).map(Number);
            current.cells.push(cells);
        }
        next();
    }
    
    function flush () {
        if (current.positions.length || current.cells.length) {
            this.push(current);
        }
    }
    
    function end () {
        flush.call(this);
        this.push(null);
    }
};
