import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			hooks: path.resolve(__dirname, 'src/hooks'),
			store: path.resolve(__dirname, 'src/store'),
		},
	},
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(
			process.env.npm_package_version
		),
	},
});
