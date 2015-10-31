#!/usr/bin/env node
'use strict';

const lib = require('./lib'),
      check = lib.check;

if (process.stdout.isTTY) {
  // Being used as CLI.

  let cli = lib.args(process.argv),
      domains = cli.domains,
      options = cli.options;

  if (options.indexOf('file') !== -1) {
    const fs = require('fs'),
          path = require('path');

    let files = domains,
        matcher = /,?(?:\r\n|\r|\n|\s)/,
        domains = [];

    files.forEach(function(file){
      file = path.resolve(file);
      try {
        domains = domains.concat(fs.readFileSync(file).toString().split(matcher));
      } catch (e) {}
    });
    if (domains[domains.length-1] === '') domains = domains.slice(0, -1);

  } else {

  }
} else {
  // Being used as a module.
  module.exports = exports = check;
}
