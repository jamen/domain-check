'use strict';

const dns = require('dns');

module.exports = function(domains, callback){
  let open = 0,
      results = {};

  if (!Array.isArray(domains)) return;
  if (typeof callback !== 'function') return;

  domains.forEach(function(domain){
    open++;
    dns.resolve(domain, function(err){
      results[domain] = (err && err.code === 'ENOTFOUND') ? true : false;
      open--;
      if (!open) callback(results);
    });
  });
};
