var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var jsonfile = require('jsonfile');
var arrayCompare = require("array-compare")
var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

var files_data=[];


/* GET Files listing. */
router.get('/getfilescontent', function (req, res, next) {
    var json = JSON.parse(fs.readFileSync('./database/files.json', 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    console.log(json);
    res.send(JSON.stringify(json));
    });
router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
});


router.post('/loadfilescontent', function (req, res, next) {
    var a = req.body.files;
    console.log(a);
    files_data=files_data.concat(a);
       var json_data_file={"total_files":files_data};
        
        jsonfile.writeFile("./database/files.json", json_data_file, function(err){
                    if (err) throw err;
                    console.log("saved");
                  });
res.end('{"msg": "success"}');
     });



router.post('/comparejson', function (req, res, next) {
     
var filename = './database/files.json';
var filename1= './database/file.json';

jsonfile.readFile(filename, function(err, jsonData) {
    jsonfile.readFile(filename1, function(err, jsonData1) {
  for (var i = 0; i < jsonData.length; ++i) {
    for (var j = 0; j < jsonData1.length; ++j) {

    console.log("Filename: "+jsonData[i].filename);
    console.log("Filename: "+jsonData1[j].filename);

    if( jsonData[i].filename===jsonData1[j].filename1){
        console.log(jsonData[i].status==jsonData[j].status);
    }


     }

     
       
        
      
          
           }

          
        

        });

    });
})
     /*router.post('/comparejson', function (req, res, next) {
        var a;
        fs.readFile('./database/files.json', 'utf8', function (err, data) {
          if (err) throw err;
          a = JSON.parse(data);
         // console.log(a);
          var b;
       fs.readFile('./database/file.json', 'utf8', function (err, data) {
          if (err) throw err;
          b = JSON.parse(data);
         // console.log(b);
        
        function remove_duplicates(a, b) {
            for (var i = 0, len = a.length; i < len; i++) { 
                for (var j = 0, len2 = b.length; j < len2; j++) { 
                    if (a[i].total_files.filename === b[j].file.filename) {
                        console.log(a[i].total_files.filename )
                        //b.splice(j, 1);
                        len2=b.length;
                    }
                }
            }
        
            //console.log(a);
            //console.log(b);
        
        }
        
        remove_duplicates(a,b);
        
         for (var i = 0, len = b.length; i < len; i++) {
             console.log("filename:"+a[i].total_files.filename +" status:"+a[i].total_files.status);
         }
        
        });
       
    });
});*/
       /* Object.keys(obj1).forEach(function(key){
            console.log(key + ':' + obj1[key]);
        })*/

        /*if(obj1.hasOwnProperty('filename')){
            console.log(filename);*/
            //do something if the key exist
     //  }
    

        /*fs.readFile("./database/file.json", 'utf8', function(err, json1) {
            var obj2 = json1;
            console.log("old data:---" +obj2);


            JSON.stringify(obj1) == JSON.stringify(obj2) 
            obj1['filename']=obj2['filename']*/
    
            //var obj1 = {'key':'value', 'key2':'value2'};
            //for(var Key in obj1) {
            //console.log("key:"+Key+", value:"+obj1[Key]);
//}

       


    /*fs.readFile('./database/files.json', 'utf8', function (err,data) {
        data = JSON.parse(data); 
        data.forEach(function(elem) {
            console.log(elem);
        });// you missed that...
       // console.log(data);*/

      /* fs.readFile('./database/files.json').forEach(elem => {
    
        console.log(elem);
    
      });*/
      
      /*router.post('/comparejson', function (req, res, next) {
        fs.readFile('./database/file.json', 'utf8', function (err,obj) {
            obj = JSON.parse(obj); // you missed that...
           // console.log(data1);

           var tagMap = {};
var i = null;
for (i = 0; obj.length > i; i += 1) {
    tagMap[obj[i].tagName] = obj[i];
}
 
var hasTag = function(tagName) {
    return tagMap[tagName];
};

           /*for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              console.log(key + ": " + obj[key]);
            }
          }​
           
           });
    });*/
    


//    if   file.jason.hasOwnproperty('filename1')then{ file.jason[status]  =files.jason[status]



        


     
module.exports = router;
     