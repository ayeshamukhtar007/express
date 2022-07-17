const router = require("express").Router();
const Camera = require("../models/Camera");
var ip = require("ip"); 
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
//Add Camera Details
router.post("/addcamera/:uid",verifyTokenAndAuthorization, async (req, res) => {  
  try{
     const ipAddress=ip.toBuffer(req.body.ip_address);
     if(!await Camera.findOne({_ip_address_buf:{$eq:ipAddress}})){
      console.log(req.body.ip_address)
       const newCamera = new Camera({
         name:req.body.name,
         user:req.params.uid,
         ip_address:req.body.ip_address,
         videoLink:"https://"+req.body.ip_address+":8080/video"
       });
       
       try {
           const savedCamera=await newCamera.save();
           res.status(200).json({message:"camera register"}); 
       } catch (err) {
           res.status(500).json({message:"Registration fail"});
       }
   }
   else
   res.status(422).json({message:"camera Already exist"});
 
  }
  catch{
    res.status(500).json({message:"ip Address is invalid"});

  }
 
  });
//UPDATE
router.put("/updateCamera/:cid/:uid", verifyTokenAndAuthorization, async (req, res) => {
      console.log(req.body.status)  
  try {
          const updatedCamera = await Camera.findOneAndUpdate({ _id:req.params.cid}
            ,{name:req.body.name,
              status:req.body.status,
              mode:req.body.mode,
            }
          );
          res.status(200).json(updatedCamera);
        } catch (err) {
          res.status(500).json(err);
        }
});   
router.get('/ViewAllCameras/:uid',verifyTokenAndAuthorization,async (req, res) => {
 Camera.find({ user: req.params.uid }).select('name').select('mode').select('status').select('videoLink').exec(function(error, results) {
      if (error) {
          return next(error);
      }
     res.status(200).json(results);

  })  ;
});
router.get('/CountCamera/:uid',verifyTokenAndAuthorization,async (req, res) => {
  Camera.find({user: req.params.uid }).count().exec(function(error, results) {
       if (error) {
           return next(error);
       }
       
       res.status(200).json(results);
   })  ;
 });
 router.get('/CountPairedCamera/:uid',verifyTokenAndAuthorization,async (req, res) => {
  Camera.find({user: req.params.uid } &&{status:'paired'}).count().exec(function(error, results) {
       if (error) {
           return next(error);
       }
       res.status(200).json(results);

   })  ;
 });
 router.get('/CountUnpairedCamera/:uid',verifyTokenAndAuthorization,async (req, res) => {
  Camera.find({user: req.params.uid } &&{status:'unpaired'}).count().exec(function(error, results) {
       if (error) {
           return next(error);
       }
       res.status(200).json(results);

   })  ;
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
