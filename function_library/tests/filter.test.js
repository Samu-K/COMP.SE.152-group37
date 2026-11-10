import { jest } from "@jest/globals";

import filter from "../src/filter.js";

describe("filter: self-designed tests", () => {
  const basket = [
    { id: "A", qty: 1, price: 2.5 },
    { id: "B", qty: 2, price: 2.2 },
    { id: "C", qty: 1, price: 3.24 },
  ];

  describe("E2E-1: removing a line from the basket", () => {
    test("removes the line with id B", () => {
      expect(filter(basket, (l) => l.id !== "B")).toEqual([basket[0], basket[2]]);
    });

    test("does not mutate the input", () => {
      const copy = [...basket];
      filter(basket, (l) => l.id !== "B");
      expect(basket).toEqual(copy);
    });

    test("returns a new array", () => {
      expect(filter(basket, () => true)).not.toBe(basket);
    });
  });

  describe("E2E-2: category search", () => {
    const products = [
      { name: "Milk", category: "Dairy" },
      { name: "Bread", category: "Bakery" },
      { name: "Cheese", category: "Dairy" },
    ];

    test("returns only Dairy products", () => {
      const res = filter(products, (p) => p.category === "Dairy");
      expect(res.map((p) => p.name)).toEqual(["Milk", "Cheese"]);
    });

    test("keeps original order", () => {
      expect(filter([3, 1, 2], () => true)).toEqual([3, 1, 2]);
    });

    test("no match returns an empty array", () => {
      expect(filter(products, (p) => p.category === "Bakery2")).toEqual([]);
    });
  });

  describe("edge cases", () => {
    test.each([
      ["empty array", []],
      ["null", null],
      ["undefined", undefined],
    ])("%s returns an empty array", (_n, input) => {
      expect(filter(input, () => true)).toEqual([]);
    });

    test("all elements match", () => {
      expect(filter([1, 2, 3], () => true)).toEqual([1, 2, 3]);
    });

    test("does not call predicate on an empty array", () => {
      const spy = jest.fn();
      filter([], spy);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
