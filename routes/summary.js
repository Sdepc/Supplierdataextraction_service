var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');



/* GET home page.*/
router.get('/processedfiles', function(req, res, next) {

  var testFolder = './scripts/processed/';
  var fs = require('fs');
  //res.setHeader('content-Type', 'application/json');
  //res.writeHead(200, {'content-Type': 'application/plain'});
  res.setHeader('Content-Type', 'application/json');
  fs.readdirSync(testFolder).forEach(file => {
    //console.log(file);
    //var obj =[];
    //var a = obj.push(path.basename(file,'.pdf'));

    var a = path.basename(file,'.pdf');
    console.log(a);
    var b = JSON.stringify({Filename:a}, null, 3);
    //var b = JSON.parse(a)

     console.log(b)
     res.write(b);


   });
   });
    


  router.get('/processedcontent', function(req,res){
    var http = require('http');
     var fs = require('fs');
     //var path = require('path');
   var test1 = './scripts/output/';
   var a = req.body.filename;
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
  

module.exports = router;
