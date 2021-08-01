import { expandGlobSync } from "https://deno.land/std@0.103.0/fs/mod.ts";
import { access, readFile, constants } from "https://deno.land/std@0.103.0/node/fs.ts";
import { resolve } from "https://deno.land/std@0.103.0/node/path.ts";
import { promisify as prom } from "https://deno.land/std@0.103.0/node/util.ts";
import selectorParserImport from "https://deno.land/x/postcss_selector_parser@v6.0.2/mod.js";
import postcssImport from "https://deno.land/x/postcss@8.3.6/mod.js";

export const fs = { access, readFile, constants };
export const path = { resolve };
export const promisify = prom;
export const selectorParser = selectorParserImport;
export const postcss = postcssImport;

type GlobOptions = {
  cwd?: string;
  root?: string;
  dot?: boolean;
  nomount?: boolean;
  mark?: boolean;
  nosort?: boolean;
  stat?: boolean;
  silent?: boolean;
  strict?: boolean;
  cache?: { [path: string]: boolean | "DIR" | "FILE" | ReadonlyArray<string> };
  statCache?: {
    [path: string]: false | { isDirectory(): boolean } | undefined;
  };
  symlinks?: { [path: string]: boolean | undefined };
  realpathCache?: { [path: string]: string };
  sync?: boolean;
  nounique?: boolean;
  nonull?: boolean;
  debug?: boolean;
  nobrace?: boolean;
  noglobstar?: boolean;
  noext?: boolean;
  nocase?: boolean;
  matchBase?: any;
  nodir?: boolean;
  ignore?: string | Array<string>;
  follow?: boolean;
  realpath?: boolean;
  nonegate?: boolean;
  nocomment?: boolean;
  absolute?: boolean;
};


export const glob = {
  sync: (pattern: string, options?: GlobOptions) => {
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
