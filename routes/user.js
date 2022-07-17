const router = require("express").Router();
const BuyedService = require("../models/BuyedServices");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const {
    verifyTokenAndAuthorization,
  } = require("./verifyToken");
  router.put('/updateUser/:uid',verifyTokenAndAuthorization, function(req, res, next) {
 
    User.findOneAndUpdate({ _id: req.params.uid },{$set:req.body},{new:true},
  function(error, results) {
  
  if (error) {
      return next(error);
  }
  const accessToken =jwt.sign(
    {
        id: req.params.uid,
       
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
);
const { password, ...others } = results._doc;  
console.log(results);
res.status(200).json({...others, accessToken});
});
  })

router.post("/buyservice/:uid/:sid",verifyTokenAndAuthorization, async (req, res) => {

  // if(!await BuyedService.findOne(req.body)){
     console.log("camera Already exist");
      const newBoughtService = new BuyedService({
       user:req.params.uid,
       service:req.params.sid,
     
      });
      console.log(req.body);
      try {
          const savedBoughtService=await newBoughtService.save();
          res.status(200).json({message:"Buy services Successfully"});
      } catch (err) {
          res.status(500).json({message:"fail"});
      }
  // }
  // else
  // res.status(422).json({message:"camera Already exist"});

  // }
    });
  
router.get('/ViewAllBuyedServices/:uid',verifyTokenAndAuthorization,async (req, res) => {
 BuyedService.find({ user: req.params.uid }).select('service').populate('service',['title','description','price']).exec(function(error, results) {
      if (error) {
          return next(error);
      }
      res.send(results);
  });
});

module.exports = router;
