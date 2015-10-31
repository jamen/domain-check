'use strict';

const dns = require('dns');

module.exports = function(domains, callback){
  let open = 0,
      results = {};

  domains.forEach(function(domain){
    open++;
    dns.lookup(domain, function(err){
      results[domain] = (err && err.code === 'ENOTFOUND') ? true : false;
      open--;
    });
  });

  let listener = setInterval(function(){
    if (!open) {
      callback(results);
      clearInterval(listener);
    }
  });
};
