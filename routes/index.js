var express = require('express');
var router = express.Router();
var Teacher = require('../models/teacher');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});
router.post('/addteacher', function(req, res, next) {
  Teacher.create(req.body)
      .then((teacher) => {
          console.log('Teacher has been Added ', teacher);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(teacher);
      }, (err) => next(err))
      .catch((err) => next(err));
});
router.get('/teachers', function(req, res, next) {
  Teacher.find().sort('name').exec(function(error, results) {
      if (error) {
          return next(error);
      }
      // Respond with valid data
      res.json(results);
  });
});
module.exports = router;
