#!/usr/bin/env node
'use strict';

const lib = require('./lib'),
      check = lib.check;

if (process.stdout.isTTY) {
  // Being used as CLI.

  let cli = lib.args(process.argv),
      options = cli.options;

  const response = function(input){
    check(input, function(status){
      if (options.indexOf('sort') !== -1) {
        let available = [], taken = [];
        for (let host in status) {
          if (status[host]) available.push(host);
          else taken.push(host);
        }
        console.log('available:');
        console.log(available.join('\r\n'), '\r\n');
        console.log('taken:');
        console.log(taken.join('\r\n'));
        return;
      }

      if (options.indexOf('available') !== -1) {
        for (let host in status) {
          if (status[host]) console.log(host);
        }
        return;
      }

      if (options.indexOf('taken') !== -1) {
        for (let host in status) {
          if (!status[host]) console.log(host);
        }
        return;
      }

      for (let host in status) {
        console.log(host + ': ' + (status[host] ? 'available' : 'taken'));
      }
    });
  };

  if (options.indexOf('file') !== -1) {
    const fs = require('fs'),
          path = require('path');

    let files = cli.domains,
        matcher = /,?(?:\r\n|\r|\n|\s)/,
        domains = [];

    files.forEach(function(file){
      file = path.resolve(file);
      try {
        domains = domains.concat(fs.readFileSync(file).toString().split(matcher));
      } catch (e) {}
    });
    if (domains[domains.length-1] === '') domains = domains.slice(0, -1);

    response(domains);
  } else {
    response(cli.domains);
  }
} else {
  // Being used as a module.
  module.exports = exports = check;
}
