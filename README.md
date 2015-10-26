# domain-check
Check the availability of a domain or multiple through the command line tool or as a node module...

# Usage
To use `domain-check`, you can either use the CLI tool, or use it in-script as a module.

#### CLI
`domain-check`'s command is simply `domain-check` however you can use `d` for short.  The CLI portion reads from both the arguments provided, and the `process.stdin`.  It iterates through all the inputs and parses them with the native `url` module for flexible input.  See the `d --help` print if you want more information.

```
$ d example.com, google.com, someavailabledomain.com
example.com: taken
google.com: taken
someavailabledomain.com: available
```

You can use the `-s` flag to sort the output.
```
$ d -s example.com, google.com, someavailabledomain.com
Available:
someavailabledomain.com

Taken:
example.com
google.com
```

To get only the available results, you can use the `-a` flag, alternatively to get only the taken results, you can use the `-t` flag.
```
$ d -a example.com, someavailabledomain.com, anotheravailable.com
someavailable.com
anotheravailable.com
```

You can pipe data into `d` (and combine the input with arguments) to check domains as well.
```
$ echo "example.com\ngoogle.com" | d
example.com: taken
google.com: taken
```

Pipe and arguments:
```
$ cat domain-list.txt | d -s example.com
```

#### Module
This module is a function, with an additional synchronous method...

```javascript
/* Asynchronous */
.check(input1, input2, ..., callback);
// or
.check([input1, input2, ...], callback);

/* Synchronous*/
.check.sync(input1, input2, ...);
// or
.check.sync([input1, input2, ...]);
```

Using it in a script:
```javascript
const d = require('domain-check');

// Asynchronous
d.check('example.com', 'google.com', 'someavailabledomain.com', function(err, domains){
  let status;
  for (let hostname of domains) {
    status = domains[hostname];
    console.log(hostname + ': ' + status ? 'available' : 'taken');
  }
});

// Synchronous
let domains = d.check.sync('google.com', 'example.com', ...),
    status;
for (let hostname of domains) {
  status = domains[hostname];
  console.log(hostname + ': ' + status ? 'available' : 'taken');
}
```
