import { defineConfig } from 'vite';
//import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src: '_locales',
		// 			dest: '',
		// 		},
		// 		{
		// 			src: 'manifest.json',
		// 			dest: '',
		// 		},
		// 		{
		// 			src: 'icons',
		// 			dest: '',
		// 		},
		// 	],
		// }),
	],
	server: {
		port: 3000,
	},
});
