import { access, readFile } from "https://deno.land/std@0.103.0/node/fs.ts";
import { resolve } from "https://deno.land/std@0.103.0/node/path.ts";
import { promisify as prom } from "https://deno.land/std@0.103.0/node/util.ts";
import selectorParser from "https://deno.land/x/postcss_selector_parser@v6.0.0/mod.js"
import postcss from "https://deno.land/x/postcss/mod.js"

export const fs = { access, readFile };
export const path = { resolve };
export const promisify = prom;
export const selectorParser = selectorParser;
export const postcss = postcss;
export const glob = {
  sync: (globPattern, globOptions) => {
    for (const file of expandGlobSync(globPattern)) {
      console.log(file);
    }
  }
}