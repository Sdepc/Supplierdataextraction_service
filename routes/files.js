var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var jsonfile = require('jsonfile');
var arrayCompare = require("array-compare")
var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, './inputs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

var files_data = [];


/* GET Files listing. */
router.get('/getfilescontent', function (req, res, next) {
    var json = JSON.parse(fs.readFileSync('./database/files.json', 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    //console.log(json);
    res.send(JSON.stringify(json));
});
router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    //console.log('files', req.files);
    res.send(req.files);
});



router.put('/updatefilesjson', function (req, res, next) {
    var input = req.body.files;
  


});




router.post('/savefilesjson', function (req, res, next) {
    var input = req.body.files;
    //console.log(input);
    files_data = files_data.concat(input);
    var json_data_file = { "files": files_data };

    jsonfile.writeFile("./database/files.json", json_data_file, function (err) {
        if (err) throw err;
        //console.log("saved");
    });
    res.end('{"msg": "success"}');
});









router.post('/deletefilesjson',  function  (req,  res,  next) {
var removeUser = req.query.filename;
var data = fs.readFileSync('./database/files.json');
var json = JSON.parse(data);
console.log(json)
var files = json.files;
console.log(files);
json.files = files.filter((file) => { return file.filename !== removeUser });
console.log(json.files);
fs.writeFileSync('./database/files.json', JSON.stringify(json, null));
res.end('{"msg": "success"}');
});





module.exports = router;
