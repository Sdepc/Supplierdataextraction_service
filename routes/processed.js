var express = require("express");
var app = express();
var router = express.Router();
var oembed = require("oembed-auto");
var bodyParser = require("body-parser");
var PythonShell = require('python-shell');
var files = require('./files');
var fs = require('fs');

app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.post('/pythonscripts', function (req, res, next) {
    //filenames as input
    var input_path = './inputs/';
    var input = req.query.filename;
    console.log(input);
    var fileExtension = 'pdf';
    var file_name = input + '.' + fileExtension;
    var total_path = input_path + file_name;

    if (fs.existsSync(total_path)) {
        // Do something
        var myPythonScriptPath = './scripts/P_Extract_Discounts.py';
        console.log(myPythonScriptPath);
        var pyshell = new PythonShell(myPythonScriptPath);
        pyshell.on('message', function (message) {
            console.log(message);
        });
        pyshell.end(function (err) {
            if (err) {
                updatefilesjson();
            }
            console.log('finished');
            deletefilesjson();
        });
    }
});


function deletefilesjson(removeFileName) {
    var data = fs.readFileSync('./database/files.json');
    var json = JSON.parse(data);
    var files = json.files;
    json.files = files.filter((file) => { return file.filename !== removeFileName });
    fs.writeFileSync('./database/files.json', JSON.stringify(json, null));
    console.log('deleted');
}

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

module.exports = router;