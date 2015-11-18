'use strict';

module.exports = function(names){
  if (!Array.isArray(names)) return [];
  let created = [];
  names.forEach(function(name){
    module.exports.tlds.forEach(function(tld){
      created.push(name + tld);
    });
  });
  return created;
};

module.exports.tlds = [
  '.com', '.org', '.net',
  '.co', '.info', '.us',
  '.io', '.xyz'
];
