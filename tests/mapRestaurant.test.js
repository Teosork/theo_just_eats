import { describe, test, expect } from "vitest";
import { mapRestaurant } from "../src/utils/mapRestaurant.js";

describe("mapRestaurant", () => {
    test("maps restaurant data into the UI shape", () => {
        const restaurant = {
            logoUrl: "https://example.com/greektavern.png",
            name: "The Greek Tavern",
            cuisines: [
                { name: "Greek" },
                { name: "Souvlaki" },
                { name: "Freebies" }
            ],
            rating: {
                starRating: 4.5,
                count: 5000
            },
            address: {
                firstLine: "Fleet Place house 2",
                city: "London",
                postalCode: "EC4M 7RF"
            }
        };

        expect(mapRestaurant(restaurant)).toEqual({
            logo: "https://example.com/greektavern.png",
            name: "The Greek Tavern",
            cuisines: "Greek, Souvlaki",
            rating: 4.5,
            ratingCount: 5000,
            address: "Fleet Place house 2, London, EC4M 7RF"
        });
    });

    test("handles missing rating safely", () => {
        const restaurant = {
            logoUrl: "https://example.com/greektavern.png",
            name: "The Greek Tavern",
            cuisines: [{ name: "Greek" }],
            address: {
                firstLine: "Fleet Place house 2",
                city: "London",
                postalCode: "EC4M 7RF"
            }
        };

        expect(mapRestaurant(restaurant)).toMatchObject({
            logo: "https://example.com/greektavern.png",
            name: "The Greek Tavern",
            cuisines: "Greek",
            rating: undefined,
            ratingCount: undefined,
            address: "Fleet Place house 2, London, EC4M 7RF"
        });
    });
});