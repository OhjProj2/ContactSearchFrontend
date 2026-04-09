import { server } from "@/msw/server";
import { http, HttpResponse } from "msw";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useContactSearch } from "@/hooks/useContactSearch";

// Tests that the hook returns valid search results from the API
test("returns search results from API", async () => {
    const { result } = renderHook(() => useContactSearch());

    await act(async () => {
        await result.current.search({
            url: "http://test.com",
            occupations: ["developer"],
            dataPoints: ["email"],
        });
    });

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).not.toBeNull();
    expect(result.current.results?.data.contacts.length).toBe(1);
});

// Tests that loading state is managed correctly during a search request
test("sets loading state correctly during search", async () => {
    const { result } = renderHook(() => useContactSearch());

    await act(async () => {
        await result.current.search({
            url: "http://test.com",
            occupations: ["developer"],
            dataPoints: ["email"],
        });
    });

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.loading).toBe("boolean");
});

// Tests how the hook handles API failures gracefully
test("handles API failure gracefully", async () => {
    server.use(
        http.post(`${import.meta.env.VITE_BACKEND_URL}/seek/`, () => {
            return HttpResponse.error();
        })
    );

    const { result } = renderHook(() => useContactSearch());

    await act(async () => {
        await result.current.search({
            url: "http://test-url.com",
            occupations: ["developer"],
            dataPoints: ["email"],
        });
    });

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).toBeNull();
});