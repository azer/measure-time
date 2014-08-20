var methods = ['ok', 'notOk', 'equal', 'notEqual',
               'deepEqual', 'notDeepEqual', 'throws',
               'doesNotThrow', 'error'];

module.exports = create;

function create (callback) {
  var mock = callback;
  mock.end = callback;

  var i = methods.length;
  while (i--) {
    mock[methods[i]] = voidfn;
  }

  return mock;
}

function voidfn () {}
