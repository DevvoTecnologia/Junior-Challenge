import { render, screen } from "@testing-library/react";
import { TextField } from "./TextField";

describe("<TextField />", () => {
  it("should render with label", () => {
    render(<TextField label="test" />);

    expect(screen.getByLabelText("test")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "test");
  });

  it("should render when pass any input prop", () => {
    render(<TextField label="test" placeholder="first name" />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "first name"
    );
  });

  it("should render wen pass any input prop", () => {
    render(<TextField label="test" placeholder="first name" />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "first name"
    );
  });

  it("should render disabled when disabled is true", async () => {
    render(<TextField label="test" disabled />);

    expect(screen.getByRole("textbox")).toHaveAttribute("disabled");
    expect(screen.getByRole("textbox")).toHaveClass("disabled:bg-gray-200");
  });
});
