const express = require('express');

const app = express();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));