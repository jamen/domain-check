#!/usr/bin/env node
const lib = require('./lib');
if (process.stdout.isTTY) {
  // Being used as CLI.
  
} else {
  // Being used as a module.
  module.exports = exports = lib.check;
}
