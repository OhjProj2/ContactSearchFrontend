import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_BACKEND_URL}/seek/`, async () => {
    return HttpResponse.json({
      data: {
        contacts: [{ name: "John" }],
      },
      time: 1,
    });
  }),

  http.get(`${import.meta.env.VITE_BACKEND_URL}/listfields`, () => {
    return HttpResponse.json([
      { label: "Email", value: "email" },
      { label: "Name", value: "name" },
    ]);
  }),
];