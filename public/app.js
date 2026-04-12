import { mapRestaurant } from '/utils/mapRestaurant.js';
import { normalizePostcode } from '/utils/normalizePostcode.js';
import { renderUI } from "./render.js";

const state = {
    status: "idle",
    errorMessage: "",
    restaurants: []
};

const searchView = document.getElementById("search-view");
const form = document.getElementById("postcode-form");
const input = document.getElementById("postcode-input");
const errorMessage = document.getElementById("error-message");
const results = document.getElementById("restaurants-container");
const searchButton = form.querySelector('button[type="submit"]');


function render() {
    renderUI({
        state,
        elements: { searchView, searchButton, errorMessage, results }
    });
}

function setState(patch) {
    Object.assign(state, patch);
    render();
}

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
            errorMessage: "",
            restaurants: []
        });

        console.error(error);
    }
});

render();