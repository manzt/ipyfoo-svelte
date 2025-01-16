import { defineWidget } from "./lib.svelte.js";
import Counter from "./Counter.svelte";

export default defineWidget(Counter, ["value"])
