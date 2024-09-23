import { act, renderHook } from "@testing-library/react";
import { Ring } from "../../App";
import { useModal } from "./useModal";

describe("uerModal hook", () => {
  it("should initialize with the correct default values", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.showModal).toBe(false);
    expect(result.current.initialValues).toBeNull();
    expect(result.current.currentValue).toBeNull();
  });

  it("should open modal for creating a new ring", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModalForCreate();
    });

    expect(result.current.showModal).toBe(true);
    expect(result.current.initialValues).toBeNull();
    expect(result.current.currentValue).toBeNull();
  });

  it("should open modal for editing an existing ring", () => {
    const existingRing: Ring = {
      _id: "1",
      name: "One Ring",
      power: "Invisibility",
      holder: "Frodo",
      forgedBy: "Sauron",
      image: "http://example.com/image.jpg",
    };

    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModalForEdit(existingRing);
    });

    expect(result.current.showModal).toBe(true);
    expect(result.current.initialValues).toEqual(existingRing);
    expect(result.current.currentValue).toBeNull();
  });

  it("should close the modal", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModalForCreate();
    });

    expect(result.current.showModal).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
    expect(result.current.initialValues).toBeNull();
    expect(result.current.currentValue).toBeNull();
  });

  it("should update currentValue when setCurrentValue is called", () => {
    const newValue: Ring = {
      _id: "2",
      name: "Elven Ring",
      power: "Telepathy",
      holder: "Galadriel",
      forgedBy: "Celebrimbor",
      image: "http://example.com/elven_ring.jpg",
    };

    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.setCurrentValue(newValue);
    });

    expect(result.current.currentValue).toEqual(newValue);
  });
});
