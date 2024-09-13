import { Meta, StoryFn } from "@storybook/react";
import { Modal, ModalProps } from ".";

export default {
  title: "Components/Modal",
  component: Modal,
  args: {
    title: "Modal title",
    children: "Modal content",
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Default: StoryFn<ModalProps> = (args) => (
  <Modal {...args} showModal />
);
