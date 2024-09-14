import { Meta, StoryFn } from "@storybook/react";
import { Form, FormProps } from ".";

export default {
  title: "Components/Form",
  component: Form,
  args: {
    onFormSubmit: () => {},
  },
  argTypes: {
    onFormSubmit: {
      action: "onFormSubmit",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Default: StoryFn<FormProps> = () => (
  <div className="max-w-xs mx-auto my-8">
    <Form />
  </div>
);
