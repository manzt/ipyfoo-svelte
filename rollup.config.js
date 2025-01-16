import css from "rollup-plugin-css-only"
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";

export default {
	input: "js/widget.js",
	output: { dir: "src/ipyfoo/static" },
	plugins: [
		css({ output: "widget.css" }),
		svelte({
			extensions: [".svelte", ".svelte.js", "svelte.ts"],
			compilerOptions: { runes: true }
		}),
		resolve({ browser: true }),
	]
};
