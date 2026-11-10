import slice from "../src/slice.js";

describe("slice: self-designed tests", () => {
  const arr = [1, 2, 3, 4, 5];

  describe("E2E-2: paging", () => {
    test("first page of 3", () => {
      expect(slice(arr, 0, 3)).toEqual([1, 2, 3]);
    });

    test("last partial page", () => {
      expect(slice(arr, 3, 6)).toEqual([4, 5]);
    });
  });

  describe("start and end", () => {
    test("no start or end returns a copy", () => {
      const res = slice(arr);
      expect(res).toEqual(arr);
      expect(res).not.toBe(arr);
    });

    test("start only", () => {
      expect(slice(arr, 2)).toEqual([3, 4, 5]);
    });

    test("start and end", () => {
      expect(slice(arr, 1, 3)).toEqual([2, 3]);
    });

    test("end is exclusive", () => {
      expect(slice(arr, 0, 1)).toEqual([1]);
    });

    test("null start behaves like 0", () => {
      expect(slice(arr, null, 2)).toEqual([1, 2]);
    });

    test("does not mutate the input", () => {
      slice(arr, 1, 3);
      expect(arr).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("negative indices", () => {
    test("negative start counts from the end", () => {
      expect(slice(arr, -2)).toEqual([4, 5]);
    });

    test("negative end counts from the end", () => {
      expect(slice(arr, 0, -1)).toEqual([1, 2, 3, 4]);
    });

    test("negative start and end", () => {
      expect(slice(arr, -3, -1)).toEqual([3, 4]);
    });

    test("negative start beyond length starts at 0", () => {
      expect(slice(arr, -10)).toEqual(arr);
    });
  });

  describe("out of range bounds", () => {
    test("end beyond length", () => {
      expect(slice(arr, 3, 100)).toEqual([4, 5]);
    });

    test("start beyond length returns empty", () => {
      expect(slice(arr, 10)).toEqual([]);
    });

    test("start greater than end returns empty", () => {
      expect(slice(arr, 3, 1)).toEqual([]);
    });

    test("start equal to end returns empty", () => {
      expect(slice(arr, 2, 2)).toEqual([]);
    });

    test("negative end beyond length returns empty", () => {
      expect(slice(arr, 0, -10)).toEqual([]);
    });
  });

  describe("empty or missing input", () => {
    test.each([
      ["empty array", []],
      ["null", null],
      ["undefined", undefined],
    ])("%s returns empty", (_n, input) => {
      expect(slice(input, 0, 2)).toEqual([]);
    });
  });
});
