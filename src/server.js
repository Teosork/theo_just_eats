const express = require('express');
const path = require('path');
const restaurantsRouter = require('./routes/restaurants');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/utils', express.static(path.join(__dirname, 'utils')));

app.use('/api/restaurants', restaurantsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});