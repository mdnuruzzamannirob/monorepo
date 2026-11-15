import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, expect, it } from "vitest";
import { createApp } from "./app";

let server: ReturnType<ReturnType<typeof createApp>["listen"]>;
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = createApp({ corsOrigins: ["http://localhost:3000"] }).listen(0, () => resolve());
  });
  baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
  server.close();
});

it("GET /api/health returns ok", async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ ok: true, user: { id: "1", name: "Test" } });
});

it("unknown route returns 404", async () => {
  const res = await fetch(`${baseUrl}/nope`);
  expect(res.status).toBe(404);
});
