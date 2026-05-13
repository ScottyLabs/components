import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    framework: "@storybook/react-vite",
    stories: [
        "../../../packages/react/src/**/*.stories.@(ts|tsx|mdx)",
        "../src/**/*.stories.@(ts|tsx|mdx)",
    ],
    addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
};

export default config;
