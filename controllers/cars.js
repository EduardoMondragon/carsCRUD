const CarModel = require("../models/cars");
const asyncHandler = require("express-async-handler");

// ==============================
// GET CARS
const getCars = async (req, res) => {
  CarModel.find({}, function (err, result) {
    if (err) {
      res.status(404).json({ ok: false, error: err });
      throw new Error(`${err}`.red.bgYellow);
    } else {
      res.status(200).json({ ok: true, cars: result });
    }
  });
};

// ==============================
// CREATE CAR
const addNewCar = async (req, res) => {
  console.log("req body", req.body);
  const { ownerId, vin, make, model, year, miles, color } = req.body;

  // verify if required data is unfilled
  if (!ownerId || !make || !model || !year || !vin) {
    res.status(400).json({
      error: "ownerId, make, model and year, vin, are required fields.",
    });
    throw new Error(
      "ownerId, make, model and year, vin, are required fields.".red.bgYellow
    );
  }

  // // Check if car exist
  const carExist = await CarModel.findOne({ vin });

  if (carExist) {
    res.status(400).json({ error: "car already exist." });
    throw new Error("car already exist.".red.bgYellow);
  }
  //  CarModel info to be sent
  const car = {
    ownerId,
    vin,
    make,
    model,
    year,
    miles,
    color,
  };

  CarModel.create(car, function (err) {
    if (err) {
      // console.log(err);
      return res.status(400).json({ error: err.message });
    }
    // saved!
    return res.status(201).json({ message: "car added successfully", car });
  });
};

// ==============================
// UPDATE CAR
const updateCar = async (req, res) => {
  console.log("req body", req.body);
  const { vin, make, model, year, miles, color } = req.body;

  // verify if required data is unfilled
  if (!vin) {
    res
      .status(400)
      .json({ error: "vin is required data to modify the document." });
    throw new Error(
      "vin is required data to modify the document.".red.bgYellow
    );
  }

  const carModified = {
    make,
    model,
    year,
    miles,
    color,
  };

  // // Check if car exist
  const carExist = await CarModel.findOne({ vin });

  if (!carExist) {
    res.status(404).json({ ok: false, error: "car doesnt exist." });
    throw new Error("car doesnt exist.".red.bgYellow);
  }

  CarModel.findOneAndUpdate({ vin }, { $set: carModified })
    .then((response) => {
      res
        .status(200)
        .json({ ok: true, message: "modified successfully", car: response });
    })
    .catch((error) => {
      res.status(500).json({ ok: false, error });
    });
};

// ==============================
// DELETE CAR
const deleteCar = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { vin } = req.body;

    // // Check if car exist
    const carExist = await CarModel.findOne({ vin });

    if (!carExist) {
      res.status(404).json({ ok: false, error: "car doesnt exist." });
      throw new Error("car doesnt exist.".red.bgYellow);
    }

    await CarModel.deleteOne({ vin });

    res.status(200).json({
      ok: true,
      message: `car with vin : ${vin}, has been deleted succesfully`,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  getCars,
  addNewCar,
  updateCar,
  deleteCar,
};
