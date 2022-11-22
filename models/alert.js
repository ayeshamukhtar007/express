const mongoose = require("mongoose");
const AlertSchema = new mongoose.Schema(
  {

    user: { 
      type: mongoose.Types.ObjectId,
      ref: 'User'
     
    },
    description:{
        type:String
    },
    camera:{
      type:String
    }

  },
  { timestamps: true }
)
module.exports = mongoose.model("Alert", AlertSchema);
