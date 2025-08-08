import { describe, it, expect } from 'vitest';
import { loadPlugins, getPlugin, unloadPlugin } from './plugins.js';

describe('plugin system', () => {
  it('loads and registers plugins', async () => {
    const plugins = await loadPlugins([
      { name: 'weather', module: '../widgets/WeatherWidget.jsx' },
    ]);
    expect(plugins).toHaveLength(1);
    expect(typeof getPlugin('weather')).toBe('function');
    unloadPlugin('weather');
  });
});
