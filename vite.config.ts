import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  envDir: 'env',
  base: '/',
});
