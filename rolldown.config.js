import { defineConfig } from "rolldown";
import svelte from "rollup-plugin-svelte";

export default defineConfig({
  input: "./web/index.js",
  output: {
    dir: "./src/ipyfoo/static/",
  },
  plugins: [
    svelte({ compilerOptions: { runes: true } }),
  ],
});
