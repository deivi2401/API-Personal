const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));