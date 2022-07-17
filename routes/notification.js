const router = require("express").Router();
const Alert = require("../models/Alert");
const {
    verifyTokenAndAuthorization,
   } = require("./verifyToken");

router.post("/addNotification/:uid",verifyTokenAndAuthorization, async (req, res) => {  
 
      const newAlert = new Alert({
        title:req.body.title,
        camera:req.params.cid,
        
      });
      try {
          const savedAlert=await newAlert.save();
          res.status(200).json({message:"alert register"});
      } catch (err) {
          res.status(500).json({message:"Registration fail"});
      }
    });
router.delete('/delCamera/:cid/:uid', function(req, res, next) {
  Camera.deleteOne({ _id: req.params.cid }, function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json({message:"Delete sucessfully"});
  });
});
module.exports = router;
