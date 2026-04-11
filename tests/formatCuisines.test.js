import { describe, expect, test } from "vitest";
import { formatCuisines } from "../src/utils/formatCuisines.js";


describe("formatCuisines", () => {
    test("returns comma-separated cuisine names", () => {
        const cuisines = [
            { name: "Burger" },
            { name: "Greek" },
            { name: "Desserts" }
        ];

        expect(formatCuisines(cuisines)).toBe("Burger, Greek, Desserts");
    });

    test("filters out excluded cuisine labels", () => {
        const cuisines = [
            { name: "Pizza" },
            { name: "Deals" },
            { name: "Freebies" },
            { name: "Greek" },
            { name: "Local Legends"}
        ];

        expect(formatCuisines(cuisines)).toBe("Pizza, Greek");
    });

    test("filters excluded names case-insensitively", () => {
        const cuisines = [
            { name: "Meal Deal" },
            { name: "pizza" },
            { name: "GIFTS" }
        ];

        expect(formatCuisines(cuisines)).toBe("pizza");
    });

    test("removes empty or missing names", () => {
        const cuisines = [
            { name: "Pizza" },
            { name: "" },
            {},
            { name: "Greek" }
        ];

        expect(formatCuisines(cuisines)).toBe("Pizza, Greek");
    });

    test('returns "N/A" when all cuisines are excluded', () => {
        const cuisines = [
            { name: "Deals" },
            { name: "Freebies" },
            { name: "Local Legends" }
        ];

        expect(formatCuisines(cuisines)).toBe("N/A");
    });

    test('returns "N/A" when cuisines is undefined', () => {
        expect(formatCuisines(undefined)).toBe("N/A");
    });

    test('returns "N/A" when array is empty', () => {
        expect(formatCuisines([])).toBe("N/A");
    });
});