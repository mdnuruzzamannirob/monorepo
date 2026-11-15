import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  platform: "node",
  target: "node24",
  clean: true,
  sourcemap: true,
  // workspace package gulo source .ts export kore, tai bundle e dhukano lage
  noExternal: [/^@myapp\//],
});
