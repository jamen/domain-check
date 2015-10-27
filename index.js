#!/usr/bin/env node
if (process.stdout.isTTY) {
  // Being used as CLI.
} else {
  // Being used as a module.
}
console.log("Haha");
