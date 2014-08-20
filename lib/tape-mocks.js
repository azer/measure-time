module.exports = create;

function create (callback) {
  return {
    ok: voidfn,
    notOk: voidfn,
    equal: voidfn,
    notEqual: voidfn,
    end: callback
  };
}

function voidfn () {}
