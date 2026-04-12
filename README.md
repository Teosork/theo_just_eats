# Theo Just Eats

Small web application that fetches restaurant data from the Just Eat API by UK postcode and displays the first 10 restaurants.

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Vitest

## Requirements

- Node.js 18 or later
- npm
- Git (optional, for cloning)

## How to Run

This project requires a local Node.js server because it uses an Express backend.

### Check your Node.js version
```bash
node -v
npm -v
```

If your Node.js version is below 18, update it:

**Option A: Download from official site**  
[Node.js Downloads](https://nodejs.org/en/download)

**Option B: Use nvm (Node Version Manager)**
```bash
nvm install 18
nvm use 18
```

### Installation

#### Option 1: Clone with Git

**HTTPS (recommended):**
```bash
git clone https://github.com/Teosork/theo_just_eats.git
cd theo_just_eats
```

#### Option 2: Download ZIP
1. Open the repository on GitHub.
2. Click **Code** → **Download ZIP**.
3. Extract the ZIP file.
4. Open the extracted folder in your terminal.

### Start the app
```bash
npm install
npm start
```

Open your browser and visit:
http://localhost:3000

### Stop the server
Press `Ctrl + C` in the terminal.

## How to Use

1. Enter a valid UK postcode (e.g. `EC4M 7RF`).
2. Click **Search**.
3. View the first 10 restaurants with logo, name, cuisines, rating, and address.

## Testing

### Automated Tests
```bash
npm test
```
or watch mode:
```bash
npm run test:watch
```

### Manual Testing Checklist
- **Invalid postcode**: Enter `9999` or `ABC` → verify error feedback appears.
- **Edge case postcode**: Enter `EC4M--7RF..` (valid but unusual format) → verify restaurants load.
- **Success state navigation**: After searching `EC4M 7RF`, verify clicking the logo or refreshing returns to the search screen.
- **Responsive design**: Use browser DevTools to test mobile sizes → verify layout adapts correctly (Room for improvement).
- **Long content**: Search a postcode. In case restaurants with long names/addresses appear → verify full text appearing by mouse-hovering over the dots.

## Assumptions and Design Decisions

- The Just Eat API provides enough restaurant data for a useful postcode-based search experience.
- Showing the first 10 restaurants is sufficient for the scope of this assignment.
- Displaying the address as `firstLine`, `city`, and `postalCode` gives users enough location context without overcrowding the UI.
- Displaying rating score together with rating count provides more useful feedback than showing only one of those values.
- Showing each restaurant’s logo improves the visual clarity of the results when the API provides one.
- Deal-related cuisine tags were excluded because they did not add meaningful value to the current user experience.

## Future Improvements

### New Features
- Add restaurant filtering and sorting options, such as cuisine type and rating.
- Allow users to load more restaurants or stores beyond the initial 10 results.
- Allow full addresses (for example, "122 Kensington Park Road, Notting Hill, London, W11 2EP") by using a geocoding API such as Google Places or OpenStreetMap Nominatim, extracting the UK postcode, and then searching for restaurants.

### Code Quality and UX
- Improve error handling and user experience by providing clearer feedback for invalid postcodes, empty input, failed requests, and server errors.
- Improve accessibility by strengthening semantic HTML, keyboard navigation, focus states, and screen-reader support.
- Improve UI responsiveness across every screen size.
- Add UI tests for core user interactions such as entering a postcode, submitting a search, and displaying results across different screen sizes.
- Add integration tests to verify communication between the frontend, backend routes, and the Just Eat API.

### API-Based Enhancements
- Add a restaurant details page showing more information such as menu items, opening hours, and available deals, depending on the capabilities of the Just Eat API.
- Improve the way results are presented by better understanding the factors that affect restaurant ranking and availability, then reflecting that more clearly in the UI and UX.