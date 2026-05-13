import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
    framework: "@storybook/svelte-vite",
    stories: [
        "../../../packages/svelte/src/**/*.stories.@(ts|svelte|mdx)",
        "../src/**/*.stories.@(ts|svelte|mdx)",
    ],
    addons: ["@storybook/addon-a11y", "@storybook/addon-svelte-csf"],
};

export default config;
