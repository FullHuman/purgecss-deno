# Clean old files
rm -rf deno
rm -rf purgecss

# Clone postcss-selector-parser to use as dependency
# git clone --depth 1 --branch master https://github.com/postcss/postcss-selector-parser.git
# cd postcss-selector-parser
# npm i && cd ../

# Clone the repo
git clone --depth 1 --branch master https://github.com/fullhuman/purgecss.git
cd purgecss
npm i && npm run bootstrap && npm run build && cd ../

# Run the script
deno run --unstable --allow-read=. --allow-write=. to_deno.js

# Autoformat the code
deno fmt deno

# Run the tests
# deno test --unstable --allow-read=. --allow-env=DENO_ENV deno/test