var split = require('split');
var through = require('through2');
var writeonly = require('write-only-stream');

module.exports = function (cb) {
    var current = { name: '_root', positions: [], cells: [] };
    var sp = split();
    sp.pipe(through(write, flush));
    if (cb) sp.on('object', cb);
    return writeonly(sp);
    
    function write (buf, enc, next) {
        var line = buf.toString('utf8');
        if (/^o\s+/.test(line)) {
            flush();
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
            sp.emit('object', current);
        }
    }
};
