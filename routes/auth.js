const router = require("express").Router();
const User = require("../models/User");
const bcrypt =require('bcryptjs');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    if(!await User.findOne({email:req.body.email})){
        const user = new User(req.body);
         
          try {
            const savedUser = await user.save();
            res.status(201).json({message:"user register"});
          } catch (err) {
            console.log(err)
            res.status(500).json("user fail");
          }
    }
    else{
         res.status(422).json({error:"user existst"})
    }
  
});

//LOGIN

router.post('/login', async (req, res) => {
    if(req.body!=null){
    const {email,password}=req.body;
    try{
        const user = await User.findOne(
            {
                email: email
            }
           
        );
        
        if(!user) return res.status(401).json("Wrong credentials!");
        // const hashedPassword = CryptoJS.AES.decrypt(
        //     user.password,
        //     process.env.PASS_SEC
        // );


        // const originalPassword =hashedPassword.toString(CryptoJS.enc.Utf8);
        
        const isMatch=await bcrypt.compare(req.body.password,user.password);
       
        if(!isMatch) return res.status(401).json("Wrong credentials!");
        

        const accessToken =jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken,message:"login done"});

    }catch(err){
        res.status(500).json(err);
    }
    }
    else{
                res.status(500).json(err);

    }
});

module.exports = router;
