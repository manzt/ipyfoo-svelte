// @ts-check
import { mount, unmount } from "svelte";
import { createSubscriber } from "svelte/reactivity";

/**
 * @template {Record<string, any>} T
 * @template {ReadonlyArray<keyof T & string>} Attrs
 * @param {import("@anywidget/types").AnyModel<T>} model
 * @param {Attrs} attributes
 * @returns {{ [K in Attrs[number]]: T[K] }}
 */
function createState(model, attributes) {
	let state = {};
	for (let name of attributes) {
		let subscribe = createSubscriber((update) => {
			model.on(`change:${name}`, update);
			return () => model.off(`change:${name}`, update);
		});
		Object.defineProperty(state, name, {
			get() {
				subscribe();
				return model.get(name);
			},
			set(value) {
				model.set(name, value);
				model.save_changes();
			},
		});
	}
	return /** @type {any} */ (state);
}

/**
 * @template {Record<string, any>} T
 * @template {ReadonlyArray<keyof T & string>} Attrs
 * @param {import("svelte").Component<{ state: T }>} Widget
 * @param {Attrs} attributes
 * @returns {import("@anywidget/types").AnyWidget<T>}
 */
export function defineWidget(Widget, attributes) {
	return () => {
		/* @type {{ [K in Attrs[number]]: T[K] } | undefined} */
		let state = undefined;
		return {
			initialize({ model }) {
				state = createState(model, attributes);
			},
			/** @type {import("@anywidget/types").Render<T>} */
			render({ model, el }) {
				let app = mount(Widget, { target: el, props: { model, state } });
				return () => unmount(app);
			},
		};
	};
}
