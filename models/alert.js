const mongoose = require("mongoose");
const AlertSchema = new mongoose.Schema(
  {

    title: { 
      type: String, 
      required: true,
     
    },
    description:{
        type:String
    },
    attachment: { 
        type: String
        
    }

  },
  { timestamps: true }
)
module.exports = mongoose.model("Alert", AlertSchema);
