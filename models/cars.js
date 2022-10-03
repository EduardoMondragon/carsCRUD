const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
  {
    ownerId: { type: String, required: [true, "OwnerId is a required field"] },
    vin: { type: String, required: [true, "vin is a required field"] },
    make: { type: String, required: [true, "MAKE is a required field"] },
    model: { type: String, required: [true, "MODEL is a required field"] },
    year: { type: Number, required: [true, "YEAR is a required field"] },
    miles: { type: Number, required: false,default:0 },
    color: { type: String, required: false, default:'not specified' },
  },
  {
    minimize: false,
	timestamps: true,
    collection:"cars"
  }
);

module.exports = mongoose.model("CarModel", CarSchema);
