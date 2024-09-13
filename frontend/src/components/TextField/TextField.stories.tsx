import { Meta, StoryFn } from "@storybook/react";
import { TextField, TextFieldProps } from ".";

export default {
  title: "Components/TextField",
  component: TextField,
  args: {
    label: "First name",
  },
  argTypes: {
    onInput: {
      action: "onInput",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Default: StoryFn<TextFieldProps> = (args) => (
  <TextField {...args} type="text" placeholder="First name" />
);

export const Disabled: StoryFn<TextFieldProps> = (args) => (
  <TextField {...args} type="text" placeholder="First name" disabled />
);
