const form = document.getElementById('postcode-form');
const input = document.getElementById('postcode-input');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const postcode = input.value;
    errorMessage.textContent = '';

    try {
        const response = await fetch
        (`/api/restaurants?postcode=${encodeURIComponent(postcode)}`);
    
        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.error || 'Failed to fetch restaurants';
            return;
        }

        console.log(data);
    } catch (error) {
        errorMessage.textContent = 'Something went wrong. Please try again.';
        console.error(error);
    }
});