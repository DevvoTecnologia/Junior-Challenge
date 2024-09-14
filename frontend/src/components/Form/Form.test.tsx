import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

describe("<Form />", () => {
  it("should render form by default", () => {
    render(<Form />);

    expect(screen.getByRole("textbox", { name: "Nome" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nome" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Poder" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Portador" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Forjado por" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Imagem" })).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render with initial values", () => {
    const initialValues = {
      name: "name",
      power: "power",
      holder: "holder",
      forgedBy: "forgedBy",
      image: "image",
    };

    render(<Form initialValues={initialValues} />);

    expect(screen.getByRole("textbox", { name: "Nome" })).toHaveValue(
      initialValues.name
    );
    expect(screen.getByRole("textbox", { name: "Poder" })).toHaveValue(
      initialValues.power
    );
    expect(screen.getByRole("textbox", { name: "Portador" })).toHaveValue(
      initialValues.holder
    );
    expect(screen.getByRole("textbox", { name: "Forjado por" })).toHaveValue(
      initialValues.forgedBy
    );
    expect(screen.getByRole("textbox", { name: "Imagem" })).toHaveValue(
      initialValues.image
    );
  });

  it("should onFormSubmit called on submit", () => {
    const onFormSubmit = vi.fn();

    render(<Form onFormSubmit={onFormSubmit} />);

    const nameInput = screen.getByRole("textbox", { name: "Nome" });
    const button = screen.getByRole("button");

    userEvent.type(nameInput, "test");

    fireEvent.click(button);

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });
});
