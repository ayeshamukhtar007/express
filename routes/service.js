const router = require("express").Router();
const Services = require("../models/Services");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
//Add Services Details
router.post("/addservice", verifyTokenAndAdmin, async (req, res) => {   

  if(!await Services.findOne(req.body)){
   
      const newService = new Services(req.body);
      console.log(req.body);
      try {
          const savedService=await newService.save();
          res.status(200).json({message:"services added successfully"});
      } catch (err) {
          res.status(500).json({message:"fail"});
      }
  }
  else
  res.status(422).json({message:"service Already exist"});

  });
//UPDATE
router.put("/updateService/:sid", verifyTokenAndAdmin, async (req, res) => {
        try {
          const updatedService = await Services.findOneAndUpdate({ _id:req.params.sid}
            ,{$set:{
              title:req.body.title,
              description:req.body.description,
              price:req.body.price,
            }},
            { new: true }
          );
          res.status(200).json(updatedService);
        } catch (err) {
          res.status(500).json(err);
        }
});   
router.get('/ViewAllServices',verifyToken,async (req, res) => {
Services.find().select('title').select('description').select('price').select('ratings').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      res.send(results);
  });
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
