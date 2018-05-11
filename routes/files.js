var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

var files_data=[];


/* GET Files listing. */
router.get('/getfilescontent', function (req, res, next) {
    var json = JSON.parse(fs.readFileSync('./new.json', 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    console.log(json);
    res.send(JSON.stringify(json));
    });
router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
});


router.post('/loadfilescontent', function (req, res, next) {
    //var table=[];
    var a = req.body.files;
    console.log(a);
    console.log("---Old data--- :"+files_data);
    files_data=files_data.concat(a);
    console.log("---New data--- :"+files_data);
    fs.writeFile('./database/files.json', files_data, function(err,data){
      if(err){
        return console.log(err);
      }
      console.log("done");
    });
    });


module.exports = router;
