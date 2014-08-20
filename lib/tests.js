var debug = require("local-debug")('tests');
var index = [];

module.exports = {
  add: add,
  read: read
};

function read () {
  return index;
}

function add (title, fn) {
  debug('Adding "%s"', title);
  index.push({
    title: title,
    fn: fn
  });
}
