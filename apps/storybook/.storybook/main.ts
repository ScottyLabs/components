import type { StorybookConfig } from "@storybook/html-vite";

const reactUrl = process.env["SB_REACT_URL"] ?? "http://localhost:6007";
const svelteUrl = process.env["SB_SVELTE_URL"] ?? "http://localhost:6008";

const config: StorybookConfig = {
    framework: "@storybook/html-vite",
    stories: [],
    addons: [],
    refs: {
        react: {
            title: "React",
            url: reactUrl,
            expanded: false,
        },
        svelte: {
            title: "Svelte",
            url: svelteUrl,
            expanded: false,
        },
    },
};

export default config;
