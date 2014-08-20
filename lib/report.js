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
    head: ['Test', 'Average (ms)', 'Min', 'Max', 'Total']
  });

  var title, result;
  for (title in results) {
    result = results[title];

    table.push([
      title,
      result.total / result.count,
      result.min,
      result.max,
      result.total
    ]);
  }

  console.log(table.toString());
}
