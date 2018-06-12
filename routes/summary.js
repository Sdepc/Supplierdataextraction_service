/*import modules*/
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var http = require('http');

/* GET Contract Names*/
router.get('/contractnames', function (req, res, next) {
  var input_path = './output/';
  var obj = [];
  fs.readdirSync(input_path).forEach(file => {
    obj.push(path.basename(file, '.html'));
  });
  res.send(JSON.stringify(obj));
});


/* GET Contract Content */
router.get('/contractcontent', function (req, res) {
  var input_path = './output/';
  var input = req.query.filename;
  var fileExtension = 'html';
  var file_name = input + '.' + fileExtension;
  var total_path = input_path + file_name;
  fs.readdir(input_path, function (err, items) {
    fs.exists(total_path, function (exists) {
      var file = fs.readFileSync(total_path, "utf8");
      var data = {
        "Data": file
      }
      res.send(JSON.stringify(data));
    });
  });
});

/* Post Purge*/
router.post('/purge', function (req, res) {
  var outputpath = './output/';
  var outputpath1 = './processed/';
  var inputfiles = req.body.Files;
  console.log(inputfiles);
  if (req.query.days == "true") {
    console.log(hi);
    //delete the 30 days older files
    olderdaysfiles(outputpath);
    deleteFiles(outputpath, inputfiles);
    deleteProcessed(outputpath1, inputfiles);
  } else {
    console.log("hi");
    deleteFiles(outputpath, inputfiles);
    deleteProcessed(outputpath1, inputfiles);
  }

  function olderdaysfiles(dirPath) {
    // var dirPath =  './output/';
    fs.readdir(dirPath, function (err, files) {
      if (err) return console.log(err);
      files.forEach(function (file) {
        var filePath = dirPath + file;
        console.log(filePath)
        fs.stat(filePath, function (err, stat) {
          if (err) return console.log(err);
          var livesUntil = new Date();
          //setting hours i.e.(24*30) for purging 30 days older files
          livesUntil.setHours(livesUntil.getHours() - 720);
          if (stat.ctime < livesUntil) {
            fs.unlink(filePath, function (err) {
              if (err) return console.log(err);
            });
          }
        });
      });
      res.send({
        "Message": "Sucessfully deleted files"
      });
    });
  }

  function deleteFiles(dirname, files, callback) {
    fileExt = 'html';
    for (var i = 0; i < files.length; i++) {
      fs.unlink(dirname + files[i] + '.' + fileExt, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
    //res.send({ "Message": "Sucessfully deleted files" });
  }

  function deleteProcessed(dirname, files, callback) {
    fileExt = 'pdf';
    for (var i = 0; i < files.length; i++) {
      fs.unlink(dirname + files[i] + '.' + fileExt, function (err) {
        if (err) {
          //console.error(err);
        }
      });
    }
    res.send({
      "Message": "Sucessfully deleted files"
    });
  }
});

module.exports = router;