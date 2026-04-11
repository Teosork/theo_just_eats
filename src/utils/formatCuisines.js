const excludedCuisines = 
    [
        "deals",
        "collect stamps",
        "freebies",
        "meal deal",
        "£8 off",
        "your favourites",
        "local legends",
        "gifts"
    ];

export function formatCuisines(cuisines) {
    const formatted = (cuisines || [])
        .map((cuisine) => cuisine.name)
        .filter(Boolean)
        .filter((name) => !excludedCuisines.includes(name.toLowerCase()))
        .join(", ");

    return formatted || "N/A";
}