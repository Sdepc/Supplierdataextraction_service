var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var oembed = require("oembed-auto");
var bodyParser = require("body-parser");
var PythonShell = require('python-shell');

var fs = require('fs');
var mv = require('mv');
var fs1 = require('fs-extra')
var path = require('path');


app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



function moveFile(files) {
    var dirpath = './inputs/';
    var dir2 = './input_processing';
    //var files = ["Contract-1","Contract-2"]
    console.log(files);
    files.forEach(function (file) {
        console.log(file);
        var fileExtension = 'pdf';
        var file_name = file + '.' + fileExtension;
        console.log(file_name);
        var total_path = dirpath + file_name;
        console.log(total_path);
        var data = (file_name, dir2) => {
            //include the fs, path modules

            //gets file name and adds it to dir2
            var f = path.basename(file_name);
            var dest = path.resolve(dir2, f);
            fs.rename(file_name, dest, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    console.log('Successfully moved');
                    updatefilesjson(UpdateFilename,"in process");
                   //processData();
                   
                }
            });
        };
        data(total_path, dir2);
        
    });
}

function processData() {

    var myPythonScriptPath = './scripts/P_Extract_Discounts.py';
    console.log(myPythonScriptPath);
    var pyshell = new PythonShell(myPythonScriptPath);
    pyshell.on('message', function (message) {
        console.log(message);
        //res.setHeader('content-type', 'text/plain');
        //res.send("to be processed");
    });
    pyshell.end(function (err) {

        
        if (err) {


            //updatefilesjson(UpdateFilename,"process failed");
            updatefilesjson();

        }
        else{
        deletefilesjson();
        }
});
}


        


//});
//});



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
    
    //data(updateFilename,dir2);
    console.log('updated');

    fs1.move('./input_processing/', './inputs', function (err) {
         if (err) return console.error(err)
         console.log("success!")
        }) 

    //res.setHeader('content-type', 'text/plain');
    //res.end("updated");

}




function deletefilesjson(removeFileName) {
    var data = fs.readFileSync('./database/files.json');
    var json = JSON.parse(data);
    var files = json.files;
    json.files = files.filter((file) => { return file.filename !== removeFileName });
    fs.writeFileSync('./database/files.json', JSON.stringify(json, null));
    console.log('deleted');
    //return(json)
    // res.setHeader('content-type', 'text/plain');
    //res.send("processed");
    res.write("processed");
}

    

/*function backtrack(files) {
    var dirpath = './input_processing/';
    var dir2 = './inputs';
    var files = ["Contract-1","Contract-2"]
    console.log(files);
    files.forEach(function (file) {
        console.log(file);
        var fileExtension = 'pdf';
        var file_name = file + '.' + fileExtension;
        console.log(file_name);
        var total_path = dirpath + file_name;
        console.log(total_path);
        var data = (file_name, dir2) => {
            //include the fs, path modules

            //gets file name and adds it to dir2
            var f = path.basename(file_name);
            var dest = path.resolve(dir2, f);
            fs.rename(file_name, dest, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    console.log('Successfully moved');
                    //updatefilesjson(UpdateFilename,"in process");
                    //processData();
                   
                }
            });
        };
        data(total_path, dir2);
        
    });*/
//}


router.post('/pythonscripts', function (req, res, next) {

    moveFile(req.body.files);
    processData();

});










module.exports = router;