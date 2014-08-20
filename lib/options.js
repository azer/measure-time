var command = require('new-command')({
  g: 'grep',
  t: 'times'
});

module.exports = {
  times: command.times ? Number(command.times) : 9999
};
