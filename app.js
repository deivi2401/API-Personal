const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv://dvid2401:"+ process.env.MONGO_ATLAS_PWD+"@node-rest-shop.4gt2mzb.mongodb.net/"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.methodd === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
});

app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
