import { sanitizeTime } from "../helpers/dataSanitize.js";
import { expect, it, describe } from "@jest/globals";

const input = [930, 1000, 1100, 1130, 1200, 1400];
const expected = [
  { start: 930, end: 1000 },
  { start: 1000, end: 1100 },
  { start: 1100, end: 1130 },
  { start: 1130, end: 1200 },
  { start: 1200, end: 1400 },
];

describe("sanitizeTime() tests", () => {
  it("returns and array of time objects", () => {
    const output = sanitizeTime(input);
    expect(output).toStrictEqual(expected);
  });
});
