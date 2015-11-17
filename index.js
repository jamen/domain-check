#!/usr/bin/env node
'use strict';

const lib = require('./lib'),
      check = lib.check;

let log = lib.log;

if (process.stdout.isTTY) {
  // Being used as CLI.

  lib.args(process.argv, function(domains, options){
    if (!domains.length) process.exit();

    check(domains, function(status){
      if (options.indexOf('no color') !== -1) log.color = false;

      if (options.indexOf('sort') !== -1) {
        let available = [], taken = [];
        for (let host in status) {
          if (status[host]) available.push(host);
          else taken.push(host);
        }
        log.status('%s', true);
        console.log(available.join('\r\n'), '\r\n');
        log.status('%s', false);
        console.log(taken.join('\r\n'));
        process.exit();
        return;
      }

      if (options.indexOf('available') !== -1) {
        for (let host in status) {
          if (status[host]) console.log(host);
        }
        process.exit();
        return;
      }

      if (options.indexOf('taken') !== -1) {
        for (let host in status) {
          if (!status[host]) console.log(host);
        }
        process.exit();
        return;
      }

      for (let host in status) {
        log.status(host + ': %s', status[host]);
      }
      process.exit();
    });
  });
} else {
  // Being used as a module.
  module.exports = exports = check;
  console.log('KeK!')
}
