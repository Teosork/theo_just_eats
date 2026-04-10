export function mapRestaurant(restaurant) {
    return {
        logo: restaurant.logoUrl,
        name: restaurant.name,
        cuisines: (restaurant.cuisines || [])
        .map((cuisine) => cuisine.name)
        .join(', '),
        rating: restaurant.rating?.starRating,
        ratingCount: restaurant.rating?.count,
        address: [
        restaurant.address?.firstLine,
        restaurant.address?.city,
        restaurant.address?.postalCode
        ]
        .filter(Boolean)
        .join(', ')
    };
}