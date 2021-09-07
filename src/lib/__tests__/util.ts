import * as util from "../util";

describe("util tests", function () {
  test("getIncreasingSequence returns correct sequences", function () {
    expect(util.getIncreasingSequence({ end: 5 })).toEqual([0, 1, 2, 3, 4, 5]);
    expect(util.getIncreasingSequence({ start: 12, end: 16 })).toEqual([
      12, 13, 14, 15, 16,
    ]);
    expect(util.getIncreasingSequence({ start: -3, end: 5 })).toEqual([
      -3, -2, -1, 0, 1, 2, 3, 4, 5,
    ]);

    expect(util.getIncreasingSequence({ end: 0 })).toEqual([0]);
    expect(util.getIncreasingSequence({ start: 23, end: 23 })).toEqual([23]);

    expect(() => util.getIncreasingSequence({ end: -10 })).toThrow(
      /end cannot be negative without providing a start value/
    );
    expect(() => util.getIncreasingSequence({ start: 6, end: 4 })).toThrow(
      /start cannot be of a higher value than end/
    );
  });

  test("capitalize", function() {
    expect(util.capitalize("")).toBe("");
    expect(util.capitalize("abc def")).toBe("Abc def");
    expect(util.capitalize("123 abc")).toBe("123 abc");

  })
});
