import { describe, test, expect } from "vitest";

import { getDate } from "../../utils/helpers";

describe("getDate function", () => {
  test("should return the correct date format for a given date", () => {
    const date = new Date("2022-03-13");
    const result = getDate(date);
    expect(result).toEqual("2022-3-13");
  });

  test("should return the correct date format for a date with single digit month and day", () => {
    const date = new Date("2022-01-01");
    const result = getDate(date);
    expect(result).toEqual("2022-1-1");
  });

  test("should return the correct date format for a date with double digit month and day", () => {
    const date = new Date("2022-11-23");
    const result = getDate(date);
    expect(result).toEqual("2022-11-23");
  });
});
