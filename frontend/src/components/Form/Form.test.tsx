import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

const initialValues = {
  _id: "1",
  name: "One Ring",
  power: "Invisibility",
  holder: "Frodo",
  forgedBy: "Sauron",
  image: "http://example.com/image.jpg",
};

describe("<Form />", () => {
  beforeAll(() => {
    HTMLFormElement.prototype.requestSubmit = vi.fn();
  });

  it("should render form with initial values", () => {
    render(<Form initialValues={initialValues} />);

    expect(screen.getByLabelText(/nome/i)).toHaveValue(initialValues.name);
    expect(screen.getByLabelText(/poder/i)).toHaveValue(initialValues.power);
    expect(screen.getByLabelText(/portador/i)).toHaveValue(
      initialValues.holder
    );
    expect(screen.getByLabelText(/forjado por/i)).toHaveValue(
      initialValues.forgedBy
    );
    expect(screen.getByLabelText(/imagem/i)).toHaveValue(initialValues.image);
  });

  it("should update input when type", async () => {
    const handleSubmit = vi.fn();
    const handleChange = vi.fn();

    render(
      <Form
        initialValues={initialValues}
        onDataChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );

    expect(screen.getByLabelText(/nome/i)).toHaveValue(initialValues.name);
    expect(screen.getByLabelText(/poder/i)).toHaveValue(initialValues.power);
    expect(screen.getByLabelText(/portador/i)).toHaveValue(
      initialValues.holder
    );
    expect(screen.getByLabelText(/forjado por/i)).toHaveValue(
      initialValues.forgedBy
    );
    expect(screen.getByLabelText(/imagem/i)).toHaveValue(initialValues.image);

    const inputName = screen.getByLabelText(/nome/i);

    await userEvent.clear(inputName);

    await userEvent.type(inputName, "new name");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "new name",
      })
    );
  });

  it("should handle sibmit form", async () => {
    const handleSubmit = vi.fn();

    render(<Form initialValues={initialValues} handleSubmit={handleSubmit} />);

    const button = screen.getByRole("button", { name: "Salvar" });

    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should render loading text", () => {
    render(<Form initialValues={initialValues} loading />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Salvando...");
  });
});
