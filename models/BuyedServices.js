const mongoose = require("mongoose");
const BuyedServiceSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Types.ObjectId, ref: 'Service'},
    user:{  type: mongoose.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }
)
module.exports = mongoose.model("BuyedService", BuyedServiceSchema);
