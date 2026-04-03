import { describe, expect, it } from "vitest";
import { shuffleArray, uniqueCases } from "./cases-utils";

describe("shuffleArray", () => {
  it("returns a shuffled copy without mutating the input", () => {
    const input = ["a", "b", "c", "d"];
    const randomValues = [0.9, 0.1, 0.4];

    const output = shuffleArray(input, () => randomValues.shift() ?? 0);

    expect(input).toEqual(["a", "b", "c", "d"]);
    expect(output).toEqual(["b", "c", "a", "d"]);
    expect(output).toHaveLength(input.length);
    expect(new Set(output)).toEqual(new Set(input));
  });
});

describe("uniqueCases", () => {
  it("removes repeated titles or image paths", () => {
    const input = [
      { title: "Tracking Leads Expansão", print: "/cases/21-tracking-leads-expansao.jpeg" },
      { title: "tracking leads expansão", print: "/cases/99-outro-arquivo.jpg" },
      { title: "Outro card", print: "/cases/21-tracking-leads-expansao.jpeg" },
      { title: "Card único", print: "/cases/card-unico.jpg" },
    ];

    const output = uniqueCases(input);

    expect(output).toEqual([
      { title: "Tracking Leads Expansão", print: "/cases/21-tracking-leads-expansao.jpeg" },
      { title: "Card único", print: "/cases/card-unico.jpg" },
    ]);
  });
});
