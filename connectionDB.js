const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(con=>{
    console.log(`Mongo DB connected: ${con.connection.host}`.cyan.bold)
  }).catch(err=>{
    console.log(`DB Error! ${err}`.red.bgYellow.underline)
    process.exit(1)
  });	
};

module.exports = connectDB;
