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



 router.post('/oldfiles', function (req, res, next) {
    console.log('POST');
    console.log(req.body);
//purging older files
var fs = require('fs')
var dirPath =  './output/';
//var file = '/Contract-1.pdf'
fs.readdir( dirPath, function( err, files ) {
    if ( err ) return console.log( err );
    files.forEach(function( file ) {
        var filePath = dirPath + file;
        fs.stat( filePath, function( err, stat ) {
            if ( err ) return console.log( err );
            var livesUntil = new Date();
//setting hours i.e.(24*30) for purging 30 days older files
            livesUntil.setHours(livesUntil.getHours() - 720 );
            if ( stat.ctime < livesUntil ) {
                fs.unlink( filePath, function( err ) {
                    if ( err ) return console.log( err );
                });
              }
				console.log("sucessfully deleted the older files");
            });
        });
    });
  });


module.exports = router;
