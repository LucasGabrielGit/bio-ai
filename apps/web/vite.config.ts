import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), tanstackRouter({}), TanStackRouterVite(), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		allowedHosts: ['ddd4866e4cb2.ngrok-free.app'],
	}
});
