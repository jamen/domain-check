# domain-check
Check the availability of a domain or multiple through the command line tool or as a node module...

# Usage
To use `domain-check`, you can either use the CLI tool, or use it in-script as a module.  The CLI tool is good if you need to check a domain's status.  The in-script module is good if you need to use it programmatically.

### CLI
The CLI has 4 flags:

 - `-f`: Read domain list from listed files.  Example: `c -f projects.txt companies.txt`
 - `-s`: Sort the output into two sections of `taken` and `available`.
 - `-a`: Only print available domains.
 - `-t`: Only print taken domains.

They can be used together, for instance if you want to sort the results from a file, you can use `-fs` for `file` and `sort`.

Any argument that is not marked with a `-` is considered a domain and will be checked.

| Usage |
|-------|
| `c -[f,s,a,t] <domain, domain, ...>` |

### Module
Simply `require` domain-check, and supply it with an array of domain names.  Then use the callback argument to see the results:

```javascript
const check = require('domain-check');

check(['example.com', 'google.com', 'foo.bar'], function(results){
  console.log(results);
});
// => { 'example.com':false, 'google.com':false, 'foo.bar': true }
```

In the results object, `true` represents that it's available, and `false` shows that it's taken.

You can use a for..in loop to get keys (domain names) if you need:

```javascript
check(['example.com', 'google.com', 'foo.bar'], function(results){
  let available;
  for (for domain in results) {
    available = results[domain];
    console.log(domain + ': ' + available);
  };
});
// => example.com: false
// => google.com: false
// => foo.bar: true
```
