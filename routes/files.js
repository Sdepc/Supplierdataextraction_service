/*import modules*/
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var jsonfile = require('jsonfile');
var arrayCompare = require("array-compare");
var database = require('./dbconnection');
/*uploaded files store in input folder*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './inputs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
});
var files_data = [];

/*POST upload files*/
router.post("/upload", upload.array("uploads[]", 20), function (req, res) {
    var Message = [];
    var userName = req.query.username;
    //console.log(userName);
    for (var i = 0; i < req.files.length; i++) {
        filename = req.files[i].originalname;
        database.run(`INSERT INTO FILES(filename,uploaded_by,status,date_of_upload) VALUES(?,?,?,?)`, [req.files[i].originalname, userName, 'To be Processed', Date.now()], function (err) {
            if (err) {
                Message.push({
                    "Error_File_Name": filename
                })
            } else {
                // get the last insert id
                console.log(filename)
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                Message.push({
                    "Success_File_Name": filename
                })
            }
        });
    }
    setTimeout(function () {
        console.log("Message")
        res.send(Message);
    }, 1000);

});

/* GET Files listing. */
router.get('/getfilescontent', function (req, res, next) {
    database.serialize(() => {
        database.all(`SELECT * FROM FILES WHERE status IN ('To be Processed','In_process')`, (err, row) => {
            if (err) {
                console.error(err.message);
                res.send(err.message);
            }
            res.send(row);
        });
    });
});
/* Delete File. */
router.post('/deletefile', function (req, res) {
    console.log(req);
    var name = req.query.fname;
    console.log(name);
    database.run(`DELETE FROM FILES WHERE filename=?`, name, function (err) {
        if (err) {
            console.error(err.message);
            res.send(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
        res.send(`${this.changes}`)
    });
});
//define global var
var global = {};
var files_data;

function savefilesjson(filename, Name) {
    var input = [{
        "id": 1,
        "filename": filename,
        "uploaded_by": Name,
        "date_of_upload": Date.now(),
        "status": "To be Processed"
    }]
    if (global.hasOwnProperty(filename)) {
        //console.log("duplicate file ")
    } else {
        global[filename] = {
            "id": 1,
            "filename": filename,
            "uploaded_by": Name,
            "date_of_upload": Date.now(),
            "status": "To be Processed"
        };
        files_data = files_data.concat(input);
        var json_data_file = {
            "files": files_data
        };
        jsonfile.writeFileSync("./database/files.json", json_data_file, function (err) {
            if (err) throw err;
        });
    }
}




module.exports = router;