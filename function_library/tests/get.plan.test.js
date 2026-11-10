import get from "../src/get.js";

describe("get: plan-based tests from phase 1", () => {
  test("TC-1: value in nested path is read correctly", () => {
    const obj = { a: { b: [{ c: 1 }, { d: 2 }] } };
    expect(get(obj, "a.b[0].c")).toBe(1);
  });

  test("TC-2: simple get with key", () => {
    expect(get({ a: 2 }, "a")).toBe(2);
  });

  test("TC-3: missing key returns the default value", () => {
    expect(get({ a: 2 }, "b", -99)).toBe(-99);
  });

  test("TC-4: missing key without default returns undefined", () => {
    expect(get({ a: 2 }, "b")).toBeUndefined();
  });
});
