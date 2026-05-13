import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import js from "@terrazzo/plugin-js";

export default defineConfig({
    tokens: [
        "./tokens/colors.generated.json",
        "./tokens/typography.json",
        "./tokens/radius.json",
        "./tokens/spacing.json",
        "./tokens/stroke.json",
        "./tokens/shadow.json",
        "./tokens/elevation.json",
    ],
    outDir: "./dist",
    plugins: [
        css({
            filename: "tokens.css",
            modeSelectors: [
                { mode: "Light", selectors: [":root"] },
                { mode: "Dark", selectors: ['[data-theme="dark"]'] },
            ],
            variableName: (token: { id: string }) =>
                `--sl-${token.id.split(".").map(toKebab).join("-")}`,
        }),
        js({
            filename: "index.js",
        }),
    ],
});

function toKebab(s: string): string {
    return s
        .replace(/\s*\([^)]*\)/g, "")
        .replace(/[A-Z]+/g, (m, offset) => (offset === 0 ? m.toLowerCase() : `-${m.toLowerCase()}`))
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
}
