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
      // permutations inline every alias, modeSelectors keeps the var() references
      // oxlint-disable-next-line typescript/no-deprecated
      modeSelectors: [
        { mode: "Light", selectors: [":root"] },
        { mode: "Dark", selectors: ['[data-theme="dark"]'] },
      ],
      variableName: (token: { id: string }) =>
        `--sl-${token.id
          .split(".")
          .map((part) => toKebab(part))
          .join("-")}`,
    }),
    js({
      filename: "index.js",
    }),
  ],
});

function toKebab(s: string): string {
  return s
    .replaceAll(/\s*\([^)]*\)/gu, "")
    .replaceAll(/[A-Z]+/gu, (m: string, offset: number) =>
      offset === 0 ? m.toLowerCase() : `-${m.toLowerCase()}`,
    )
    .replaceAll(/[\s_]+/gu, "-")
    .toLowerCase();
}
