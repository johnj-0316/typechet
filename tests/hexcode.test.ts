import { GetColorName } from "hex-color-to-color-name";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "#FFFFFF",
    expected: "White",
  },
  {
    input: "#askl;dfjnasdf",
    expected: "Invalid Color: #askl;dfjnasdf",
  },
  {
    input: "",
    expected: "Invalid Color: ",
  },
])("GetColorName($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const name = GetColorName(input);
    expect(name).toHaveLength(expected.length);
    expect(name).toBe(expected);
  });
});