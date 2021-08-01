import { expandGlobSync } from "https://deno.land/std@0.103.0/fs/mod.ts";
import { access, readFile } from "https://deno.land/std@0.103.0/node/fs.ts";
import { resolve } from "https://deno.land/std@0.103.0/node/path.ts";
import { promisify as prom } from "https://deno.land/std@0.103.0/node/util.ts";
import selectorParserImport from "https://deno.land/x/postcss_selector_parser@v6.0.0/mod.js";
import postcssImport from "https://deno.land/x/postcss@8.3.6/mod.js";

export const fs = { access, readFile };
export const path = { resolve };
export const promisify = prom;
export const selectorParser = selectorParserImport;
export const postcss = postcssImport;

export const glob = {
  sync: (pattern, options) => {
    const filePaths = [];

    for (
      const file of expandGlobSync(pattern, {
        root: options?.root,
        exclude: typeof options?.ignore === "string"
          ? [options.ignore]
          : options?.ignore,
        includeDirs: !options?.nodir,
        extended: !options?.noext,
        globstar: !options?.noglobstar,
        caseInsensitive: !options?.nocase,
      })
    ) {
      filePaths.push(file.path);
    }
    return filePaths;
  },
};
