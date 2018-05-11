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
    var json = JSON.parse(fs.readFileSync('./database/files.json', 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    console.log(json);
    res.send(JSON.stringify(json));
    });
router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
});


router.post('/loadfilescontent', function (req, res, next) {
    var a = req.body.files;
    console.log(a);
    var element = JSON.stringify(a);
       console.log(element);
         fs.readFile("./database/files.json", 'utf8', function(err, json) {
             var array = json;
             console.log(array);
             var b = array.concat(element);
             console.log(b);
             fs.appendFile("./new.json", b, function(err){
               if (err) throw err;
               console.log("saved");
             });
        console.log("The file was saved!");
             });
res.end('{"msg": "success"}');
     });

module.exports = router;
