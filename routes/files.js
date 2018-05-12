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
    var a = req.body;
    console.log(a);
    var element = JSON.stringify(a);
       console.log(element);
         fs.readFile("./database/files.json", 'utf8', function(err, json) {
             var array = JSON.parse(JSON.stringify(json));
             console.log("old data:---" +array);
             //var array = new Array();
             var b = array.concat(element);
             var c = JSON.parse(JSON.stringify(b));
             console.log("new data:----" +c);
             fs.appendFile("./database/files.json", c, function(err){
               if (err) throw err;
               console.log("saved");
             });
        console.log("The file was saved!");
             });
res.end('{"msg": "success"}');
     });

router.post('/comparejsons', function (req, res, next) {
    //obj1={a:1,b:2,c:3,d:4};
//obj2={a:2,b:5,c:3,d:4};

var obj1 = "./database/files.json";
var obj2 = "./database/file.json";
function findKeysByValue(obj, v) {
    var results = [];
    for (var k in obj2) {
        if (obj2.hasOwnProperty(k) && v == obj1[k]) {
            results.push(k);
        }
    }
    return results;
}
console.log(findKeysByValue(obj2, obj1['status']));


});



module.exports = router;
