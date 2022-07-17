const router = require("express").Router();
const Alert = require("../models/Alert");
const {
    verifyTokenAndAuthorization,
   } = require("./verifyToken");
  
//Add Camera Details
router.post("/addalert/:uid",verifyTokenAndAuthorization, async (req, res) => {  
 
      const newAlert = new Alert(req.body);
      try {
          const savedAlert=await newAlert.save();
          res.status(200).json({message:"alert register"});
      } catch (err) {
          res.status(500).json({message:"Registration fail"});
      }
    });
//UPDATE
router.put("/updateCamera/:cid/:uid", verifyTokenAndAuthorization, async (req, res) => {
        try {
          const updatedCamera = await Camera.findOneAndUpdate({ _id:req.params.cid}
            ,{$set:{name:req.body.name}},
            { new: true }
          );
          res.status(200).json(updatedCamera);
        } catch (err) {
          res.status(500).json(err);
        }
});   
router.get('/GetAlert/:uid',verifyTokenAndAuthorization,async (req, res) => {
 Alert.find().exec(function(error, results) {
      if (error) {
          throw(error);
      }
      console.log(results)
      res.status(200).json(results);

  });
});

// router.get('/CountAllAlert/:uid',verifyTokenAndAuthorization,async (req, res) => {
//   Alert.aggregate([
//     {'$group':{'_id':'$camera',count:{'$sum':1}}}
//   ],function(error, results) {
//     if (error) {
//         throw(error);
//     }
//     res.status(200).json(results);

// });
//  });
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
