import { fireEvent, render, screen } from "@testing-library/react";
import { SelectField } from "./SelectField";

const SelectMock = {
  name: "test",
  label: "test",
  value: "test",
  options: [
    { value: "Elves", label: "Elves" },
    { value: "Dwarves", label: "Dwarves" },
    { value: "Men", label: "Men" },
    { value: "Sauron", label: "Sauron" },
  ],
};

describe("<SelectField />", () => {
  it("should render label correctly", () => {
    render(<SelectField {...SelectMock} />);

    const optionsElements = screen.getAllByRole("option");

    expect(screen.getByTestId("select-element")).toBeInTheDocument();
    expect(screen.getByTestId("select-element").getAttribute("name")).toBe(
      "test"
    );
    expect(screen.getByTestId("select-element").getAttribute("id")).toBe(
      "test"
    );
    expect(optionsElements.length).toBe(4);
    expect(optionsElements[0].textContent).toBe("Elves");
  });

  it("calls onChange handler when select value changes", () => {
    const onChange = vi.fn();

    render(<SelectField {...SelectMock} onChange={onChange} />);

    const selectElement = screen.getByTestId("select-element");

    expect(screen.getByTestId("select-element")).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "new-value" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
