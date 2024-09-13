import { Meta, StoryFn } from "@storybook/react";
import { IconEdit, IconRocket, IconTrash } from "@tabler/icons-react";
import { Button, ButtonProps } from ".";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

export const Default: StoryFn<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Disabled: StoryFn<ButtonProps> = (args) => (
  <Button {...args} disabled>
    Button
  </Button>
);

export const WithIcon: StoryFn<ButtonProps> = (args) => (
  <Button {...args} icon={<IconRocket />} />
);

export const Edit: StoryFn<ButtonProps> = (args) => (
  <Button {...args} icon={<IconEdit />} variant="edit" />
);

export const Delete: StoryFn<ButtonProps> = (args) => (
  <Button {...args} icon={<IconTrash />} variant="delete" />
);
