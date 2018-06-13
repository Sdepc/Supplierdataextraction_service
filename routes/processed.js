/*import modules*/
var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var oembed = require("oembed-auto");
var bodyParser = require("body-parser");
var PythonShell = require('python-shell');
var fs = require('fs');
var path = require('path');
var database = require('./dbconnection');

app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*POST to run Python scripts*/
router.post('/pythonscripts', function (req, res, next) {

    /*Function to move files from inputs folder to input_processing folder*/
    function moveFile(files) {
        var dirpath = './inputs/';
        var dir2 = './input_processing';
        console.log(files);
        files.forEach(function (file) {
            //console.log(file);
            //var fileExtension = 'pdf';
            var file_name = file.name;
            console.log(file_name);
            var total_path = dirpath + file_name;
            console.log(total_path);
            var data = (file_name, dir2) => {
                //gets file name and adds it to dir2
                var f = path.basename(file_name);
                var dest = path.resolve(dir2, f);
                fs.rename(file_name, dest, (err) => {
                    if (err) {} else {
                        console.log('Successfully moved');
                        var testFolder = './input_processing/';
                        fs.readdir(testFolder, (err, files) => {
                            files.forEach(file => {
                                //console.log(file);
                                updatefilesjson(file, "In_process"); //callback of updatefilesjson function
                            });
                        });
                    }
                });
            }
            data(total_path, dir2); //callback of data function
        });
    }

    /*Function to run python scripts*/
    function processData() {
        var myPythonScriptPath = './scripts/P_Extract_Discounts.py';
        //console.log(myPythonScriptPath);
        var pyshell = new PythonShell(myPythonScriptPath);
        pyshell.on('message', function (message) {
            console.log(message);
        });
        pyshell.end(function (err) {
            if (err) {
                var testFolder = './input_processing/';
                fs.readdir(testFolder, (err, files) => {
                    files.forEach(file => {
                        console.log(file);
                        updatefilesjson(file, "process_failed"); //callback of updatefilesjson function
                    });
                });
                backtrack(); //callback of bactrack function
            } else {
                var testFolder1 = './processed/';
                fs.readdir(testFolder1, (err, files) => {
                    files.forEach(file => {
                        console.log(file);
                        //updatefilesjson(file, "processed"); //callback of updatefilesjson function
                        deletefilesjson(file); //callback of deletefilesjson function


                    });
                })

            }

        });
    }

    /*Move data from input_processing folder to inputs*/
    function backtrack() {
        var dirpath = './input_processing/';
        var dir2 = './inputs/';
        var myfiles = [];
        var arrayOfFiles = fs.readdirSync('./input_processing/');
        arrayOfFiles.forEach(function (file) {
            myfiles.push(file);
            //console.log(myfiles);
            myfiles.forEach(function (file) {
                //console.log(file);
                var file_name = file;
                //console.log(file_name);
                var total_path = dirpath + file_name;
                //console.log(total_path);
                var f = path.basename(file_name);
                var dest = path.resolve(dir2, f);
                fs.rename('./input_processing/' + file_name, dest, (err) => {
                    if (err) {
                        //throw err;
                    } else {
                        console.log('Successfully moved');

                    }
                });
            });
        });
    }

    /*update json file*/
    function updatefilesjson(UpdateFilename, Status, callback) {
        let data = [Status, UpdateFilename];
        console.log(data);
        let sql = `UPDATE FILES SET status = ? WHERE filename = ?`;
        database.run(sql, data, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Row(s) updated: ${this.changes}`);
            }
        });
    }

    /*Delete json file after processing*/
    function deletefilesjson(removeFileName) {
        let filenamedata = removeFileName;
        // delete a row based on id
        database.run(`DELETE FROM FILES WHERE filename=?`, filenamedata, function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Row(s) deleted ${this.changes}`);
        });

        var message = {
            "Message": "Success"
        };
        res.send(message);
    }

    moveFile(req.body); //callback of moveFile function
    processData(); //callback of processData function
});

module.exports = router;