import ceil from "../src/ceil.js";

describe("ceil: self-designed tests", () => {
  describe("default precision", () => {
    test.each([
      [4.006, 5],
      [4.0, 4],
      [-4.5, -4],
      [0.1, 1],
      [-0.1, -0],
      [0, 0],
    ])("ceil(%p) = %p", (n, expected) => {
      expect(ceil(n)).toBe(expected);
    });
  });

  describe("positive precision (prices, E2E-1 totals)", () => {
    test.each([
      [6.004, 2, 6.01],
      [6.001, 2, 6.01],
      [6.01, 2, 6.01],
      [8.531, 2, 8.54],
      [-6.009, 2, -6],
      [1.005, 2, 1.01],
      [0.1 + 0.2, 2, 0.31],
      [5.3, 2, 5.3],
      [4.5, 1, 4.5],
    ])("ceil(%p, %p) = %p", (n, p, expected) => {
      expect(ceil(n, p)).toBe(expected);
    });
  });

  describe("negative precision", () => {
    test.each([
      [6040, -2, 6100],
      [6000, -2, 6000],
      [-6040, -2, -6000],
      [1, -1, 10],
    ])("ceil(%p, %p) = %p", (n, p, expected) => {
      expect(ceil(n, p)).toBe(expected);
    });
  });

  describe("precision limits and special values", () => {
    test("NaN returns NaN", () => {
      expect(ceil(NaN, 2)).toBeNaN();
    });

    test("Infinity with precision returns NaN", () => {
      expect(ceil(Infinity, 2)).toBeNaN();
    });

    test("null precision behaves like 0", () => {
      expect(ceil(1.2, null)).toBe(2);
    });

    test("very large precision is clamped", () => {
      expect(ceil(1.2, 1000)).toBe(1.2);
    });

    test("very large negative precision is clamped", () => {
      expect(ceil(1.2, -1000)).toBe(1e292);
    });

    test("numeric string is coerced", () => {
      expect(ceil("4.006", 2)).toBe(4.01);
    });
  });
});
