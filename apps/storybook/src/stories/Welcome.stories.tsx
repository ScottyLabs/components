import type { Meta, StoryObj } from "@storybook/html-vite";

const meta: Meta = {
    title: "Welcome",
    parameters: { layout: "centered" },
    render: () => {
        const root = document.createElement("div");
        root.innerHTML = `
            <h1 style="margin:0 0 8px 0">ScottyLabs Components</h1>
            <p style="margin:0">React and Svelte components are listed in the sidebar under their respective sections.</p>
        `;
        return root;
    },
};

export default meta;

type Story = StoryObj;

export const Welcome: Story = {};
