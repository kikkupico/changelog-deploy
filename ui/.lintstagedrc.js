/*

Three step pipeline:
  1. Check types - using a custom package that uses tsc for specific files - disabled temporarily:Fixme
  2. Lint - using next lint
  3. Format - using prettier
  
*/

const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    // "tsc-files --noEmit",
    buildEslintCommand,
    "prettier --write",
  ],
};
