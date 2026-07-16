// scripts/validate-commit-msg.js
const fs = require('fs');
const msg = fs.readFileSync(process.argv[2], 'utf8').trim();

// First line: PROJ-1234 Summary  or  ADHOC Summary
const firstLine = msg.split('\n')[0];
const pattern = /^([A-Z]+-\d+|ADHOC)(:)? .+/;

if (!pattern.test(firstLine)) {
  console.error(`
  Invalid commit message: "${firstLine}"

  Format:  PROJ-1234 Summary
           ADHOC Summary (if no ticket)

  Examples:
    CREAT-5432 Add Banner component to @rbx/ui
    ADHOC Update README with package standards
  `);
  process.exit(1);
}