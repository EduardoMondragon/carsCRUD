const express = require('express');
const app = express();
const CarsRoutes = require('./routes/cars');
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require('./connectionDB');

// connecting to mongo db
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// application routes
app.use('/cars',CarsRoutes);

// server running on port :
app.listen(3000);