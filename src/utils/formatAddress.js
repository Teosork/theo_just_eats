export function formatAddress(address) {
    const { firstLine, city, postalCode } = address || {};
    return [firstLine, city, postalCode].filter(Boolean).join(", ");
}