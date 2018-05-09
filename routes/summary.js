var express = require('express');
var router = express.Router();
//var dirTree = require('directory-tree');
var path = require('path');
/*var tree = dirTree('/scripts/inputs',(item,PATH)=>{
  console.log(item);
});*/
//router.param('processedfolder', function(req, res, next, name){
/*var testFolder = './scripts/inputs/';
var fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  //console.log(file);
  var a = path.basename(file,'.pdf')
  var b = "Filename:"+ a
  //req.param.name = a
  console.log(b);

  //next();
  //var b = JSON.stringify(a)
  //console.log("Filename:"+ b);
})*/



/* GET home page.*/
router.get('/processedfiles', function(req, res, next) {

  var testFolder = './scripts/processed/';
  var fs = require('fs');
  //res.setHeader('content-Type', 'application/json');
  //res.writeHead(200, {'content-Type': 'application/plain'});
  res.setHeader('Content-Type', 'text/html');
  fs.readdirSync(testFolder).forEach(file => {
    //console.log(file);
    var obj ={data:[]};
    var a = obj.data.push({Filename: path.basename(file,'.pdf')});
      console.log(a);
    var b = JSON.stringify(obj)
     console.log(b)
     res.write(b);
   });
   });
    //var c = "Filename:"+ b
    //console.log(c)
    //res.send(c);

    //res.end(c);
    //console.log(c)

    //res.contentType("application/json");
   //res.writeHead(200, {'Content-Type': 'application/json'});
      //res.send(c);
      //res.end();
    //req.param.name = a

/*router.get('/filename', function(req,res){
  var myText = req.query.filename;

  var testFolder1 = './scripts/output/';
  var fs = require('fs');
 fs.stat(filename, function(err, stat){
    var filename = new Filename(testFolder1);
     if(err == null){
       console.log('file exists');
       }
       else if(err.code == 'ENOENT'){
         fs.writeFile('some log');
       }else{
         console.log('some other erroe');
       }
  });*/


router.get('/processedcontent', function(req,res){
 var http = require('http');
  var fs = require('fs');




var test1 = './scripts/output/';
fs.readdir(test1, function(err, items) {
    console.log(items);

    fs.exists('1525697142871Contract-A', function(exists) {
    console.log("file exists ? " + exists);
});
});
});


  //res.send('Filename:' +myText);














  //res.send('File Name:' + JSON.stringify(a));
//  var data = req.params.a;
  //console.log(data);
  //res.json({"message": "Welcome to EasyNotes"});
  //res.writeHead(200, {'content-type': 'text/plain'});
  //res.write('FileName: ' + req.a + '\n');
  //b = JSON.stringify(req.a);
  //res.end('result' + '\n' + b);
  //res.render('index', testFolder);


/*var fs=require('fs');

var dir='./scripts/inputs/';
fs.readdir(dir,function(err,files){
    if (err) throw err;

    files.forEach(function(file){


        fs.readFile(dir+file,'utf-8',function(err,jsonData){
            if (err) throw err;
            var content=jsonData;
            var data=JSON.stringify(content);
            console.log(data);
        });

    });
  });*/


  /*var fs = require('fs'),
    path = require('path')
filename= './scripts/inputs/'
function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.argv[2]), false, null));
}*/

module.exports = router;
