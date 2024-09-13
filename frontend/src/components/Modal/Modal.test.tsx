import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./modal";

describe("<Modal />", () => {
  it("should render modal hidden", () => {
    const { container } = render(<Modal title="test">content</Modal>);

    expect(container.firstChild).toHaveClass(
      "invisible opacity-0 pointer-events-none"
    );
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("should render open/close modal", () => {
    const { container } = render(
      <Modal title="test" showModal>
        content
      </Modal>
    );

    expect(container.firstChild).toHaveClass("visible opacity-100");

    const closeButton = screen.getByLabelText("Close Modal");

    fireEvent.click(closeButton);

    expect(container.firstChild).toHaveClass(
      "invisible opacity-0 pointer-events-none"
    );
  });
});
