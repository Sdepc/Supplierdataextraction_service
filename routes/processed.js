var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var oembed = require("oembed-auto");
var bodyParser = require("body-parser");
var PythonShell = require('python-shell');

var fs = require('fs');
var mv = require('mv');
var fs1 = require('fs-extra')

app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




router.post('/moveFile', function (req, res, next) {
    //  function moveFile(req,res,next){
    var dirpath = './inputs/';
    var dir2 = './input_processing';
    var files = req.body.files;
    
    console.log(files);
    
    console.log(files);

    files.forEach(function (file) {
        //console.log(files)
        console.log(file);

        var fileExtension = 'pdf';
        var file_name = file + '.' + fileExtension;

        console.log(file_name);
        //console.log(file_name);

        var total_path = dirpath + file_name;
        console.log(total_path);
        
        var moveFile = (file_name, dir2) => {
            //include the fs, path modules
            var fs = require('fs');
            var path = require('path');

            //gets file name and adds it to dir2
            var f = path.basename(file_name);
            var dest = path.resolve(dir2, f);

            fs.rename(file_name, dest, (err) => {
                if (err) throw err;
                else console.log('Successfully moved');


            });
        };
        //move file1.htm from 'test/' to 'test/dir_1/'
        moveFile(total_path, dir2);

    });
    res.end("Successfully moved");
});



router.post('/pythonscripts', function (req, res, next) {

   


            res.setHeader('content-type', 'text/plain');
            res.end("in process");
            // Do something
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
                    updatefilesjson();
                   
            
                console.log('finished');
                deletefilesjson();
               
                }  
                
            });
            
              





        });




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
            res.setHeader('content-type', 'text/plain');
            res.end("updated");

        }

        
      

        function deletefilesjson(removeFileName) {
            var data = fs.readFileSync('./database/files.json');
            var json = JSON.parse(data);
            var files = json.files;
            json.files = files.filter((file) => { return file.filename !== removeFileName });
            fs.writeFileSync('./database/files.json', JSON.stringify(json, null));
            console.log('deleted');
            res.setHeader('content-type', 'text/plain');
            res.send("processed");
        }











module.exports = router;