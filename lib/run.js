var debug = require("local-debug")('run');
var loop = require("serial-loop");
var tests = require("./tests").read();
var options = require('./options');
var tapeMocks = require("./tape-mocks");

module.exports = later;

function later (callback) {
  setImmediate(function () {
    all(callback);
  });
}

function all (callback) {
  var results = {};
  loop(tests.length, each(results), function () {
    callback(results);
  });
}

function each (results) {
  return function (done, index) {
    if (options.grep && tests[index].title.indexOf(options.grep) == -1) {
      return done();
    }

    debug('Running "%s" for %d times', tests[index].title, options.times);
    loop(options.times, call(tests[index], results), done);
  };
}

function call (test, results) {
  return function (done) {
    var start = process.hrtime();

    test.fn(tapeMocks(function () {
      var diff = process.hrtime(start);

      result(results, test, diff[0] * 1e9 + diff[1]);

      setImmediate(function () {
        done();
      });
    }));
  };
}

function result (results, test, elapsed) {
  if (!results[test.title]) {
    results[test.title] = {
      title: test.title,
      count: 0,
      total: 0,
      min: -1,
      max: 0
    };
  }

  results[test.title].count++;

  if (results[test.title].max < elapsed) {
    results[test.title].max = elapsed;
  }

  if (results[test.title].min == -1 || results[test.title].min > elapsed) {
    results[test.title].min = elapsed;
  }

  results[test.title].total += elapsed;
}
