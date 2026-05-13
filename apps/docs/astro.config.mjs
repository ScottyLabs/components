import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
    integrations: [
        starlight({
            title: "ScottyLabs Components",
            description: "Design system, components, and tokens for ScottyLabs projects.",
            customCss: ["@scottylabs/tokens/css"],
            head: [
                {
                    tag: "link",
                    attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
                },
                {
                    tag: "link",
                    attrs: {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossorigin: true,
                    },
                },
                {
                    tag: "link",
                    attrs: {
                        rel: "stylesheet",
                        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
                    },
                },
            ],
            social: [
                {
                    icon: "codeberg",
                    label: "Codeberg",
                    href: "https://codeberg.org/ScottyLabs/components",
                },
            ],
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
                    link: "https://storybook.scottylabs.org",
                    attrs: { target: "_blank", rel: "noopener" },
                },
            ],
        }),
    ],
});
