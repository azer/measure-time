var time = require("./");

time('looping with "for"', function (t) {
  var arr = [];
  var i;

  for (i = 0; i < 100; i++) {
    arr.push(i);
  }

  t.end();
});

time('looping with "while"', function (t) {
  var arr = [];
  var i = 100;

  while (i--) {
    arr.push(i);
  }

  t.end();
});

time('looping with "map"', function (t) {
  var arr = new Array(100).map(function (_, i) {
    return i;
  });

  t.end();
});

time('looping with "for each"', function (t) {
  var arr = new Array(100);

  arr.forEach(function (_, i) {
    arr[i] = i;
  });

  t.end();
});

time('looping with functions', function (t) {
  var arr = [];

  (function next (i) {
    arr.push(i);

    if (i > 98) return t.end();

    next(i+1);
  }(0));
});
