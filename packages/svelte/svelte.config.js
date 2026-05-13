import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
    preprocess: vitePreprocess(),
    package: {
        source: "src",
        dir: "dist",
    },
};
