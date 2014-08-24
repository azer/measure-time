var Table = require("cli-table");

module.exports = {
  json: json,
  table: table
};

function json (results) {
  console.log(JSON.stringify(results));
}

function table (results) {
  var table = new Table({
    head: ['Test', 'Average', 'Min', 'Max', 'Total (ms)']
  });

  var title, result;
  for (title in results) {
    result = results[title];

    table.push([
      result.title,
      Math.floor(result.total / result.count) / 1000000,
      result.min / 1000000,
      result.max / 1000000,
      result.total / 1000000
    ]);
  }

  console.log(table.toString());
}
