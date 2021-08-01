import { convert } from "https://deno.land/x/nodedeno@v0.2.8/mod.js";

// Convert the code
await convert({
  src: "purgecss/packages/purgecss",
  input: ["src"],
  output: "deno",
  transpile: false,
  modules: {
    "": "mod.js",
    "deps.js": "lib/deps.js"
  },
  copy: {
    "deps.js": "lib/deps.js",
    "purgecss/packages/purgecss/README.md": "README.md",
    "purgecss/CHANGELOG.md": "CHANGELOG.md",
    "purgecss/LICENSE": "LICENSE",
  },
  beforeConvert(_src, { replaceAll, rename }) {

    // Rename lib/purgecss.esm.js => mod.js
    rename(
      "src/index.ts",
      "mod.ts",
      // (code) => code.replaceAll(`'./purgecss.esm.d.ts'`, `"./lib/purgecss.esm.d.ts"`),
    );
  },
  afterConvert(_src, { replaceAll }) {
    replaceAll((code) => {
        return code
    }
    );
  },
});