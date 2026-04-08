const form = document.getElementById('postcode-form');
const input = document.getElementById('postcode-input');
const errorMessage = document.getElementById('error-message');
const results = document.getElementById('results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const postcode = input.value;
    errorMessage.textContent = '';
    results.innerHTML = '';

    try {
        const response = await fetch
        (`/api/restaurants?postcode=${encodeURIComponent(postcode)}`);
    
        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.error || 'Failed to fetch restaurants';
            return;
        }

        const rawRestaurants = data.restaurants || [];

        if (rawRestaurants.length === 0) {
            results.innerHTML = '<p>No restaurants found.</p>';
            return;
        }
        const restaurants = rawRestaurants.map(mapRestaurant);

        results.innerHTML = restaurants
        .slice(0, 10)
        .map((restaurant) => `
            <article>
                <img
                    src="${restaurant.logo}"
                    alt="${restaurant.name} logo"
                />
                <h2>${restaurant.name}</h2>
                <p>${restaurant.cuisines || 'N/A'}</p>
                <p>
                   ${restaurant.rating != null
                    ? `${restaurant.rating} (${restaurant.ratingCount})`
                    : 'Not rated yet'}
                </p>
                <p>${restaurant.address || 'N/A'} </p>
            </article>
        `)
        .join('');

        console.log(data);
    } catch (error) {
        errorMessage.textContent = 'Something went wrong. Please try again.';
        console.error(error);
    }
});

function mapRestaurant(restaurant) {
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