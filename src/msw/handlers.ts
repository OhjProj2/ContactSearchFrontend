import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:8000";

export const handlers = [
  http.post(`${BASE_URL}/seek/`, async () => {
    return HttpResponse.json({
      data: {
        contacts: [{ name: "John" }],
      },
      time: 1,
    });
  }),

  http.get(`${BASE_URL}/listfields`, () => {
    return HttpResponse.json([
      { label: "Email", value: "email" },
      { label: "Name", value: "name" },
    ]);
  }),
];