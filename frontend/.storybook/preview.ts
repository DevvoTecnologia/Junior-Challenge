import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: "dark", value: "#111827" },
        { name: "light", value: "#ffffff" },
      ],
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default preview;
