import { renderHook, act } from "@testing-library/react-hooks";
import { HttpClient, HttpResponse, HttpStatusCode } from "../@types/http-types";
import { useFetch } from "../hooks/useFetch";

describe("useFetch", () => {
  it("should fetch data", async () => {
    const url = `/api/user`;
    const dataResponse = {
      id: 0,
      name: "patryckSilva",
    };
    const httpClient: HttpClient = {
      async request() {
        const tembObject: HttpResponse = {
          body: dataResponse,
          statusCode: HttpStatusCode.ok,
        };

        return tembObject;
      },
    };

    const { result, waitFor } = renderHook(() => useFetch({ url, httpClient }));

    await act(async () => {
      await waitFor(() => result.current.isLoading === false);
    });

    expect(result.current.data).toMatchObject(dataResponse);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
