const mongoose = require("mongoose");
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
var ipAddressPlugin = require("mongoose-ip-address");
const CameraSchema = new mongoose.Schema(
  {
   
    name: { 
      type: String, 
      required: true,
      unique:true
    },
    user:{ 
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    mode: { type: String,default: "silent"},
    status: { type: String,default: "unpaired"},  
    videoLink: {type: String},

  },
  { timestamps: true }
)
CameraSchema.plugin(ipAddressPlugin, {fields: ["ip_address"]});
module.exports = mongoose.model("Camera", CameraSchema);
