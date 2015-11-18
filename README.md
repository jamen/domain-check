# domain-check
Check the availability of a domain or multiple through the command line tool or as a node module...

```
$ npm install -g domain-check
```

**Note:** If the domain is registered, but has no DNS server, domain-check will show it as available.  domain-check uses DNS resolving to check whether a domain points to anywhere.  Most commonly people have their domain automatically hooked up to their registrar's DNS servers.  But in the rare case that it's registered but point to no where, it will show as available when it's actually taken.

# Usage
To use `domain-check`, you can either use the CLI tool, or use it in-script as a module.  The CLI tool is good if you need to check a domain's status.  The in-script module is good if you need to use it programmatically.

### CLI

| Usage |
|-------|
| `c [flags] <domain, domain, ...>` |

The CLI has a few flags:

 - `-s`: Sort both `taken` and `available` into sections.
 - `-a`: Only output available domains.
 - `-t`: Only output taken domains.
 - `-n`: No color.
 - `-i`: Read from stdin stream,

Any argument that is not marked with a `-` is considered a domain and will be checked.

Also note that you can put multiple flags together in one group... e.g. `c -isn`

You can also pipe into domain-check if you have domains listed elsewhere, but __you have to specify `-i`__.  Take this example, say we have a file full of domains that we want to check, we can use `cat` to read it, and then pipe it into domain-check:

```
$ cat domain_list.txt | c -is
```

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
