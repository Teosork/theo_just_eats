import { describe, expect, test } from "vitest";
import { formatAddress } from "../src/utils/formatAddress.js";

describe("formatAddress", () => {
    test("returns full address when all fields exist", () => {
        const address = {
            firstLine: "Fleet Place house 2",
            city: "London",
            postalCode: "EC4M 7RF"
        };

        expect(formatAddress(address)).toBe("Fleet Place house 2, London, EC4M 7RF");
    });

    test("skips missing fields", () => {
        const address = {
            firstLine: "Fleet Place house 2",
            city: "",
            postalCode: "EC4M 7RF"
        };

        expect(formatAddress(address)).toBe("Fleet Place house 2, EC4M 7RF");
    });

    test("returns empty string when address is missing", () => {
        expect(formatAddress()).toBe("");
    });

    test("returns empty string when address is empty", () => {
        expect(formatAddress({})).toBe("");
    });
});