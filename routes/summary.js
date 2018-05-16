var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET Contract Names*/
router.get('/contractnames', function (req, res, next) {
  var input_path = './output/';
  var fs = require('fs');
  res.setHeader('Content-Type', 'application/json');
  var obj = [];
  fs.readdirSync(input_path).forEach(file => {
    obj.push(path.basename(file, '.txt'));
  });
  res.write(JSON.stringify(obj, null, 3));
});


/* GET Contract Content */
router.get('/contractcontent', function (req, res) {
  var http = require('http');
  var fs = require('fs');
  var input_path = './output/';
  var input = req.query.filename;
  var fileExtension = 'html';
  var file_name = input + '.' + fileExtension;
  var total_path = input_path + file_name;

  fs.readdir(input_path, function (err, items) {
    fs.exists(c, function (exists) {
      var file = fs.readFileSync(c, "utf8");
      res.send(file);
    });
  });
});

/* Post Purge*/
router.post('/purge', function (req, res) {
  var outputpath = './output/';
  var files = req.body.files;
  var days = req.body.days;
  if (days == true) {
    //delete the 30 days older files
    olderdaysfiles(outputpath);
    deleteFiles(outputpath, files);
  }
  else {
    deleteFiles(outputpath, files);
  }

  function olderdaysfiles(dirPath) {
    // var dirPath =  './output/';
    fs.readdir(dirPath, function (err, files) {
      if (err) return console.log(err);
      files.forEach(function (file) {
        var filePath = dirPath + file;
        fs.stat(filePath, function (err, stat) {
          if (err) return console.log(err);
          var livesUntil = new Date();
          //setting hours i.e.(24*30) for purging 30 days older files
          livesUntil.setHours(livesUntil.getHours() - 720);
          if (stat.ctime < livesUntil) {
            fs.unlink(filePath, function (err) {
              console.log("sucessfully deleted the older files");
              if (err) return console.log(err);
            });
          }
        });
      });
    });
  }
  function deleteFiles(dirname, files, callback) {
    fileExt = 'txt';
    for (var i = 0; i < files.length; i++) {
      fs.unlink(dirname + files[i] + '.' + fileExt, function (err) {
        if (err) {
          console.error(err);
          console.log('File has been Deleted');
        }
      });
    }
  }
});

module.exports = router;
