import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";

import manifest from "./manifest.json";

export default defineConfig({
	plugins: [react(), svgr(), crx({ manifest })],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
