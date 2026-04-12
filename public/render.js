export function renderUI({ state, elements }) {
    renderLayout(state, elements.searchView);
    renderFormState(state, elements.searchButton);
    renderFeedback(state, elements.errorMessage);
    renderResults(state, elements.results);
}

function renderLayout(state, searchView) {
    const isLanding = state.status === "idle" || state.status === "validation-error";

    searchView.classList.toggle("search-initial_state", isLanding);
    searchView.classList.toggle("search-results_state", !isLanding);
}

function renderFormState(state, searchButton) {
    const isLoading = state.status === "loading";

    searchButton.disabled = isLoading;
    searchButton.textContent = isLoading ? "Searching..." : "Search";
}


function renderFeedback(state, errorMessage) {
    if (state.status === "validation-error" || state.status === "request-error") {
        errorMessage.textContent = state.errorMessage;
        return;
    }

    errorMessage.textContent = "";
}

function renderResults(state, results) {
    if (state.status === "idle" || state.status === "validation-error") {
        results.innerHTML = "";
        return;
    }

    if (state.status === "loading") {
        results.innerHTML = "<span class=loader></span>";
        return;
    }

    if (state.status === "request-error") {
        results.innerHTML = "<p class=failed-loader>We could not load restaurants right now, please try again.</p>";
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