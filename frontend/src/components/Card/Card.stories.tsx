import { Meta, StoryFn } from "@storybook/react";
import { Card, CardProps } from ".";
import { CardMock } from "./CardMock";

export default {
  title: "Components/Card",
  component: Card,
  args: CardMock,
  argTypes: {
    onDelete: {
      action: "onDelete",
    },
    onEdit: {
      action: "onEdit",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Default: StoryFn<CardProps> = (args) => (
  <div className="max-w-7xl mx-auto grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card {...args} />
    <Card {...args} />
    <Card {...args} />
  </div>
);
