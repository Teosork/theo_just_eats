import { formatAddress } from "./formatAddress.js";

export function mapRestaurant(restaurant) {
    return {
        logo: restaurant.logoUrl,
        name: restaurant.name,
        cuisines: (restaurant.cuisines || [])
        .map((cuisine) => cuisine.name)
        .join(', '),
        rating: restaurant.rating?.starRating,
        ratingCount: restaurant.rating?.count,
        address: formatAddress(restaurant.address)
    };
}