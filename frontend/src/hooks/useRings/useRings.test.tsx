import { act, renderHook, waitFor } from "@testing-library/react";
import { useRings } from "./useRings";

const mockRing = {
  _id: "1",
  name: "One Ring",
  power: "Invisibility",
  holder: "Frodo",
  forgedBy: "Sauron",
  image: "http://example.com/image.jpg",
};

describe("useRings hook", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("should fetch rings on mount", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockRing],
    });

    const { result } = renderHook(() => useRings());

    await waitFor(() => expect(result.current.data).toEqual([mockRing]));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should create a new ring", async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockRing],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockRing,
          _id: "2",
          name: "Elven Ring",
        }),
      });

    const { result } = renderHook(() => useRings());

    act(() => {
      result.current.createRing({
        ...mockRing,
        _id: "2",
        name: "Elven Ring",
      });
    });

    await waitFor(() =>
      expect(result.current.data).toEqual([
        mockRing,
        { ...mockRing, _id: "2", name: "Elven Ring" },
      ])
    );
  });

  it("should update a ring", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockRing],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ...mockRing,
          name: "Updated Ring",
        }),
      });

    const { result } = renderHook(() => useRings());

    act(() => {
      result.current.updateRing({
        ...mockRing,
        name: "Updated Ring",
      });
    });

    await waitFor(() =>
      expect(result.current.data).toEqual([
        { ...mockRing, name: "Updated Ring" },
      ])
    );
  });

  it("should delete a ring", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockRing],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          _id: "1",
        }),
      });

    const { result } = renderHook(() => useRings());

    act(() => {
      result.current.deleteRing("1");
    });

    await waitFor(() => expect(result.current.data).toEqual([]));
  });
});
