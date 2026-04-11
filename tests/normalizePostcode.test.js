import { describe, test, expect } from "vitest";
import { normalizePostcode } from "../src/utils/normalizePostcode.js";

describe("normalizePostcode", () => {
    test("keeps already formatted postcode normalized", () => {
        expect(normalizePostcode("EC4M 7RF")).toBe("EC4M 7RF");
    });

    test("uppercases and formats a lowercase postcode", () => {
        expect(normalizePostcode("ec4m7rf")).toBe("EC4M 7RF");
    });

    test("removes extra spaces and keeps one space before last 3 characters", () => {
        expect(normalizePostcode("  ec4m. 7rf  ")).toBe("EC4M 7RF");
    });

    test("removes non-alphanumeric characters", () => {
        expect(normalizePostcode("ec4m-7rf" )).toBe("EC4M 7RF");
    });

    test("returns empty string for empty input after trimming", () => {
        expect(normalizePostcode("   ")).toBe("");
    });

    test("formats a short postcode-like string using last 3 characters", () => {
        expect(normalizePostcode("m11ae")).toBe("M1 1AE");
    });

});