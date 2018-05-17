var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var jsonfile = require('jsonfile');
var arrayCompare = require("array-compare")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './inputs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });
var files_data = [];

router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    var userName = req.query.username;
    console.log(userName);
    for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i].originalname)
        savefilesjson(req.files[i].originalname, userName)
    }
    res.send(req.files);
});

/* GET Files listing. */
router.get('/getfilescontent', function (req, res, next) {
    var json = JSON.parse(fs.readFileSync('./database/files.json', 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
});

//define global var
var global = {
};


function savefilesjson(filename, Name) {
    var input =
        [
            {
                "id": 1,
                "filename": filename,
                "uploaded_by": Name,
                "date_of_upload": Date.now(),
                "status": "To be Processed"
            }
        ]
    if (global.hasOwnProperty(filename)) {
        console.log("duplicate file ")
    } else {
        global[filename] = {
            "id": 1,
            "filename": filename,
            "uploaded_by": Name,
            "date_of_upload": Date.now(),
            "status": "To be Processed"
        };

        files_data = files_data.concat(input);
        var json_data_file = { "files": files_data };

        jsonfile.writeFile("./database/files.json", json_data_file, function (err) {
            if (err) throw err;
        });
    }
}

//updatefilesjson('1525697142871Contract-A.pdf','failed');
//deletefilesjson('1525754596908Contract-B.pdf');
function updatefilesjson(UpdateFilename, Status) {
    var data = fs.readFileSync('./database/files.json', 'utf8');
    var json = JSON.parse(data);
    for (j in json) {
        for (y in json[j]) {
            if (json[j][y].filename === UpdateFilename) {
                json[j][y].status = Status
                var total_data = json[j][y].status
            }
        }
    }
    fs.writeFileSync('./database/files.json', JSON.stringify(json), null);
    console.log('updated');
}


function deletefilesjson(removeFileName) {
    var data = fs.readFileSync('./database/files.json');
    var json = JSON.parse(data);
    var files = json.files;
    json.files = files.filter((file) => { return file.filename !== removeFileName });
    fs.writeFileSync('./database/files.json', JSON.stringify(json, null));
    console.log('deleted');
}

module.exports = router;