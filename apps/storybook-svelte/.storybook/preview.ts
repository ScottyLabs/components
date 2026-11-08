import "@scottylabs/styles";
import type { Preview } from "@storybook/svelte";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1e1e1e" },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: "Color mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, ctx) => {
      const theme: unknown = ctx.globals["theme"];
      if (typeof theme === "string" && typeof document !== "undefined") {
        document.documentElement.dataset["theme"] = theme;
      }
      return story();
    },
  ],
};

export default preview;
