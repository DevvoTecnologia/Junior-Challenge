import { Meta, StoryFn } from "@storybook/react";
import { SelectField, SelectFieldProps } from ".";

export default {
  title: "Components/SelectField",
  component: SelectField,
  args: {
    label: "Label",
    options: [
      { value: "1", label: "Opção 1" },
      { value: "2", label: "Opção 2" },
      { value: "3", label: "Opção 3" },
    ],
  },
} as Meta;

export const Default: StoryFn<SelectFieldProps> = (args) => (
  <SelectField {...args} />
);
