'use strict';

let log = module.exports = {
  color: true,
  esc: new Buffer([27]).toString(),
};

log.reset = log.esc + '[0m';
log.available = (log.esc + '[32mavailable' + log.reset);
log.taken = (log.esc + '[31mtaken' + log.reset);

log.token = '%s';

log.status = function(text, available){
  if (log.color) {
    console.log(text.replace(log.token, available ? log.available : log.taken));
  } else {
    console.log(text.replace(log.token, available ? 'available' : 'taken'));
  }
};
