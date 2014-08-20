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
    var start = Date.now();

    test.fn(tapeMocks(function () {
      result(results, test, Date.now() - start);

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
      min: 0,
      max: 0
    };
  }

  results[test.title].count++;

  if (results[test.title].max < elapsed) {
    results[test.title].max = elapsed;
  }

  if (results[test.title].min > elapsed) {
    results[test.title].min = elapsed;
  }

  results[test.title].total += elapsed;
}
