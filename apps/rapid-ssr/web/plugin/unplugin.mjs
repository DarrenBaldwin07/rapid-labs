import { createUnplugin } from 'unplugin';

// TODO: we can add in bundler options here as we see fit
// At some point it might make sense
export const rapidUnplugin = createUnplugin((options = {}) => {
    const {
      minify = true,
      sourceMap = true,
      extensions = ['.tsx', '.ts'],
      excludePatterns = [],
      treeShakeClientCode = true,
      debug = false
    } = options;

    return {
      name: 'rapid-ssr-bundler',
      transformInclude(id) {
        if (excludePatterns.some(pattern => id.includes(pattern))) {
          return false;
        }
        return extensions.some(ext => id.endsWith(ext));
      },
      transform(code, id) {
        if (treeShakeClientCode && code.includes('use-client') && id.includes('client_only')) {
          return '';
        }

        if (debug) {
          console.log(`[rapid-ssr-bundler] Processing: ${id}`);
        }

        return {
          code,
          map: sourceMap ? null : undefined
        };
      },
      buildStart() {
        if (debug) {
          console.log('[rapid-ssr-bundler] Build starting with options:', { minify, sourceMap, extensions });
        }
      }
    };
  });

export const vitePlugin = rapidUnplugin.vite
export const rollupPlugin = rapidUnplugin.rollup
export const webpackPlugin = rapidUnplugin.webpack
export const rspackPlugin = rapidUnplugin.rspack
export const esbuildPlugin = rapidUnplugin.esbuild
