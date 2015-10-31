#!/usr/bin/env node
'use strict';

const lib = require('./lib'),
      check = lib.check,
      log = lib.log;

if (process.stdout.isTTY) {
  // Being used as CLI.

  lib.args(process.argv, function(domains, options){
    check(domains, function(status){
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
        log.status(host + ': %s', status[host]);
      }
    });
  });
} else {
  // Being used as a module.
  module.exports = exports = check;
}
