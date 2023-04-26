const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var coponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  discount: { type: Number, required: true },
  expiary: { type: Date, required: true },
});

//Export the model
module.exports = mongoose.model("Copon", coponSchema);
