const state = {
    status: "idle",
    postcode: "",
    errorMessage: "",
    restaurants: []
};

function render() {
    renderLayout();
    renderFeedback();
    renderResults();
}

function renderLayout() {
    const isLanding = state.status === "idle" || state.status === "validation-error";

    searchView.classList.toggle("search-initial-state", isLanding);
    searchView.classList.toggle("search-results-state", !isLanding);
}

function renderFeedback() {
    if (state.status === "validation-error" || state.status === "request-error") {
        errorMessage.textContent = state.errorMessage;
        return;
    }

    errorMessage.textContent = "";
}

function renderResults() {
    if (state.status === "idle" || state.status === "validation-error") {
        results.innerHTML = "";
        return;
    }

    if (state.status === "loading") {
        results.innerHTML = "<p>Loading restaurants...</p>";
        return;
    }

    if (state.status === "request-error") {
        results.innerHTML = "<p>We could not load restaurants right now.</p>";
        return;
    }

    if (state.status === "empty") {
        results.innerHTML = "<p>No restaurants found.</p>";
        return;
    }

    if (state.status === "success") {
        results.innerHTML = `<p>${state.restaurants.length} restaurants found.</p>`;
    }
}

function setState(patch) {
    Object.assign(state, patch);
    render();
}

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


const searchView = document.getElementById("search-view");
const form = document.getElementById("postcode-form");
const input = document.getElementById("postcode-input");
const errorMessage = document.getElementById("error-message");
const results = document.getElementById("results");

input.addEventListener('input', () => {
    if (state.status === "validation-error" || state.status === "request-error") {
        setState({
            status: "idle",
            errorMessage: ""
        });
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const postcode = input.value.trim();

    if (!postcode) {
        setState({
            status: "validation-error",
            postcode: "",
            errorMessage: "Please enter a postcode.",
            restaurants: []
        });
        return;
    }

    setState({
        status: "loading",
        postcode,
        errorMessage: "",
        restaurants: []
    });

    try {
        const response = await fetch
        (`/api/restaurants?postcode=${encodeURIComponent(postcode)}`);
        const data = await response.json();

        if (!response.ok) {    
            const status = response.status;
            const message = data.error || "Failed to fetch restaurants.";
            setState({
                status: status === 400 ? "validation-error" : "request-error",
                postcode,
                errorMessage: message,
                restaurants: []
            });
            return;
        }
 
        const rawRestaurants = data.restaurants || [];
        const restaurants = rawRestaurants.slice(0, 10).map(mapRestaurant);

        if (restaurants.length === 0) {
            setState({
                status: "empty",
                postcode,
                errorMessage: "",
                restaurants: []
            });
            return;
        }
          
        setState({
            status: "success",
            postcode,
            errorMessage: "",
            restaurants
        });
    } catch (error) {
        setState({
            status: "request-error",
            postcode,
            errorMessage: "Something went wrong. Please try again.",
            restaurants: []
        });

        console.error(error);
    }
});

render();