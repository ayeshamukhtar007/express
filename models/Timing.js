const mongoose = require("mongoose");
const TimingSchema = new mongoose.Schema(
  {

    activeStart: { 
      type:String
      
     
    },       
    activeEnd:{
        type:String
    },
    slientStart:{     
      type:String
    }
,
    slientEnd:{     
      type:String
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model("Timing",TimingSchema);
