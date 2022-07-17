const mongoose = require("mongoose");
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,maxlength:12,minlength:6},
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

AdminSchema.pre('save', async function(next){
  if(this.isModified('password')){
      this.password=await bcrypt.hash(this.password,12);
  

  }
  next();
})
module.exports = mongoose.model("Admin", AdminSchema);
