import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import basicSsl from '@vitejs/plugin-basic-ssl';

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
  ],
  server: {
    // https: true,
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
