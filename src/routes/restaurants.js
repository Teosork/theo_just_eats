const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const { postcode } = req.query;

    if (!postcode) {
        return res.status(400).json({
            error: 'Postcode is required'
        });
    }

    res.json({
        message: 'Restaurants route is working',
        postcode
    });
});

module.exports = router;