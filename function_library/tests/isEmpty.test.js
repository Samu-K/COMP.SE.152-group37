import isEmpty from "../src/isEmpty.js";

describe("isEmpty: self-designed tests", () => {
  describe("empty values", () => {
    test.each([
      ["number", 5],
      ["boolean", true],
      ["null", null],
      ["undefined", undefined],
      ["empty string", ""],
      ["empty array", []],
      ["empty object", {}],
      ["empty Map", new Map()],
      ["empty Set", new Set()],
      ["empty typed array", new Uint8Array(0)],
      ["empty Buffer", Buffer.alloc(0)],
      [
        "empty arguments",
        (function () {
          return arguments;
        })(),
      ],
    ])("%s is empty", (_name, value) => {
      expect(isEmpty(value)).toBe(true);
    });
  });

  describe("non-empty values", () => {
    test.each([
      ["non-empty string", "a"],
      ["non-empty Map", new Map([["a", 1]])],
      ["non-empty Set", new Set([1])],
      ["non-empty typed array", new Uint8Array(2)],
      ["non-empty Buffer", Buffer.from("a")],
      ["non-empty array", [1]],
      ["whitespace string", " "],
      ["array with undefined", [undefined]],
      ["object with a key", { a: 1 }],
      ["object with undefined value", { a: undefined }],
      [
        "non-empty arguments",
        (function () {
          return arguments;
        })(1),
      ],
      ["array-like object", { length: 2 }],
    ])("%s is not empty", (_name, value) => {
      expect(isEmpty(value)).toBe(false);
    });
  });

  test("inherited enumerable properties do not count", () => {
    const obj = Object.create({ inherited: 1 });
    expect(isEmpty(obj)).toBe(true);
  });

  test("prototype object is checked by own keys", () => {
    function Foo() { }
    expect(isEmpty(Foo.prototype)).toBe(true);
    Foo.prototype.x = 1;
    expect(isEmpty(Foo.prototype)).toBe(false);
  });

  test("plain object with length 0 is not empty (own key length)", () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });
});
