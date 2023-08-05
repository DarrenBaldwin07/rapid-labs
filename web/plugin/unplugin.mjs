import { createUnplugin } from 'unplugin';

// TODO: we can add in bundler options here as we see fit
// At some point it might make sense
export const rapidUnplugin = createUnplugin((options) => {
    return {
      name: 'rapid-ssr-bundler',
      // Here we want to only include .ts and .tsx (everything else we dont really care about)
      transformInclude(id) {
        return id.endsWith(('.tsx', '.ts'))
      },
      // This transform function does the same thing as rollup transform
      // What we want to do here is replace any instance of client-side rapid code and tree-shake it out of the server bundle
      // TODO: test to see if this would work with a entire component file?
      transform(code, id) {
        if (code.includes('use-client') && id.includes('client_only')) {
          return '';
        }
        return code
      },
    }
  })

export const vitePlugin = rapidUnplugin.vite
export const rollupPlugin = rapidUnplugin.rollup
export const webpackPlugin = rapidUnplugin.webpack
export const rspackPlugin = rapidUnplugin.rspack
export const esbuildPlugin = rapidUnplugin.esbuild
