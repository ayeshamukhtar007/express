const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt =require('bcryptjs');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//LOGIN

router.post('/login', async (req, res) => {
    const {email,password}=req.body;
    try{
        const user = await Admin.findOne(
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
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken,message:"login done"});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;
