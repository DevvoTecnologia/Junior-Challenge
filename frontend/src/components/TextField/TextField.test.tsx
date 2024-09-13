import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("change values on typing", async () => {
    const onInputChange = vi.fn();

    render(<TextField label="test" onInput={onInputChange} />);

    const input = screen.getByRole("textbox");
    const text = "example text";

    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInputChange).toHaveBeenCalledTimes(text.length);
    });

    expect(onInputChange).toHaveBeenCalledWith(text);
  });
});
