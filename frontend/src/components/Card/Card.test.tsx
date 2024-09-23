import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { CardMock } from "./CardMock";

describe("<Card />", () => {
  it("should render card by default", () => {
    render(<Card {...CardMock} />);

    expect(screen.getByRole("img", { name: "O Um anel" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /O Um anel/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Controlar os outros anéis/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Excluir" })).toBeInTheDocument();
  });

  // it("should called onEdit", () => {
  //   const onEdit = vi.fn();

  //   render(<Card {...CardMock} onEdit={onEdit} />);

  //   const editButton = screen.getByRole("button", { name: "Editar" });

  //   fireEvent.click(editButton);

  //   expect(onEdit).toHaveBeenCalled();
  // });
});
