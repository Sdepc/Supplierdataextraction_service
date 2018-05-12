var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');



/* GET home page.*/
router.get('/contractnames', function(req, res, next) {

  var testFolder = './output/';
  var fs = require('fs');
  
  res.setHeader('Content-Type', 'application/json');
  var obj =[];
  fs.readdirSync(testFolder).forEach(file => {
    
    obj.push(path.basename(file,'.txt'));

  });
  
res.write(JSON.stringify(obj, null, 3));
 });
    


 router.get('/contractcontent', function(req,res){
  var http = require('http');
   var fs = require('fs');
   //var path = require('path');
 var test1 = './output/';
 
 
 var a = req.query.filename;
 
 //var a = '1525697142871Contract-A';
 console.log(a);
 fileExt = 'txt';
 b = a + '.' + fileExt;
 c = test1 + b;
 console.log(b);
 fs.readdir(test1, function(err, items){
       console.log(items);
 fs.exists(c, function(exists){
     console.log("file exists ? " , exists);
     var file = fs.readFileSync(c, "utf8");
     console.log(file);
     res.writeHead(200,{"Content-Type" : "text/html"});
     res.write('<html><p>'+file+'</p></html>');
 
 
 });
 });
 });
 


   router.post('/purge', function (req, res, next) {
    console.log('POST');
    console.log(req.body);
    var directory = 'output';
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
          res.send('successfully deleted');
        });
      }
    });
  });
  


  //purge code


  function daysDiff(now, fileDate) {
    var timeDiff = Math.abs(now.getTime() - fileDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function deleteOlderFiles(entries) {
    var i;
    var currentDate = new Date();
    for (i=0; i<entries.length; i++) {
        if(entries[i].isFile) {
            entries[i].file(function(file) {
                if(daysDiff(currentDate, file.lastModifiedDate) > 30) {
                    entries[i].remove(function(){
                        console.log("File removed");
                    }, function(){
                        console.log("Error while removing file");
                    });
                }
            }), error);
        }
    }
}

function fail(error) {
    alert("Failed during operations: " + error.code);
    
}

// Get a directory reader
var directoryEntry = new DirectoryEntry(name, '/dell');
var directoryReader = directoryEntry.createReader();

// Get a list of all the entries in the directory
directoryReader.readEntries(deleteOlderFiles, fail);
_

//date purge code


var fs = require('fs')
var util = require('util');

var stats = fs.statSync("C:\\Users\\sk00507400\\Desktop\\v1.txt");
var mtime = new Date(util.inspect(stats.mtime));


var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
console.log("current time : " +formatted);
console.log("file modified time : " +mtime);








module.exports = router;
