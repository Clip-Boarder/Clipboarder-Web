import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { crx } from '@crxjs/vite-plugin';

import manifest from './manifest.json';
const viteManifestHackIssue846: {
	name: string;
	renderCrxManifest(_manifest: any, bundle: any): void;
} = {
	// Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
	name: 'manifestHackIssue846',
	renderCrxManifest(_manifest, bundle) {
		bundle['manifest.json'] = bundle['.vite/manifest.json'];
		bundle['manifest.json'].fileName = 'manifest.json';
		delete bundle['.vite/manifest.json'];
	},
};
export default defineConfig({
	plugins: [react(), svgr(), viteManifestHackIssue846, crx({ manifest })],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
