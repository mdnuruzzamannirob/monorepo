import { describe, expect, it } from "vitest";
import { userSchema } from "./index";

describe("userSchema", () => {
  it("accepts a valid user", () => {
    expect(userSchema.parse({ id: "1", name: "Test" }).name).toBe("Test");
  });
  it("rejects an empty name", () => {
    expect(userSchema.safeParse({ id: "1", name: "" }).success).toBe(false);
  });
});
