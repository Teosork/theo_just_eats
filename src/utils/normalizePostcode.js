export function normalizePostcode(postcode) {
    const trimmed = postcode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!trimmed) return "";
    return trimmed.slice(0, -3) + " " + trimmed.slice(-3);
}