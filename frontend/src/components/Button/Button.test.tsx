import { IconEdit } from "@tabler/icons-react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("should render default button", () => {
    render(<Button>test</Button>);

    expect(screen.getByRole("button", { name: "test" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "test" })).toHaveClass(
      "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
    );
  });

  it("should render button with variant", () => {
    render(<Button variant="edit">test</Button>);

    expect(screen.getByRole("button", { name: "test" })).toHaveClass(
      "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700"
    );
  });

  it("should render button with icon", () => {
    render(<Button icon={<IconEdit data-testid="icon" />} />);

    expect(
      screen.queryByRole("button", { name: "test" })
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should render button disabled", () => {
    render(<Button disabled>test</Button>);

    expect(screen.queryByRole("button", { name: "test" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "test" })).toHaveClass(
      "disabled:pointer-events-none disabled:bg-zinc-300 disabled:text-zinc-400"
    );
  });
});
