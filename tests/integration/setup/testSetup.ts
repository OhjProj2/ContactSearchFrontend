import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "@/msw/server";
import { vi } from "vitest";

global.fetch = vi.fn();

// Start MSW before tests
beforeAll(() => server.listen());

// Reset after every test
afterEach(() => server.resetHandlers());

// Close MSW after tests
afterAll(() => server.close());