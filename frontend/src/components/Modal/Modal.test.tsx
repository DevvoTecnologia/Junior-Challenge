import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./modal";

vi.mock("framer-motion", () => ({
  motion: {
    div: vi.fn(({ children, ...rest }) => <div {...rest}>{children}</div>),
  },
  AnimatePresence: vi.fn(({ children }) => <>{children}</>),
}));

describe("<Modal />", () => {
  it("should render modal visible", () => {
    render(
      <Modal title="test" showModal setShowModal={vi.fn()}>
        content
      </Modal>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByLabelText("Close Modal")).toBeInTheDocument();
  });

  it("should render modal hidden", () => {
    render(
      <Modal title="test" setShowModal={vi.fn()}>
        content
      </Modal>
    );

    expect(screen.queryByText("test")).not.toBeInTheDocument();
    expect(screen.queryByText("content")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Close Modal")).not.toBeInTheDocument();
  });

  it("should render open and close modal", () => {
    const setShowModal = vi.fn();

    render(
      <Modal title="test" showModal setShowModal={setShowModal}>
        content
      </Modal>
    );

    fireEvent.click(screen.getByLabelText("Close Modal"));

    expect(setShowModal).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
