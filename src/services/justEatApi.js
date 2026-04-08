async function getRestaurantsByPostcode(postcode) {
    const response = await fetch (
        `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
    );

    if (!response.ok) {
        throw new Error(`Just Eat Api request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

module.exports = {
    getRestaurantsByPostcode
};