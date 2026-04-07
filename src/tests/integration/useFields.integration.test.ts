import { server } from "@/msw/server";
import { http, HttpResponse } from "msw";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useFields } from "@/hooks/useFields";

// Tests that the hook successfully fetches fields from the API
test("fetches fields successfully", async () => {
    server.use(
        http.get("http://127.0.0.1:8000/listfields", () => {
            return HttpResponse.json([
                { label: "Email", value: "email" },
            ]);
        })
    );

    const { result } = renderHook(() => useFields());

    await waitFor(() => {
        expect(result.current.fields).toEqual([
            { label: "Email", value: "email" },
        ]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });
});

// Tests how the hook handles API errors gracefully
test("handles API error", async () => {
    server.use(
        http.get("http://127.0.0.1:8000/listfields", () => {
            return HttpResponse.error();
        })
    );

    const { result } = renderHook(() => useFields());

    await waitFor(() => {
        expect(result.current.error).toBeTruthy();
        expect(result.current.loading).toBe(false);
    });
});

// Tests the initial loading state before API response resolves
test("initial loading state", () => {
    const { result } = renderHook(() => useFields());

    expect(result.current.loading).toBe(true);
});