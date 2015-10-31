'use strict';

let matcher = /^-([A-z0-9]*)$/,
    translate = {
      's': 'sort',
      't': 'taken',
      'a': 'available'
    };


module.exports = function(args, callback){
  args = args.slice(2);
  let data = [];

  process.stdin.on('data', function(buf){
    data.push(buf);
  });

  process.stdin.on('end', function(){
    let options = args.filter(function(arg){
      if (matcher.test(arg)) return matcher.test(arg);
    }).join('').split('').slice(1)
    .map(function(key){
      return translate[key] || 'unknown';
    })
    .reduce(function(a,b){
      if (a.indexOf(b) < 0 && b !== 'unknown') a.push(b);
      return a;
    }, []);

    let domains = args.filter(function(arg){
      if (!matcher.test(arg)) return true;
    });

    data = Buffer.concat(data).toString();
    let stdin = data.split(/,?(?:\r\n|\r|\n|\s)/);
    if (stdin[stdin.length-1] === '') stdin = stdin.slice(0, -1);

    callback(domains.concat(stdin), options);
  });
};
