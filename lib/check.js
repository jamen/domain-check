'use strict';

const dns = require('dns'),
      url = require('url');

module.exports = function(domains, callback){
  let open = 0,
      results = {};

  domains.forEach(function(domain, index){
    open++;
    dns.lookup(domain, function(err, data){
      results[domain] = err ? true : false;
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
