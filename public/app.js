import { mapRestaurant } from '/utils/mapRestaurant.js';
import { normalizePostcode } from '/utils/normalizePostcode.js';

const state = {
    status: "idle",
    errorMessage: "",
    restaurants: []
};

function render() {
    renderLayout();
    renderFormState();
    renderFeedback();
    renderResults();
}

function renderLayout() {
    const isLanding = state.status === "idle" || state.status === "validation-error";

    searchView.classList.toggle("search-initial_state", isLanding);
    searchView.classList.toggle("search-results_state", !isLanding);
}

function renderFormState() {
    const isLoading = state.status === "loading";

    searchButton.disabled = isLoading;
    searchButton.textContent = isLoading ? "Searching..." : "Search";
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
        results.innerHTML = "<span class=loader></span>";
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
        results.innerHTML = state.restaurants
        .map(renderRestaurantCard)
        .join("");
    }
}

function setState(patch) {
    Object.assign(state, patch);
    render();
}

function renderRestaurantCard(restaurant) {
    return `
        <div class="restaurant-card">
            <div class="restaurant-first_row">
                <h2 class="restaurant-card_name" title="${restaurant.name}">
                  ${restaurant.name}
                </h2>
                <img
                    src="${restaurant.logo}"
                    alt="${restaurant.name} logo"
                    class="restaurant-card_logo"
                />
            </div>
            <p class="restaurant-card_cuisines" title="${restaurant.cuisines || "N/A"} ">
              <img src="./assets/images/cuisines.svg" alt="" class="restaurant-card_icon" />
                ${restaurant.cuisines || "N/A"}
            </p>
            <p class="restaurant-card_rating">
                <img src="./assets/images/rating.svg" alt="" class="restaurant-card_icon" />
                ${restaurant.rating > 0
                    ? ` ${restaurant.rating} (${restaurant.ratingCount})`
                    : " Not rated yet"}
            </p>
            <p class="restaurant-card_address" title="${restaurant.address || "N/A"}">
                <img src="./assets/images/location.svg" alt="" class="restaurant-card_icon" />
                ${restaurant.address || "N/A"}
            </p>
        </div>
    `;
}


const searchView = document.getElementById("search-view");
const form = document.getElementById("postcode-form");
const input = document.getElementById("postcode-input");
const errorMessage = document.getElementById("error-message");
const results = document.getElementById("restaurants-container");
const searchButton = form.querySelector('button[type="submit"]');

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

    if (state.status === "loading") return;

    const postcode = normalizePostcode(input.value);

    if (!postcode) {
        setState({
            status: "validation-error",
            errorMessage: "Please enter a postcode.",
            restaurants: []
        });
        return;
    }

    setState({
        status: "loading",
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
                errorMessage: "",
                restaurants: []
            });
            return;
        }
          
        setState({
            status: "success",
            errorMessage: "",
            restaurants
        });
    } catch (error) {
        setState({
            status: "request-error",
            errorMessage: "Something went wrong. Please try again.",
            restaurants: []
        });

        console.error(error);
    }
});

render();