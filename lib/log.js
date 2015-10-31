'use strict';

let log = module.exports = {};

log.color = true;

log.names = {
  'a': Buffer.concat([
         new Buffer([27]),
         new Buffer('[32mavailable'),
         new Buffer([27]),
         new Buffer('[0m')
       ]).toString(),

 't': Buffer.concat([
        new Buffer([27]),
        new Buffer('[31mtaken'),
        new Buffer([27]),
        new Buffer('[0m')
      ]).toString()

};

log.token = '%s';

log.status = function(text, available){
  if (log.color) {
    console.log(text.replace(log.token, available ? log.names.a : log.names.t));
  } else {
    console.log(text.replace(log.token, available ? 'available' : 'taken'));
  }
};
