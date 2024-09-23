import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '')
  const API_URL = `${env.API_URL}`;

  return {
    envDir: "../",
    plugins: [
      /* 
      Uncomment the following line to enable solid-devtools.
      For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
      */
      // devtools(),
      solidPlugin(),
    ],
    server: {
      // port: PORT,
      proxy: {
        '/api': API_URL,
      },
    },
    build: {
      target: 'esnext',
    },
  }


});
