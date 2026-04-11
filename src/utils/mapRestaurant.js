import { formatAddress } from "./formatAddress.js";
import { formatCuisines } from "./formatCuisines.js";

export function mapRestaurant(restaurant) {
    return {
        logo: restaurant.logoUrl,
        name: restaurant.name,
        cuisines: formatCuisines(restaurant.cuisines),
        rating: restaurant.rating?.starRating,
        ratingCount: restaurant.rating?.count,
        address: formatAddress(restaurant.address)
    };
}