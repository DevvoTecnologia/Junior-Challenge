import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
	const env = loadEnv(process.cwd(), "");

	return {
		plugins: [react()],
		define: {
			"process.env": env,
		},
		resolve: {
			alias: [
				{ find: "@", replacement: "/src" },
				{ find: "@assets", replacement: "/src/assets/" },
				{ find: "@pages", replacement: "/src/pages/" },
				{ find: "@components", replacement: "/src/components/" },
			],
		},
	};
});
