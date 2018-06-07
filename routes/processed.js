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
app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: false }));
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
                    if (err) {
                    }
                    else {
                        console.log('Successfully moved');
                        var testFolder = './input_processing/';
                        fs.readdir(testFolder, (err, files) => {
                            files.forEach(file => {
                                //console.log(file);
                                updatefilesjson(file, "In_process");//callback of updatefilesjson function
                            });
                        });
                    }
                });
            }
            data(total_path, dir2);//callback of data function
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
                        updatefilesjson(file, "process_failed");//callback of updatefilesjson function
                    });
                });
                backtrack();//callback of bactrack function
            }
            else {
                var testFolder1 = './processed/';
                fs.readdir(testFolder1, (err, files) => {
                    files.forEach(file => {
                        console.log(file);
                        //updatefilesjson(file, "processed");//callback of updatefilesjson function
                        deletefilesjson(file);//callback of deletefilesjson function


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
                    }
                    else {
                        console.log('Successfully moved');

                    }
                });
            });
        });
    }

    /*update json file*/
    function updatefilesjson(UpdateFilename, Status, callback) {
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
    }

    /*Delete json file after processing*/
    function deletefilesjson(removeFileName) {
        var data = fs.readFileSync('./database/files.json');
        var json = JSON.parse(data);
        var files = json.files;
        json.files = files.filter((file) => { return file.filename !== removeFileName });
        fs.writeFileSync('./database/files.json', JSON.stringify(json, null));
        console.log("deleted");
       var message={"Message":"Success"};
        res.send(message);
    }

    moveFile(req.body);//callback of moveFile function
    processData();//callback of processData function
});

module.exports = router;