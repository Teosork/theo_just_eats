const express = require('express');
const { getRestaurantsByPostcode } = require('../services/justEatApi');

const router = express.Router();

function isValidUkPostcode(postcode) {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
}
router.get('/', async (req, res) => {
    const { postcode } = req.query;

    if (!postcode) {
        return res.status(400).json({
            error: 'Postcode is required'
        });
    }

    if (!isValidUkPostcode(postcode)) {
        return res.status(400).json({
            error: 'Invalid UK postcode format'
        });
    }

    try {
        const data = await getRestaurantsByPostcode(postcode);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch restaurants'
        });
    }
});

module.exports = router;