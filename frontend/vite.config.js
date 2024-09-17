import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_URL ?? 'http://localhost:8000'}`;
  const PORT = `${env.VITE_PORT ?? '3000'}`;

  return {
    plugins: [
      /* 
      Uncomment the following line to enable solid-devtools.
      For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
      */
      // devtools(),
      solidPlugin(),
    ],
    server: {
      port: PORT,
      proxy: {
        '/api': API_URL,
      },
    },
    build: {
      target: 'esnext',
    },
  }


});
