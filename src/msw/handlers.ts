import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:8000/seek/", async () => {
    return HttpResponse.json({
      data: {
        contacts: [{ name: "John" }],
      },
      time: 1,
    });
  }),

  http.get("http://127.0.0.1:8000/listfields", () => {
    return HttpResponse.json([
      { label: "Email", value: "email" },
      { label: "Name", value: "name" },
    ]);
  }),
];