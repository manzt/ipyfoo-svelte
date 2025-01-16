// @ts-check
import { mount, unmount } from "svelte";
import { createSubscriber } from "svelte/reactivity";

/**
 * @template {Record<string, any>} T
 * @param {import("@anywidget/types").AnyModel<T>} model
 * @returns T
 */
function createState(model) {
  /** @type {Record<string, () => void>} */
  let subscribes = {};
  return new Proxy(/** @type{any} */ ({}), {
    get(_, /** @type {string} */ name) {
      if (!(name in subscribes)) {
        subscribes[name] = createSubscriber((update) => {
          model.on(`change:${name}`, update);
          return () => model.off(`change:${name}`, update);
        });
      }
      subscribes[name]();
      return model.get(name);
    },
    set(_, /** @type {string} */ name, /** @type {any} */ newValue) {
      model.set(name, newValue);
      model.save_changes();
      return true;
    },
  });
}

/**
 * @template {Record<string, any>} T
 * @param {import("svelte").Component<{ state: T }>} Widget
 * @returns {import("@anywidget/types").AnyWidget<T>}
 */
export function defineWidget(Widget) {
  return () => {
    /* @type {T | undefined} */
    let state = undefined;
    return {
      initialize({ model }) {
        state = createState(model);
      },
      /** @type {import("@anywidget/types").Render<T>} */
      render({ model, el }) {
        let app = mount(Widget, { target: el, props: { model, state } });
        return () => unmount(app);
      },
    };
  };
}
