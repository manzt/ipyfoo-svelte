import css from "npm:rollup-plugin-css-only@4.5.2";
import svelte from "npm:rollup-plugin-svelte@7.2.2";
import resolve from "npm:@rollup/plugin-node-resolve@16.0.0";

export default {
	input: "js/widget.js",
	output: { dir: "src/ipyfoo/static" },
	plugins: [
		css({ output: "widget.css" }),
		svelte({
			extensions: [".svelte", ".svelte.js", "svelte.ts"],
			compilerOptions: { runes: true },
		}),
		resolve({ browser: true }),
	],
};
