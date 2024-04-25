import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5';

// Define chrome as the default browser for the dev server
const opsys = process.platform;
// windows
if (opsys === 'win32' || opsys === 'win64') process.env.BROWSER = 'chrome';
// macOS
if (opsys === 'darwin') process.env.BROWSER = '/Applications/Google Chrome.app';

export default defineConfig({
  root: resolve(__dirname, './src'),
  publicDir: resolve(__dirname, './public'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, './dist'),
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './assets'),
      '@bootstrap': resolve(__dirname, './node_modules/bootstrap/scss'),
      '@js': resolve(__dirname, './src/js'),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    // HTML minification
    ViteMinifyPlugin({
      removeComments: true,
    }),
    // Purge CSS: remove unused CSS class
    pluginPurgeCss({
      content: ['./src/**/*.html'],
      sourceMap: true,
      variables: true,
    }),
  ],
});
