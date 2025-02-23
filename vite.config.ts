import basicSsl from '@vitejs/plugin-basic-ssl';
import visualizer from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  base: '/oficina',
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    basicSsl(),
    visualizer({
      open: true,
    }),
  ],
  server: {
    // I don't know which config is it, but I can't firebase work if it isn't this host or port
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
