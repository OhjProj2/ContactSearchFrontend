import { renderHook, waitFor, act } from "@testing-library/react";
import { server } from "@/msw/server";
import { http, HttpResponse } from "msw";
import { useContactSearch } from "@/hooks/useContactSearch";

// Tests how the hook behaves when the API returns a server error (500)
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

// Tests how the hook behaves when a network error occurs
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

test("handles API failure gracefully", async () => {
    server.use(
        http.post("http://localhost:8000/seek/", () => {
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

test("handles network failure", async () => {
    server.use(
        http.post("http://localhost:8000/seek/", () => {
            return HttpResponse.error();
        })
    );

    const { result } = renderHook(() => useContactSearch());

    await act(async () => {
        await result.current.search({
            url: "http://test.com",
            occupations: ["dev"],
            dataPoints: ["email"],
        });
    });

    await waitFor(() => {
        expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).toBeNull();
});