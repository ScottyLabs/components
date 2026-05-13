import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
    integrations: [
        starlight({
            title: "ScottyLabs Components",
            description: "Design system, components, and tokens for ScottyLabs projects.",
            social: {
                codeberg: "https://codeberg.org/ScottyLabs/components",
            },
            sidebar: [
                {
                    label: "Getting started",
                    items: [
                        { label: "Introduction", link: "/" },
                        { label: "Install", link: "/getting-started/install/" },
                        { label: "Theming", link: "/getting-started/theming/" },
                    ],
                },
                {
                    label: "Tokens",
                    items: [
                        { label: "Primitives", link: "/tokens/primitives/" },
                        { label: "Semantic colors", link: "/tokens/colors/" },
                        { label: "Typography", link: "/tokens/typography/" },
                        { label: "Spacing & radii", link: "/tokens/spacing-radii/" },
                    ],
                },
                {
                    label: "Components",
                    link: "https://components.components.scottylabs.org",
                    attrs: { target: "_blank", rel: "noopener" },
                },
            ],
        }),
    ],
});
