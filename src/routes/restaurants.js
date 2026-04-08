const express = require('express');
const { getRestaurantsByPostcode } = require('../services/justEatApi');

const router = express.Router();

router.get('/', async (req, res) => {
    const { postcode } = req.query;

    if (!postcode) {
        return res.status(400).json({
            error: 'Postcode is required'
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