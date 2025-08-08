const registry = new Map();

/**
 * Dynamically loads plugin modules and registers them by name.
 * @param {{name:string,module:string}[]} pluginConfigs
 * @returns {Promise<{name:string, Component:any}[]>}
 */
export async function loadPlugins(pluginConfigs = []) {
  const loaded = [];
  for (const { name, module } of pluginConfigs) {
    try {
      // Vite needs @vite-ignore for dynamic paths outside known graph.
      const mod = await import(/* @vite-ignore */ module);
      const Component = mod.default || mod;
      registry.set(name, Component);
      loaded.push({ name, Component });
    } catch (err) {
      console.error(`Failed to load plugin ${name}`, err);
    }
  }
  return loaded;
}

/**
 * Removes a plugin from the registry.
 * @param {string} name
 */
export function unloadPlugin(name) {
  registry.delete(name);
}

export function getPlugin(name) {
  return registry.get(name);
}
